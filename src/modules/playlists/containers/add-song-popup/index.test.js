import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectedAddSongPopup from "./index";
import { playLists } from "../../testData";

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

const initState = {
  playList: {
    playLists
  }
};

describe("AddSongPopup Container", () => {
  let wrapper, store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<ConnectedAddSongPopup />, store);
  });

  describe("mapStateToProps", () => {
    it("maps playLists", () => {
      expect(wrapper.props().playLists).toEqual(playLists);
    });
  });

  describe("mapDispatchToProps", () => {
    it("maps addSongToList to dispatch ADD_SONG_TO_LIST action", () => {
      wrapper.props().addSongToList(2, 5);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "ADD_SONG_TO_LIST",
        payload: {
          listID: 2,
          songID: 5
        }
      });
    });
  });
});
