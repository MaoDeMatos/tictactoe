import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useReducer, useState } from "react";
import "twin.macro";

import { PlayerType, Players, Symbol } from "../../types/GeneralTypes";

import { calculateWin, findMessageByName, isBoardFilled } from "../../utils";
import { trigger } from "../../utils/events";
import { Board } from "../Board";
import { NameInput } from "./NameInput";
import { SymbolSelector } from "./SymbolSelector";

type GameStateType = {
  selectedPage: "setup" | "board" | "results";
  players: Players;
  nextPlayer: keyof Players;
  boardCells: Symbol[];
  currentGameIs: "in progress" | "finished" | "tie";
};

const GameStateReducer = (prevState: any, action: any) => {
  return {};
};

export const Game: FC = () => {
  const gameStateDefaultValue: GameStateType = {
    selectedPage: "setup",
    players: {
      human: { name: "David", symbol: "o" },
      ai: { name: "the AI", symbol: "x" },
    },
    nextPlayer: "human",
    boardCells: Array(9).fill(null),
    currentGameIs: "in progress",
  };

  const reducer = useReducer(GameStateReducer, gameStateDefaultValue);

  const [selectedPage, setSelectedPage] = useState<
    "setup" | "board" | "results"
  >("setup");
  const [players, setPlayers] = useState<Players>({
    human: { name: "David", symbol: "o" },
    ai: { name: "the AI", symbol: "x" },
  });
  const [nextPlayer, setNextPlayer] = useState<keyof Players>("human");

  // const baseBoardData: Symbol[] = ["o", "o", "o", "x", "x", "x", "x", "x", "x"];
  const baseBoardData = Array(9).fill(null);
  const [boardCells, setBoardCells] = useState<Symbol[]>(baseBoardData);

  const [currentGameIs, setCurrentGameIs] = useState<
    "in progress" | "finished" | "tie"
  >("in progress");

  const toggleNextPlayer = () => {
    setNextPlayer(nextPlayer === "human" ? "ai" : "human");
  };

  const findPlayerWithSymbol = (symbol: Symbol) => {
    return players.human.symbol === symbol ? players.human : players.ai;
  };

  const setHuman = (human: PlayerType) => {
    setPlayers({ human: human, ai: players.ai });
  };

  const handleClick = (id: number) => {
    if (currentGameIs !== "in progress") return;

    if (boardCells[id]) {
      trigger("changeMessage", findMessageByName("cellNotEmptyError"));
      return;
    }

    // Create new array from boardCells as
    // using its ref won't fire a re-render
    const newBoard = [...boardCells];
    newBoard[id] = players[nextPlayer].symbol;

    setBoardCells(newBoard);

    const winningSymbol = calculateWin(newBoard);

    if (isBoardFilled(newBoard) && !winningSymbol) {
      trigger("changeMessage", findMessageByName("gameTie"));
      setCurrentGameIs("tie");
      return;
    }

    if (winningSymbol) {
      trigger(
        "changeMessage",
        findMessageByName("gameWon")(findPlayerWithSymbol(winningSymbol).name)
      );
      setCurrentGameIs("finished");
      return;
    }

    toggleNextPlayer();
  };

  // Trigger events on "nextPlayer" change
  useEffect(() => {
    trigger(
      "changeMessage",
      findMessageByName("playerTurn")(players[nextPlayer].name)
    );
  }, [nextPlayer]);

  // Trigger events on "selectedPage" change
  useEffect(() => {
    if (selectedPage === "setup") {
      trigger("changeMessage", findMessageByName("enterYourName"));
    } else if (selectedPage === "board") {
      trigger(
        "changeMessage",
        findMessageByName("initBoard")(players.human.symbol)
      );
    } else if (selectedPage === "results") {
      trigger("changeMessage", findMessageByName("resultsHeader"));
    }
  }, [selectedPage]);

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
          key={selectedPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {selectedPage === "setup" ? (
            <div tw="flex flex-col justify-center items-center gap-6">
              <SymbolSelector players={players} setPlayers={setPlayers} />
              <NameInput
                setPage={setSelectedPage}
                human={players.human}
                setHuman={setHuman}
              />
            </div>
          ) : selectedPage === "board" ? (
            <Board boardCells={boardCells} clickHandler={handleClick} />
          ) : selectedPage === "results" ? (
            <div>Results</div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
};
