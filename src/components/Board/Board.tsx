import { FC } from "react";
import tw, { theme } from "twin.macro";

import { GlassCard } from "../shared/Cards";
import { Cell, Circle, Cross } from "./Board.components";

type BoardCellType = {
  position: number;
  checked: "o" | "x" | null;
};

export const Board: FC = () => {
  const boardCells: BoardCellType[] = [];
  const possibleValues: BoardCellType["checked"][] = ["o", "x", null];

  for (let i = 1; i <= 9; i++) {
    boardCells.push({
      position: i,
      checked:
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
    });
  }

  const WINNING_COMBINATIONS = [
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

  return (
    <GlassCard
      tw="grid grid-cols-3 grid-rows-3 grid-flow-row text-3xl rounded-xl overflow-hidden w-64 h-64 border-2 border-primary-900"
      css={{ boxShadow: "0 .25rem 1rem" + theme`colors.primary.900` + "CC" }}
      bgColor={tw`bg-primary-400/25`}
      size={"md"}
    >
      {boardCells.map((box, idx) => (
        <Cell key={idx}>
          {box.checked === "o" ? (
            <Circle />
          ) : box.checked === "x" ? (
            <Cross />
          ) : // box.position
          null}
          {/* {box.position} */}
        </Cell>
      ))}
    </GlassCard>
  );
};