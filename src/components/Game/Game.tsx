import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import "twin.macro";

import { Players, Symbol } from "../../types/GeneralTypes";

import { useGameContext } from "../../contexts/gameContext";
import { calculateWin, findMessageByName, isBoardFilled } from "../../utils";
import { trigger } from "../../utils/events";
import { Board } from "../Board";
import { NameInput } from "./NameInput";
import { SymbolSelector } from "./SymbolSelector";

export const Game: FC = () => {
  const { gameState, setGameState, resetGame } = useGameContext();

  const findPlayerWithSymbol = (symbol: Symbol) => {
    return gameState.players.human.symbol === symbol
      ? gameState.players.human
      : gameState.players.ai;
  };

  const toggleNextPlayer = () => {
    setGameState({
      nextPlayer: gameState.nextPlayer === "human" ? "ai" : "human",
    });
  };

  const setPlayers = (players: Players) => {
    setGameState({ players: players });
  };

  const handleClick = (id: number) => {
    if (gameState.currentGameStatus !== "in progress") return;

    if (gameState.boardCells[id]) {
      trigger("changeMessage", findMessageByName("cellNotEmptyError"));
      return;
    }

    // Create new array from boardCells as
    // using its ref won't fire a re-render
    const newBoard = [...gameState.boardCells];
    newBoard[id] = gameState.players[gameState.nextPlayer].symbol;

    setGameState({ boardCells: newBoard });

    const winningSymbol = calculateWin(newBoard);

    if (isBoardFilled(newBoard) && !winningSymbol) {
      trigger("changeMessage", findMessageByName("gameTie"));
      setGameState({ currentGameStatus: "tie" });
      return;
    }

    if (winningSymbol) {
      trigger(
        "changeMessage",
        findMessageByName("gameWon")(findPlayerWithSymbol(winningSymbol).name)
      );
      setGameState({ currentGameStatus: "finished" });
      return;
    }

    toggleNextPlayer();
  };

  // Trigger events on "nextPlayer" change
  useEffect(() => {
    trigger(
      "changeMessage",
      findMessageByName("playerTurn")(
        gameState.players[gameState.nextPlayer].name
      )
    );
  }, [gameState.nextPlayer]);

  // Trigger events on "selectedPage" change
  useEffect(() => {
    if (gameState.selectedPage === "setup") {
      trigger("changeMessage", findMessageByName("enterYourName"));
    } else if (gameState.selectedPage === "board") {
      trigger(
        "changeMessage",
        findMessageByName("initBoard")(gameState.players.human.symbol)
      );
    } else if (gameState.selectedPage === "results") {
      trigger("changeMessage", findMessageByName("resultsHeader"));
    }
  }, [gameState.selectedPage]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { delay: 1.5, duration: 2 } }}
    >
      {/* <button
        type="button"
        onClick={() =>
          selectedPage === "setup"
            ? setSelectedPage("board")
            : setSelectedPage("setup")
        }
      >
        Page toggle
      </button> */}

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={gameState.selectedPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {gameState.selectedPage === "setup" ? (
            <div tw="flex flex-col justify-center items-center gap-6">
              <SymbolSelector />
              <NameInput />
            </div>
          ) : gameState.selectedPage === "board" ? (
            <Board
              boardCells={gameState.boardCells}
              clickHandler={handleClick}
            />
          ) : gameState.selectedPage === "results" ? (
            <div>Results</div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
};
