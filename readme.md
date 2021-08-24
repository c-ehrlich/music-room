# Music-Controller

## About
This project is the result of the following course: https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j

It currently contains no additional code that I added myself. If that should change, I will update this section with the commit hash of the commit that represents the project at the end of the course, so it can be compared to the current state of the project.

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