import React from "react";

import "./index.scss";

const PlayList = ({ name, songs }) => (
  <div className="playlist">
    <span>{name}</span>
    <br />
    {songs !== undefined && songs.length > 0 ? (
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Artist</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>
          {songs.map(song => (
            <tr className="song" key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <span>no songs yet</span>
    )}
  </div>
);

export default PlayList;
