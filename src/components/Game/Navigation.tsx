import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { FaSync } from "react-icons/fa";
import {
  HiOutlineCog,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";
import "twin.macro";

import { useGameContext } from "../../contexts/gameContext";
import { useStore } from "../../hooks/useStore";
import { fadeAndGrowAnimation } from "../../style/Animations";
import { isBoardEmpty } from "../../utils";

export const Navigation: FC = () => {
  const store = useStore();
  const { gameState, setGameState, resetGame } = useGameContext();

  const setSelectedPage = (page: typeof gameState.currentPage) => {
    if (gameState.currentGameStatus !== "in progress") resetGame();

    setGameState({
      currentPage: page,
    });
  };

  return (
    <div tw="w-full grid grid-cols-3 all-child:(place-self-center)">
      <AnimatePresence>
        {gameState.currentPage !== "setup" && (
          <motion.button
            type="button"
            key="setupPageButton"
            {...fadeAndGrowAnimation}
            transition={{ duration: 0.25 }}
            tw="w-10 h-10 col-start-1"
            onClick={() => setSelectedPage("setup")}
          >
            <HiOutlineCog
              tw="transform transition-all duration-700 w-full h-full hover:(rotate-45 text-primary-400)"
              css={{ filter: "drop-shadow(0 0 2px currentColor)" }}
            />
          </motion.button>
        )}

        {!isBoardEmpty(gameState.boardCells) &&
          gameState.currentPage === "board" && (
            <motion.button
              type="button"
              key="resetButton"
              {...fadeAndGrowAnimation}
              transition={{ duration: 0.25 }}
              tw="w-8 h-8 col-start-2 row-start-1"
              onClick={() => resetGame()}
            >
              <FaSync
                tw="transform transition-all duration-700 w-full h-full hover:(rotate-180 text-primary-400)"
                css={{ filter: "drop-shadow(0 0 2px currentColor)" }}
              />
            </motion.button>
          )}

        {gameState.currentPage === "results" && (
          <motion.button
            type="button"
            key="boardPageButton"
            {...fadeAndGrowAnimation}
            transition={{ duration: 0.25 }}
            tw="w-8 h-8 col-start-2 row-start-1"
            onClick={() => setSelectedPage("board")}
          >
            <HiOutlineViewGrid
              tw="w-full h-full transition-colors duration-700 hover:text-primary-400"
              css={{ filter: "drop-shadow(0 0 2px currentColor)" }}
            />
          </motion.button>
        )}

        {store.recordedGames.length > 0 && (
          <motion.button
            type="button"
            key="resultsPageButton"
            {...fadeAndGrowAnimation}
            transition={{ duration: 0.25 }}
            tw="w-10 h-10 col-start-3"
            onClick={() => setSelectedPage("results")}
          >
            <HiOutlineViewList
              tw="w-full h-full transition-colors duration-700 hover:text-primary-400"
              css={{ filter: "drop-shadow(0 0 2px currentColor)" }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
