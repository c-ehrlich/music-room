# Music-Room

![Music-Room Screenshot 1](https://i.imgur.com/HbdZ9ah.png)

## About
Music-Room is a shared Spotify instance that allows one user to host a room in which music is playing, and other users to vote to skip songs, and optionally pause the currently playing song.

## How to run (in dev/debug mode)
* Register a Spotify Developer account and get Client ID and Client Secret
* Create a new Application in the Spotify Developer Dashboard
* Add `<site url>/spotify/redirect` to Redirect URIs of the Application in the Spotify Developer Dashboard
  * for development, `<site url>` is `http://127.0.0.1:8000`
* create spotify/credentials.py (TODO: move this process to environment variables)
```python
CLIENT_ID = "<spotify client id>"
CLIENT_SECRET = "<spotify client secret>"
REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect" # for testing - replace with real URL in prod
```
* in project root (same folder as manage.py):
  * add `spotify/credentials.py` to .gitignore
  * (recommended: set up a venv)
  * `pip install -r requirements.txt`
  * `python manage.py runserver`
* in /frontend:
  * `npm i` to install all dependencies
  * `npm run dev`
* access the app (in debug mode) at 127.0.0.1:8000

## Additional Screenshots
![Music-Room Screenshot 2](https://i.imgur.com/ZlwhyA6.png)
![Music-Room Screenshot 3](https://i.imgur.com/rkMwrvc.png)
![Music-Room Screenshot 4](https://i.imgur.com/5N3CWgy.png)

## Notes
A significant percentage of the code was not created by me - this project is based on the following course: https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j
