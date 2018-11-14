import { createPlayList, deepCopy, range } from "./tools";

describe("tools", () => {
  it("createPlayList", () => {
    expect(createPlayList(3, "sad songs")).toEqual({
      id: 3,
      name: "sad songs",
      songs: []
    });
  });

  it("deepCopy", () => {
    const obj = {
      a: { a1: [1, 3, "8"] },
      b: true
    };
    expect(deepCopy(undefined)).toEqual(undefined);
    expect(deepCopy(null)).toEqual(null);
    expect(deepCopy(obj)).toEqual(obj);
    expect(deepCopy(obj)).not.toBe(obj);
  });

  it("range", () => {
    expect(range(3, 10)).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
