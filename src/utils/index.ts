import { BoardType, CellType, PlayerType } from "./../types/GeneralTypes";

import { messagesToDisplay } from "./messages";

export const winningCombinations = [
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

export const capitalizeFirstLetter = (text: string = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const findMessageByName = (messageName: string = "") =>
  messagesToDisplay.find(el => el().name === messageName) ??
  messagesToDisplay[0];

export const isBoardFilled = (boardCells: BoardType) => {
  return boardCells.includes(null) ? false : true;
};

export const isBoardEmpty = (boardCells: BoardType) => {
  return boardCells.includes("o" || "x") ? false : true;
};

export const calculateWin = (boardCells: BoardType) => {
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

export const findCell = (boardCells: BoardType, player: PlayerType) => {
  const opponent: CellType = player.symbol === "x" ? "o" : "x";

  const minmax = (boardCells: BoardType, isPlayerTurn: boolean) => {
    const winningSymbol = calculateWin(boardCells);

    // "Cell" represents cell index in the board
    if (winningSymbol === player.symbol) return { cell: -1, score: 1 };
    if (winningSymbol === opponent) return { cell: -1, score: -1 };
    if (isBoardFilled(boardCells)) return { cell: -1, score: 0 };

    // If isPlayerTurn, we want to maximize score, and minimize otherwise
    const bestCell = { cell: -1, score: isPlayerTurn ? -1000 : 1000 };

    for (let i = 0; i < boardCells.length; i++) {
      if (boardCells[i]) continue;

      boardCells[i] = isPlayerTurn ? player.symbol : opponent;
      const score = minmax(boardCells, !isPlayerTurn).score;
      boardCells[i] = null;

      if (isPlayerTurn) {
        if (score > bestCell.score) {
          bestCell.score = score;
          bestCell.cell = i;
        }
      } else {
        if (score < bestCell.score) {
          bestCell.score = score;
          bestCell.cell = i;
        }
      }
    }

    return bestCell;
  };

  return minmax(boardCells, true).cell;
};
