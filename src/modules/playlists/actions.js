import { from, of, merge } from "rxjs";
import { ofType } from "redux-observable";
import { mergeMap, catchError, tap, throttleTime } from "rxjs/operators";
import { createPlayList } from "../../tools";

export const playListActions = {
  getInitPlayLists: () => ({
    type: "GET_INIT_PLAYLISTS"
  }),
  addList: name => ({
    type: "ADD_PLAYLIST",
    payload: name
  }),
  addSongToList: (listID, songID) => ({
    type: "ADD_SONG_TO_LIST",
    payload: { listID, songID }
  })
};

const mockAddPlayList = payload => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        const playLists = JSON.parse(localStorage.getItem("playlists"));
        const updatedPlayLists =
          playLists === null
            ? [createPlayList(0, payload)]
            : [
                ...playLists,
                createPlayList(playLists[playLists.length - 1].id + 1, payload)
              ];
        localStorage.setItem("playlists", JSON.stringify(updatedPlayLists));
        resolve({ message: `playlist ${payload} added succesfully` });
      } else {
        reject({ message: "sorry we failed to add this playlist" });
      }
    }, 500);
  });

  return promise;
};

const mockAddSongToList = payload => {
  const { listID, songID } = payload;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        const playLists = JSON.parse(localStorage.getItem("playlists"));
        playLists.find(list => list.id === listID).songs.push(songID);
        localStorage.setItem("playlists", JSON.stringify(playLists));
        resolve({ message: `song added succesfully` });
      } else {
        reject({ message: "sorry we failed to add this song" });
      }
    }, 500);
  });

  return promise;
};

const addPlayListEpic = action$ =>
  action$.pipe(
    ofType("ADD_PLAYLIST"),
    throttleTime(1000),
    mergeMap(action =>
      from(mockAddPlayList(action.payload)).pipe(
        mergeMap(success =>
          of({ type: "ADD_PLAYLIST_SUCCESS", payload: action.payload }).pipe(
            tap(() => {
              alert(success.message);
            })
          )
        ),
        catchError(error =>
          merge(
            of({ type: "ADD_PLAYLIST_FAIL", payload: error.message }).pipe(
              tap(() => {
                alert(error.message);
              })
            )
          )
        )
      )
    )
  );

const addSongToListEpic = action$ =>
  action$.pipe(
    ofType("ADD_SONG_TO_LIST"),
    mergeMap(action =>
      from(mockAddSongToList(action.payload)).pipe(
        mergeMap(() =>
          of({
            type: "ADD_SONG_TO_LIST_SUCCESS",
            payload: action.payload
          })
        ),
        catchError(error =>
          merge(
            of({ type: "ADD_SONG_TO_LIST_FAIL", payload: error.message }).pipe(
              tap(() => {
                alert(error.message);
              })
            )
          )
        )
      )
    )
  );

export const playListEpics = { addPlayListEpic, addSongToListEpic };
