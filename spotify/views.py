from django.shortcuts import render, redirect
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from .util import update_or_create_user_tokens, is_spotify_authenticated

# Request authorization to access data
class AuthURL(APIView):
    def get(self, request, format=None):
        # things we want to do with spotify API
        scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scope,
            'response_type': 'code', # we want to get sent a code back to auth the user
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url # we're just preparing this data/url so that we can then authenticate from the frontend

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error') # we're currently not using the error for anything

    print(f"~~~~redirect uri: {REDIRECT_URI}")

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }).json()

    print(f"response: {response}")

    # get information from response
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    # store this token ... need to do this for every user on our website
    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, 
        access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:') # this redirects to the '' (home) page of the frontend app
    # for this to work, you need to define the app_name in frontend, and give the path a name (empty string in this case)

 
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
