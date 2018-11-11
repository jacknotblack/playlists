import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectedSongList from "./index";
import { songs } from "../../testData";

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

const initState = {
  playList: {
    songs
  }
};

describe("ConnectedSongList Container", () => {
  let wrapper, store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<ConnectedSongList />, store);
  });

  describe("mapStateToProps", () => {
    it("maps songs", () => {
      expect(wrapper.props().songs).toEqual(songs);
    });
  });
});
