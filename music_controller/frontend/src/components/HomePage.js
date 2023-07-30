import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          roomCode: data.code,
        })
      );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  renderHomePage() {
    if (this.state.roomCode) {
      return (
        <Navigate to={`/room/${this.state.roomCode}`} replace={true}></Navigate>
      );
    } else {
      return (
        <Grid container spacing={3} align="center">
          <Grid item xs={12}>
            <Typography variant="h3" compact="h3">
              Music House
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={this.renderHomePage()} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route
            path="/room/:roomCode"
            element={<Room leaveRoomCallback={this.clearRoomCode} />}
          />
        </Routes>
      </Router>
    );
  }
}
