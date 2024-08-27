from flask import Flask, jsonify, request
from flask_cors import CORS
from save import record_audio, create_spotify_playlist
import logging
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from flask import Flask, request, redirect

SPOTIPY_CLIENT_ID = '9fda4040c89142338477815b3af1215d'
SPOTIPY_CLIENT_SECRET = '8ca51e216eb54cb5a28ae94b6af6af1f'
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback/'  # Default redirect URI
SCOPE = 'playlist-modify-public'
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/record', methods=['POST'])
def record():
    record_audio()
    return jsonify({"message": "Audio recorded successfully"}), 200 

@app.route('/recognize', methods=['POST'])
async def recognize():
    song_name = await create_spotify_playlist()
    if song_name:
        return jsonify({"message": "Song Recognized and Added"}),200

    else:
        return jsonify({"message": "Song not recognized or no track data available"}), 200
    
    




if __name__ == "__main__":
    app.run(debug=True)

