import React, { Component, Suspense, lazy } from "react";

import "./App.scss";

const SongList = lazy(() => import("./modules/playlists/containers/songlist"));
const PlayLists = lazy(() =>
  import("./modules/playlists/containers/playlists")
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Suspense fallback={<div />}>
          <SongList />
          <PlayLists />
        </Suspense>
      </div>
    );
  }
}

export default App;
