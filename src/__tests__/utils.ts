import { BoardType, CellType } from "../types/GeneralTypes";

import { winningCombinations } from "../utils";
import { ParametrizedTestBoards } from "./types";

export function generateWinningBoards(symbol: CellType) {
  const newBoards: ParametrizedTestBoards = [];

  winningCombinations.forEach((combination, index) => {
    const array: BoardType = new Array(9).fill(null);

    combination.forEach(idx => {
      array[idx - 1] = symbol;
    });

    newBoards.push({ board: array, desc: `combination ${index + 1}` });
  });

  return newBoards;
}
