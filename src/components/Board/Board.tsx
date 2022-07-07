import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import tw, { theme } from "twin.macro";

import { PlayerCheckMark } from "../../types/GeneralTypes";

import { useGameContext } from "../../contexts/gameContext";
import { GlassCard } from "../shared/Cards";
import { Cell, Circle, Cross } from "./Board.components";

export const Board: FC<{
  boardCells: PlayerCheckMark[];
  clickHandler: (id: number) => void;
}> = ({ boardCells, clickHandler }) => {
  const { gameState } = useGameContext();

  return (
    <motion.div drag dragSnapToOrigin>
      <GlassCard
        tw="grid grid-cols-3 grid-rows-3 grid-flow-row text-3xl rounded-xl overflow-hidden w-64 h-64 border-2 border-primary-900"
        css={{ boxShadow: "0 .25rem 1rem" + theme`colors.primary.900` + "CC" }}
        bgColor={tw`bg-primary-400`}
        size={"md"}
      >
        {boardCells.map((box, idx) => (
          <Cell
            key={idx}
            onClick={() =>
              gameState.nextPlayer === "human" ? clickHandler(idx) : null
            }
          >
            <AnimatePresence>
              {box === "o" ? (
                <Circle
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                />
              ) : box === "x" ? (
                <Cross
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  tw="w-4/5 h-4/5"
                />
              ) : null}
            </AnimatePresence>
          </Cell>
        ))}
      </GlassCard>
    </motion.div>
  );
};
