import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectedPlayLists from "./index";
import {
  playListswithSongDetailFilled,
  playLists,
  songs
} from "../../testData";

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

const initState = {
  playList: {
    playLists,
    songs
  }
};

describe("ConnectedPlayLists Container", () => {
  let wrapper, store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<ConnectedPlayLists />, store);
  });

  describe("mapStateToProps", () => {
    it("maps playLists", () => {
      expect(wrapper.props().playLists).toEqual(playListswithSongDetailFilled);
    });

    it("maps songs", () => {
      expect(wrapper.props().songs).toEqual(songs);
    });
  });

  describe("mapDispatchToProps", () => {
    it("maps getInitPlayLists to dispatch GET_INIT_PLAYLISTS action", () => {
      wrapper.props().getInitPlayLists();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "GET_INIT_PLAYLISTS"
      });
    });

    it("maps addList to dispatch ADD_PLAYLIST action", () => {
      wrapper.props().addList("your best hits");
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "ADD_PLAYLIST",
        payload: "your best hits"
      });
    });
  });
});
