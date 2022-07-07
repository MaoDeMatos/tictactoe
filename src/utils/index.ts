import { Symbol } from "./../types/GeneralTypes";

import { messagesToDisplay } from "./messages";

export const capitalizeFirstLetter = (text: string = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const findMessageByName = (messageName: string = "") =>
  messagesToDisplay.find(el => el().name === messageName) ??
  messagesToDisplay[0];

export const calculateWin = (boardCells: Symbol[]) => {
  const winningCombinations = [
    // Horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // Diagonal
    [1, 5, 9],
    [3, 5, 7],
    // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (
      boardCells[a - 1] &&
      boardCells[a - 1] === boardCells[b - 1] &&
      boardCells[a - 1] === boardCells[c - 1]
    ) {
      // return [boardCells[a - 1], [a, b, c]];
      return boardCells[a - 1];
    }
  }

  return null;
};

export const isBoardFilled = (boardCells: Symbol[]) => {
  return boardCells.includes(null) ? false : true;
};
