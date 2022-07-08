import "@testing-library/jest-dom";

import {
  calculateWin,
  capitalizeFirstLetter,
  isBoardFilled,
} from "../../utils/index";
import { ParametrizedTestBoards } from "../types";
import { generateWinningBoards } from "../utils";

/**
 * Utilities: calculateWin()
 */
const winningBoardsO: ParametrizedTestBoards = generateWinningBoards("o");

describe('Utilities: calculateWin() for "O"', () => {
  it.each(winningBoardsO)('should be a "O" winning for $desc', arg => {
    expect(calculateWin(arg.board)).toBe("o");
  });
});

const winningBoardsX: ParametrizedTestBoards = generateWinningBoards("x");

describe('Utilities: calculateWin() for "X"', () => {
  it.each(winningBoardsX)('should be a "X" winning for $desc', arg => {
    expect(calculateWin(arg.board)).toBe("x");
  });
});

const losingBoards: ParametrizedTestBoards = [
  { board: ["x", "o", "x", "x", "o", "x", "o", "x", "o"], desc: "1" },
  { board: [null, null, null, null, null, null, null, null, null], desc: "2" },
];

describe("Utilities: calculateWin() for Ties", () => {
  it.each(losingBoards)("should be a TIE - $desc", arg => {
    expect(calculateWin(arg.board)).toBe(null);
  });
});

/**
 * Utilities: isBoardFilled()
 */
const filledBoards: ParametrizedTestBoards = [
  { board: ["x", "o", "x", "x", "o", "x", "o", "x", "o"], desc: "1" },
  { board: ["x", "x", "x", "x", "x", "x", "x", "x", "x"], desc: "2" },
  { board: ["o", "o", "o", "o", "o", "o", "o", "o", "o"], desc: "3" },
];

describe("Utilities: isBoardFilled() === true", () => {
  it.each(filledBoards)("should be true - $desc", arg => {
    expect(isBoardFilled(arg.board)).toBeTruthy();
  });
});

const notFilledBoards: ParametrizedTestBoards = [
  { board: ["x", null, null, null, null, "x", "o", null, "o"], desc: "1" },
  { board: [null, null, null, null, null, null, null, null, null], desc: "2" },
];

describe("Utilities: isBoardFilled() === false", () => {
  it.each(notFilledBoards)("should be false - $desc", arg => {
    expect(isBoardFilled(arg.board)).toBeFalsy();
  });
});

/**
 * Utilities: capitalizeFirstLetter()
 */
const capitalizeFirstLetterStrings = [
  ["david", "David"],
  ["mao", "Mao"],
  ["hugo", "Hugo"],
];

describe("Utilities: capitalizeFirstLetter()", () => {
  it.each(capitalizeFirstLetterStrings)(
    "%p should be turned into %p",
    (input, expected) => {
      expect(capitalizeFirstLetter(input)).toBe(expected);
    }
  );
});
