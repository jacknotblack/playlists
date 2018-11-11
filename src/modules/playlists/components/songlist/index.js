import React, { Component } from "react";
import AddSongPopup from "../../containers/add-song-popup";

import "./index.scss";

class SongList extends Component {
  constructor() {
    super();
    this.state = {
      displayPopop: false,
      songID: null
    };
  }
  togglePopup = songID => () => {
    this.setState({ displayPopop: !this.state.displayPopop, songID });
  };
  render() {
    const { songs } = this.props;
    const { displayPopop, songID } = this.state;
    return (
      <div className="song-list">
        {displayPopop && (
          <AddSongPopup
            songID={songID}
            onClosing={() => {
              this.togglePopup(null)();
            }}
          />
        )}
        {songs !== undefined && songs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>id</td>
                <td>Title</td>
                <td>Artist</td>
                <td>Duration</td>
                <td>Add</td>
              </tr>
            </thead>
            <tbody>
              {songs.map(song => (
                <tr className="song" key={song.id}>
                  <td>{song.id}</td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.duration}</td>
                  <td className="add" onClick={this.togglePopup(song.id)}>
                    +
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>no songs yet</span>
        )}
      </div>
    );
  }
}

export default SongList;
