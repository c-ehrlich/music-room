import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
      // song: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoomDetails() {
    console.log("in getRoomDetails");
    fetch('/api/get-room' + '?code=' + this.roomCode)
    .then((response) => {
      if (!response.ok) {
        console.log("getRoomDetails ... response not ok");
        // leave room
        this.props.leaveRoomCallback();
        this.props.history.push('/');
      }
      console.log("getRoomDetails ... response was ok");
      return response.json()
    })
    .then((data) => {
      this.setState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
      if (this.state.isHost) {
        console.log("in getRoomDetails ... about to authenticate Spotify");
        this.authenticateSpotify();
      }
    });
  }

  authenticateSpotify() {
    console.log("in authenticateSpotify");
    fetch('/spotify/is-authenticated')
    .then((response) => response.json())
    .then((data) => {
      this.setState({ spotifyAuthenticated: data.status });
      // if the user is not authenticated, authenticate them
      if (!data.status) {
        fetch('/spotify/get-auth-url')
        .then(response => response.json())
        .then(data => {
          // visit the url that lets the user authenticate their account
          window.location.replace(data.url);
        });
      }
    });
  }

  getCurrentSong() {
    fetch('/spotify/current-song')
    .then(response => {
      if (!response.ok) {
        return {};
      } else {
        return response.json();
      }
    })
    .then(data => {
      this.setState({song: data});
      console.log(data);
    })
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json' },
    };
    fetch('/api/leave-room', requestOptions)
    .then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push('/');
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings() {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          {/* use CreateRoomPage component to change room */}
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }

    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <MusicPlayer {...this.state.song} />
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={ this.leaveButtonPressed }>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
