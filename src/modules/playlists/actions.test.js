import configureMockStore from "redux-mock-store";
import { createEpicMiddleware, ActionsObservable } from "redux-observable";
import { toArray } from "rxjs/operators";
import { playListActions as actions, playListEpics } from "./actions";
import { playLists } from "./testData";

describe("actions", () => {
  it("should create getInitPlayLists action", () => {
    const expectedAction = {
      type: "GET_INIT_PLAYLISTS"
    };
    expect(actions.getInitPlayLists()).toEqual(expectedAction);
  });

  it("should create addList action", () => {
    const payload = "some name";
    const expectedAction = {
      type: "ADD_PLAYLIST",
      payload
    };
    expect(actions.addList(payload)).toEqual(expectedAction);
  });

  it("should create addSongToList action", () => {
    const payload = { listID: 4, songID: 10 };
    const expectedAction = {
      type: "ADD_SONG_TO_LIST",
      payload
    };
    expect(actions.addSongToList(payload.listID, payload.songID)).toEqual(
      expectedAction
    );
  });
});

describe("Epics", () => {
  let store;

  describe("addPlayListEpic", () => {
    const epic = playListEpics["addPlayListEpic"];
    beforeEach(() => {
      localStorage.getItem.mockReturnValueOnce(JSON.stringify(playLists));
      const epicMiddleware = createEpicMiddleware();
      const mockStore = configureMockStore([epicMiddleware]);
      store = mockStore();
      epicMiddleware.run(epic);
    });

    it("SUCCESS: returns ADD_PLAYLIST_SUCCESS", async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5;
      global.Math = mockMath;

      const payload = "epic is fantastic";

      const action$ = ActionsObservable.of({
        type: "ADD_PLAYLIST",
        payload
      });
      const epic$ = epic(action$);
      const result = await epic$.pipe(toArray()).toPromise();

      expect(result).toEqual([
        {
          type: "ADD_PLAYLIST_SUCCESS",
          payload
        }
      ]);
      expect(window.alert).toHaveBeenCalledWith(
        `playlist ${payload} added succesfully`
      );
      //
      // I could do localStorage playLists === null mocking
      // but the whole thing is a bigger mock so I skipped
      //
    });

    it("FAIL: returns ADD_PLAYLIST_FAIL", async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.1;
      global.Math = mockMath;

      const payload = "epic is fantastic";

      const action$ = ActionsObservable.of({
        type: "ADD_PLAYLIST",
        payload
      });
      const epic$ = epic(action$);
      const result = await epic$.pipe(toArray()).toPromise();
      const error = new Error("sorry we failed to add this playlist");
      expect(result).toEqual([
        {
          type: "ADD_PLAYLIST_FAIL",
          payload: error.message
        }
      ]);
      expect(window.alert).toHaveBeenCalledWith(error.message);
    });
  });

  describe("addSongToListEpic", () => {
    const epic = playListEpics["addSongToListEpic"];
    beforeEach(() => {
      localStorage.getItem.mockReturnValueOnce(JSON.stringify(playLists));
      const epicMiddleware = createEpicMiddleware();
      const mockStore = configureMockStore([epicMiddleware]);
      store = mockStore();
      epicMiddleware.run(epic);
    });

    it("SUCCESS: returns ADD_SONG_TO_LIST_SUCCESS", async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5;
      global.Math = mockMath;

      const payload = {
        songID: 2,
        listID: 3
      };

      const action$ = ActionsObservable.of({
        type: "ADD_SONG_TO_LIST",
        payload
      });
      const epic$ = epic(action$);
      const result = await epic$.pipe(toArray()).toPromise();

      expect(result).toEqual([
        {
          type: "ADD_SONG_TO_LIST_SUCCESS",
          payload
        }
      ]);
    });

    it("FAIL: returns ADD_SONG_TO_LIST_FAIL", async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.1;
      global.Math = mockMath;

      const payload = "epic is fantastic";

      const action$ = ActionsObservable.of({
        type: "ADD_SONG_TO_LIST",
        payload
      });
      const epic$ = epic(action$);
      const result = await epic$.pipe(toArray()).toPromise();
      const error = new Error("sorry we failed to add this song");
      expect(result).toEqual([
        {
          type: "ADD_SONG_TO_LIST_FAIL",
          payload: error.message
        }
      ]);
    });
  });
});
