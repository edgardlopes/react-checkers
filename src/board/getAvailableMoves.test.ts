import { Position } from "../components/types";
import { getAvailableMoves } from "./getAvailableMoves";

describe("board unit tests", () => {
  it("should increment the row for black pieces", () => {
    const result = getAvailableMoves({ col: 1, row: 0 }, "black");

    const expected: Position[] = [
      { col: 0, row: 1 },
      { col: 2, row: 1 },
    ];

    expect(result).toEqual(expected);
  });

  it("should decrement the row for white pieces", () => {
    const result = getAvailableMoves({ col: 1, row: 7 }, "white");

    const expected: Position[] = [
      { col: 0, row: 6 },
      { col: 2, row: 6 },
    ];

    expect(result).toEqual(expected);
  });

  it("Should not go ahead if a black piece is on the opposite side", () => {
    const result = getAvailableMoves({ col: 1, row: 7 }, "black");

    const expected: Position[] = [];

    expect(result).toEqual(expected);
  });

  it("Should not go ahead if a white piece is on the opposite side", () => {
    const result = getAvailableMoves({ col: 1, row: 0 }, "white");

    const expected: Position[] = [];

    expect(result).toEqual(expected);
  });

  it("Should not return a movement if it is most left position", () => {
    const result = getAvailableMoves({ col: 0, row: 2 }, "black");

    const expected: Position[] = [{ col: 1, row: 3 }];

    expect(result).toEqual(expected);
  });

  it("A white piece not return a movement if it is most left position", () => {
    const result = getAvailableMoves({ col: 0, row: 5 }, "white");

    const expected: Position[] = [{ col: 1, row: 4 }];

    expect(result).toEqual(expected);
  });

  it("A black piece can't go right if it is on the most right position", () => {
    const result = getAvailableMoves({ col: 7, row: 2 }, "black");

    const expected: Position[] = [{ col: 6, row: 3 }];

    expect(result).toEqual(expected);
  });

  it("A white piece can't go right if it is on the most right position", () => {
    const result = getAvailableMoves({ col: 7, row: 5 }, "white");

    const expected: Position[] = [{ col: 6, row: 4 }];

    expect(result).toEqual(expected);
  });
});
