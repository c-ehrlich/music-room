from django.contrib import admin

from spotify.models import SpotifyToken, Vote

# Register your models here.
admin.site.register(SpotifyToken)
admin.site.register(Vote)