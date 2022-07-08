import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import {
  HiOutlineCog,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";
import tw, { styled } from "twin.macro";

import { PlayerCheckMark } from "../../types/GeneralTypes";

import { useGameContext } from "../../contexts/gameContext";
import { useStore } from "../../hooks/useStore";
import { fadeAndGrowAnimation } from "../../style/Animations";
import {
  calculateWin,
  findCell,
  findMessageByName,
  isBoardEmpty,
  isBoardFilled,
} from "../../utils";
import { trigger } from "../../utils/events";
import { Board } from "./Board";
import { NameInput } from "./NameInput";
import { ResultsHistory } from "./ResultsHistory";
import { SymbolSelector } from "./SymbolSelector";

export const Game: FC = () => {
  const store = useStore();
  const { gameState, setGameState, resetGame } = useGameContext();

  const findPlayerWithSymbol = (symbol: PlayerCheckMark) => {
    return gameState.players.human.symbol === symbol
      ? gameState.players.human
      : gameState.players.ai;
  };

  const setSelectedPage = (page: typeof gameState.currentPage) => {
    if (gameState.currentGameStatus !== "in progress") resetGame();

    setGameState({
      currentPage: page,
    });
  };

  const toggleNextPlayer = () => {
    setGameState({
      nextPlayer: gameState.nextPlayer === "human" ? "ai" : "human",
    });
  };

  const tickCell = (idx: number) => {
    if (gameState.boardCells[idx]) {
      trigger("changeMessage", findMessageByName("cellNotEmptyError"));
      return;
    }

    // Create new array from boardCells as
    // using its ref won't fire a re-render
    const newBoard = [...gameState.boardCells];
    newBoard[idx] = gameState.players[gameState.nextPlayer].symbol;

    setGameState({ boardCells: newBoard });

    const winningSymbol = calculateWin(newBoard);

    if (isBoardFilled(newBoard) && !winningSymbol) {
      trigger("changeMessage", findMessageByName("gameTie"));
      setGameState({ currentGameStatus: "tie" });

      store.setLastPlayer(gameState.players.human);
      store.addToRecordedGames({
        id: store.recordedGames.length,
        date: new Date(),
        winner: null,
      });

      return;
    }

    if (winningSymbol) {
      const winner = findPlayerWithSymbol(winningSymbol);

      trigger("changeMessage", findMessageByName("gameWon")(winner.name));
      setGameState({ currentGameStatus: "finished" });

      store.setLastPlayer(gameState.players.human);
      store.addToRecordedGames({
        id: Date.now(),
        date: new Date(),
        winner: winner,
      });

      return;
    }

    toggleNextPlayer();
  };

  const handleClick = (idx: number) => {
    if (gameState.currentGameStatus !== "in progress") return;

    tickCell(idx);
  };

  // On "nextPlayer" change
  useEffect(() => {
    trigger(
      "changeMessage",
      findMessageByName("playerTurn")(
        gameState.players[gameState.nextPlayer].name
      )
    );

    let timer = setTimeout(() => null, 0);

    if (gameState.nextPlayer === "ai") {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const bestCell = findCell(
          [...gameState.boardCells],
          gameState.players.ai
        );
        if (bestCell !== -1) tickCell(bestCell);
      }, 1250);
    }

    return () => clearTimeout(timer);
  }, [gameState.nextPlayer]);

  // On "selectedPage" change
  useEffect(() => {
    if (gameState.currentPage === "setup") {
      trigger("changeMessage", findMessageByName("enterYourName"));
    } else if (gameState.currentPage === "board") {
      trigger(
        "changeMessage",
        findMessageByName("initBoard")(gameState.players.human.symbol)
      );
    } else if (gameState.currentPage === "results") {
      trigger("changeMessage", findMessageByName("resultsHeader"));
    }
  }, [gameState.currentPage]);

  return (
    <motion.main
      {...fadeAndGrowAnimation}
      transition={{ delay: 1.5, duration: 1 }}
      tw="flex w-full sm:w-auto flex-col justify-center items-center gap-6"
    >
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
              <HiOutlineCog tw="transform transition-transform duration-700 w-full h-full hover:(rotate-45)" />
            </motion.button>
          )}

          {!isBoardEmpty(gameState.boardCells) &&
            gameState.currentPage === "board" && (
              <motion.button
                type="button"
                key="resetButton"
                {...fadeAndGrowAnimation}
                transition={{ duration: 0.25 }}
                tw="w-8 h-8 col-start-2"
                onClick={() => resetGame()}
              >
                <FaSync tw="transform transition-transform duration-700 w-full h-full hover:(rotate-180)" />
              </motion.button>
            )}

          {gameState.currentPage === "results" && (
            <motion.button
              type="button"
              key="boardPageButton"
              {...fadeAndGrowAnimation}
              transition={{ duration: 0.25 }}
              tw="w-8 h-8 col-start-2"
              onClick={() => setSelectedPage("board")}
            >
              <HiOutlineViewGrid tw="transform transition-transform duration-700 w-full h-full hover:(scale-110)" />
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
              <HiOutlineViewList tw="w-full h-full" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={gameState.currentPage}
          initial={{ opacity: 0, scale: 0.9, height: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            height: "auto",
          }}
          exit={{ opacity: 0, scale: 0.9, height: 0 }}
          transition={{ duration: 0.25 }}
          tw="flex flex-col w-full justify-center items-center gap-8"
        >
          {gameState.currentPage === "setup" ? (
            <VerticalCenteredContainer>
              {/* TODO: Add disabled variant to SymbolSelector when game is in progress */}
              <SymbolSelector />
              <NameInput />
            </VerticalCenteredContainer>
          ) : gameState.currentPage === "board" ? (
            <Board
              boardCells={gameState.boardCells}
              clickHandler={handleClick}
            />
          ) : gameState.currentPage === "results" ? (
            <ResultsHistory />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
};

const VerticalCenteredContainer = styled(motion.div)`
  ${tw`flex flex-col justify-center items-center gap-6`}
`;
