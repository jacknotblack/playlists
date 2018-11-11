import React from "react";
import { shallow } from "enzyme";
import SongList from "./index";
import AddSongPopup from "../../containers/add-song-popup";
import { songs } from "../../testData";

const setup = props => {
  const enzymeWrapper = shallow(<SongList {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe("<SongList />", () => {
  const initProps = {
    songs
  };
  describe("render", () => {
    const { enzymeWrapper } = setup(initProps);

    it("renders without crashing", () => {
      expect(enzymeWrapper.length).toBe(1);
    });
    describe("render songList", () => {
      describe("songs length = 0", () => {
        it("should match snapshot", () => {
          const { enzymeWrapper } = setup({
            ...initProps,
            songs: []
          });
          expect(enzymeWrapper).toMatchSnapshot();
        });
      });

      describe("songs is undefined", () => {
        const { enzymeWrapper } = setup({ ...initProps, songs: undefined });
        it("should match snapshot", () => {
          expect(enzymeWrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("function props", () => {
    const { enzymeWrapper, props } = setup(initProps);

    it("should setState when add to songlist button is clicked", () => {
      enzymeWrapper
        .find(".add")
        .get(0)
        .props.onClick();
      expect(enzymeWrapper.state()).toEqual({
        displayPopop: true,
        songID: 0
      });
      expect(enzymeWrapper).toMatchSnapshot();
    });

    it("should setState when AddSong popup execute onClosing", () => {
      enzymeWrapper
        .find(AddSongPopup)
        .get(0)
        .props.onClosing();
      expect(enzymeWrapper.state()).toEqual({
        displayPopop: false,
        songID: null
      });
    });
  });
});
