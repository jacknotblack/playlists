import reducer, { initState } from "./reducers";
import { playLists } from "./testData";
import { deepCopy } from "../../tools";

const state = { ...initState, playLists };

describe("layout reducer", () => {
  it("should return the initial state", () => {
    expect(JSON.stringify(reducer(undefined, {}))).toEqual(
      JSON.stringify(initState)
    );
  });

  it("should handle GET_INIT_PLAYLISTS", () => {
    //this local storage mock is somehow broken, using work around below
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(playLists));

    expect(
      reducer(initState, {
        type: "GET_INIT_PLAYLISTS"
      })
    ).toEqual({
      ...initState,
      playLists
    });

    localStorage.getItem.mockReturnValueOnce(null);

    expect(
      reducer(initState, {
        type: "GET_INIT_PLAYLISTS"
      })
    ).toEqual({
      ...initState,
      playLists: []
    });
  });

  it("should handle TOGGLE_ADD_SONG_POPUP", () => {
    expect(
      reducer(initState, {
        type: "TOGGLE_ADD_SONG_POPUP"
      })
    ).toEqual({
      ...initState,
      displayAddSongPopup: true
    });
    expect(
      reducer(
        { ...initState, displayAddSongPopup: true },
        {
          type: "TOGGLE_ADD_SONG_POPUP"
        }
      )
    ).toEqual({
      ...initState,
      displayAddSongPopup: false
    });
  });

  it("should handle ADD_SONG_TO_LIST_SUCCESS", () => {
    let updatedplayLists = deepCopy(playLists);

    updatedplayLists[0].songs.push(1);
    expect(
      reducer(state, {
        type: "ADD_SONG_TO_LIST_SUCCESS",
        payload: { listID: 0, songID: 1 }
      })
    ).toEqual({
      ...state,
      playLists: updatedplayLists
    });
  });

  it("should handle ADD_PLAYLIST_SUCCESS", () => {
    expect(
      reducer(initState, {
        type: "ADD_PLAYLIST_SUCCESS",
        payload: "ultra cool name"
      })
    ).toEqual({
      ...initState,
      playLists: [{ id: 0, name: "ultra cool name", songs: [] }]
    });

    const updatedplayLists = deepCopy(playLists);
    updatedplayLists.push({ id: 9, name: "ultra cool name", songs: [] });

    expect(
      reducer(state, {
        type: "ADD_PLAYLIST_SUCCESS",
        payload: "ultra cool name"
      })
    ).toEqual({
      ...initState,
      playLists: updatedplayLists
    });
  });

  it("should handle everything else", () => {
    expect(
      reducer(initState, {
        type: "THIS_ACTION_DOESNT_EXIST"
      })
    ).toEqual(initState);
  });
});
