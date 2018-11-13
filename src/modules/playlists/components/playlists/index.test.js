import React from "react";
import { shallow } from "enzyme";
import PlayLists from "./index";
import {
  playListswithSongDetailFilled as playLists,
  songs
} from "../../testData";

const setup = props => {
  const enzymeWrapper = shallow(<PlayLists {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe("<PlayLists />", () => {
  const initProps = {
    playLists,
    songs,
    getInitPlayLists: jest.fn(),
    addList: jest.fn()
  };
  describe("render", () => {
    const { enzymeWrapper, props } = setup(initProps);

    it("renders without crashing", () => {
      expect(enzymeWrapper.length).toBe(1);
    });
    describe("componentDidMount", () => {
      // const { enzymeWrapper, props } = setup(initProps);
      it('should trigger "getInitPlayLists"', () => {
        enzymeWrapper.instance().componentDidMount();
        expect(props.getInitPlayLists).toHaveBeenCalled();
      });
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
    describe("handle input", () => {
      it("should change input value by chaging state", () => {
        const { enzymeWrapper, props } = setup(initProps);
        enzymeWrapper.setState({
          listNameInput: "My uber list"
        });
        expect(enzymeWrapper).toMatchSnapshot();
      });
      it("should trigger setState when input value changed", () => {
        const { enzymeWrapper, props } = setup(initProps);
        expect(enzymeWrapper.state().listNameInput).toBe("");
        const event = {
          target: {
            value: "I got a new name!"
          }
        };
        enzymeWrapper.find(".add-list > input").simulate("change", event);
        expect(enzymeWrapper.state().listNameInput).toBe("I got a new name!");
      });
    });
    it("should alert and do nothing else when add button is clicked and input value is empty", () => {
      const { enzymeWrapper, props } = setup(initProps);
      enzymeWrapper
        .find(".add-list > button")
        .get(0)
        .props.onClick();
      expect(window.alert).toHaveBeenCalledWith(
        "you can't add a playlist without a name"
      );
      expect(props.addList).not.toHaveBeenCalled();
    });

    it("should alert and do nothing else when add button is clicked and input value matches exist playlist name", () => {
      const { enzymeWrapper, props } = setup(initProps);
      enzymeWrapper.setState({ listNameInput: "abczzz" });
      enzymeWrapper
        .find(".add-list > button")
        .get(0)
        .props.onClick();
      expect(window.alert).toHaveBeenCalledWith("abczzz already exists");
      expect(props.addList).not.toHaveBeenCalled();
    });

    it('should trigger "addList" and setState when add button is clicked', () => {
      const { enzymeWrapper, props } = setup(initProps);
      enzymeWrapper.setState({ listNameInput: "super unique name" });
      enzymeWrapper
        .find(".add-list > button")
        .get(0)
        .props.onClick();
      expect(window.alert).not.toHaveBeenCalled();
      expect(props.addList).toHaveBeenCalledWith("super unique name");
      expect(enzymeWrapper.state().listNameInput).toBe("");
    });
  });
});
