import React, { Component } from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    // TODO: put default song information in state - so that the player isn't broken when no song is playing
  }

  pauseSong() {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/pause', requestOptions);
    // TODO: add error handling for if the user doesn't have permissions
  }

  playSong() {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/play', requestOptions);
    // TODO: add error handling for if the user doesn't have permissions
  }

  skipSong() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/skip', requestOptions);
    // TODO: add error handling for if the user doesn't have permissions
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}
              >
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon
                  onClick={() => this.skipSong()}
                />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    )
  }
}
