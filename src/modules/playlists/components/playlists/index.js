import React, { Component } from "react";
import PlayList from "../playlist";

import "./index.scss";

class PlayLists extends Component {
  constructor() {
    super();
    this.state = {
      listNameInput: ""
    };
  }

  componentDidMount() {
    this.props.getInitPlayLists();
  }
  inputChangeHandler = e => {
    this.setState({ listNameInput: e.target.value });
  };
  addListHandler = () => {
    if (this.state.listNameInput === "") {
      alert("you can't add a playlist without a name");
      return;
    }
    if (
      this.props.playLists.findIndex(
        list => list.name === this.state.listNameInput
      ) !== -1
    ) {
      alert(`${this.state.listNameInput} already exists`);
      return;
    }
    this.props.addList(this.state.listNameInput);
    this.setState({ listNameInput: "" });
  };
  render() {
    const { playLists } = this.props;
    return (
      <div className="playlists">
        <div className="add-list">
          <input
            type="text"
            onChange={this.inputChangeHandler}
            value={this.state.listNameInput}
          />
          <button onClick={this.addListHandler}>Add List</button>
        </div>
        <div className="lists">
          {playLists !== undefined && playLists.length > 0 ? (
            playLists.map(list => (
              <PlayList key={list.id} name={list.name} songs={list.songs} />
            ))
          ) : (
            <span>No playlist yet</span>
          )}
        </div>
      </div>
    );
  }
}

export default PlayLists;
