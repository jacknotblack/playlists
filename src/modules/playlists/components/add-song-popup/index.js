import React, { Fragment } from "react";

import "./index.scss";

const AddSongPopup = ({ playLists, songID, addSongToList, onClosing }) => {
  const addSongToListHandler = listID => () => {
    onClosing();
    if (
      playLists.find(list => list.id === listID).songs.indexOf(songID) !== -1
    ) {
      alert("this song is on the list already");
      return;
    }
    addSongToList(listID, songID);
  };
  return (
    <div className="add-song-popup">
      <div className="playlists-window">
        <span className="close-button" onClick={onClosing}>
          X
        </span>
        <br />
        {playLists !== undefined && playLists.length > 0 ? (
          <Fragment>
            Choose a list to Add to:
            {playLists.map(list => (
              <div
                className="list-item"
                key={list.id}
                onClick={addSongToListHandler(list.id)}
              >
                {list.name}
              </div>
            ))}
          </Fragment>
        ) : (
          <span>There are no playlist yet</span>
        )}
      </div>
    </div>
  );
};

export default AddSongPopup;
