import { createPlayList } from "../../tools";

export const initState = {
  songs: [
    { id: 0, title: "abc1", artist: "Jack", duration: "1:28" },
    { id: 1, title: "abc2", artist: "Tyler", duration: "1:23" },
    { id: 2, title: "abc3", artist: "Tyler", duration: "2:33" },
    { id: 3, title: "abc4", artist: "Randy", duration: "5:41" },
    { id: 4, title: "abc5", artist: "Tyler", duration: "1:34" },
    { id: 5, title: "abc6", artist: "Jack", duration: "4:13" },
    { id: 6, title: "abc7", artist: "Jack", duration: "3:25" },
    { id: 7, title: "abc8", artist: "Randy", duration: "2:53" },
    { id: 8, title: "abc9", artist: "Jack", duration: "2:27" },
    { id: 9, title: "abc10", artist: "Randy", duration: "4:23" },
    { id: 10, title: "abc11", artist: "Tyler", duration: "3:33" }
  ],
  displayAddSongPopup: false,
  playLists: []
};

const playListReducers = (state = initState, action) => {
  const { playLists } = state;
  switch (action.type) {
    case "GET_INIT_PLAYLISTS":
      return {
        ...state,
        playLists: JSON.parse(localStorage.getItem("playlists")) || []
      };
    case "TOGGLE_ADD_SONG_POPUP":
      return {
        ...state,
        displayAddSongPopup: !state.displayAddSongPopup
      };
    case "ADD_SONG_TO_LIST_SUCCESS":
      const { listID, songID } = action.payload;
      const listIdx = state.playLists.findIndex(list => list.id === listID);
      const currentPlayList = playLists[listIdx];
      const updatedPlayList = {
        ...currentPlayList,
        songs: [...currentPlayList.songs, songID]
      };
      playLists.splice(listIdx, 1, updatedPlayList);
      return {
        ...state,
        playLists: [...playLists]
      };
    case "ADD_PLAYLIST_SUCCESS":
      return {
        ...state,
        playLists: [
          ...playLists,
          createPlayList(
            playLists.length > 0 ? playLists[playLists.length - 1].id + 1 : 0,
            action.payload
          )
        ]
      };
    default:
      return state;
  }
};

export default playListReducers;
