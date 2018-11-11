import React from "react";
import { shallow } from "enzyme";
import AddSongPopup from "./index";
import { playLists } from "../../testData";

const setup = props => {
  const enzymeWrapper = shallow(<AddSongPopup {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe("<AddSongPopup />", () => {
  const initProps = {
    playLists,
    songID: 3,
    addSongToList: jest.fn(),
    onClosing: jest.fn()
  };
  describe("render", () => {
    const { enzymeWrapper } = setup(initProps);

    it("renders without crashing", () => {
      expect(enzymeWrapper.length).toBe(1);
    });
    describe("render playList", () => {
      describe("playList length = 0", () => {
        it("should match snapshot", () => {
          const { enzymeWrapper } = setup({
            ...initProps,
            playLists: []
          });
          expect(enzymeWrapper).toMatchSnapshot();
        });
      });

      describe("playList is undefined", () => {
        const { enzymeWrapper } = setup({ ...initProps, playLists: undefined });
        it("should match snapshot", () => {
          expect(enzymeWrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("function props", () => {
    const { enzymeWrapper, props } = setup(initProps);

    it('should trigger "onClosing" when closing button is clicked', () => {
      enzymeWrapper
        .find(".close-button")
        .get(0)
        .props.onClick();
      expect(props.onClosing).toHaveBeenCalled();
    });

    it('should trigger "onClosing"/"addSongToList" when a song is clicked', () => {
      enzymeWrapper
        .find(".list-item")
        .get(2)
        .props.onClick();
      expect(props.onClosing).toHaveBeenCalled();
      expect(props.addSongToList).toHaveBeenCalledWith(2, 3);
    });
    it('should trigger "onClosing" and not trigger"addSongToList" when a song is clicked and it already on the list', () => {
      enzymeWrapper
        .find(".list-item")
        .get(3)
        .props.onClick();
      expect(props.onClosing).toHaveBeenCalled();
      expect(props.addSongToList).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        "this song is on the list already"
      );
    });
  });
});
