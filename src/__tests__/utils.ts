import { CellType } from "../types/GeneralTypes";

import { winningCombinations } from "../utils";
import { ParametrizedTestBoards } from "./types";

export const generateWinningBoards = (
  symbol: CellType
): ParametrizedTestBoards =>
  winningCombinations.map((combination, index) => ({
    board: new Array(9)
      .fill(null)
      .map((_, idx) => (combination.includes(idx + 1) ? symbol : null)),
    desc: `combination ${index + 1}`,
  }));
