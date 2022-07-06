import { FC } from "react";
import tw, { theme } from "twin.macro";

import { BoardCellType } from "../../types/GeneralTypes";

import { calculateWin } from "../../utils";
import { GlassCard } from "../shared/Cards";
import { Cell, Circle, Cross } from "./Board.components";

export const Board: FC = () => {
  // const boardCells: BoardCellType[] = Array(9).fill(null);
  const boardCells: BoardCellType[] = [
    "o",
    "o",
    "o",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
  ];

  // console.log(calculateWin(boardCells));

  return (
    <GlassCard
      tw="grid grid-cols-3 grid-rows-3 grid-flow-row text-3xl rounded-xl overflow-hidden w-64 h-64 border-2 border-primary-900"
      css={{ boxShadow: "0 .25rem 1rem" + theme`colors.primary.900` + "CC" }}
      bgColor={tw`bg-primary-400/25`}
      size={"md"}
    >
      {boardCells.map((box, idx) => (
        <Cell key={idx}>
          {box === "o" ? <Circle /> : box === "x" ? <Cross /> : null}
        </Cell>
      ))}
    </GlassCard>
  );
};
