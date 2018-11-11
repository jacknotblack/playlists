import React from "react";
import { shallow } from "enzyme";
import PlayList from "./index";
import { songs } from "../../testData";

const setup = props => {
  const enzymeWrapper = shallow(<PlayList {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe("<PlayLists />", () => {
  const initProps = {
    name: "my awesome list",
    songs
  };
  describe("render", () => {
    const { enzymeWrapper } = setup(initProps);

    it("renders without crashing", () => {
      expect(enzymeWrapper.length).toBe(1);
    });
    describe("render playList", () => {
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
});
