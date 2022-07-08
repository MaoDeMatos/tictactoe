import { Dispatch, FC, createContext, useContext, useReducer } from "react";

import { BoardType, HasChildren, Players } from "../types/GeneralTypes";

import { useStore } from "../hooks/useStore";
import { findMessageByName } from "../utils";
import { trigger } from "../utils/events";

export type GameState = {
  currentPage: "setup" | "board" | "results";
  players: Players;
  nextPlayer: keyof Players;
  boardContent: BoardType;
  currentGameStatus: "in progress" | "finished" | "tie";
};

const GameCtx = createContext<{
  gameState: GameState;
  setGameState: Dispatch<Partial<GameState>>;
  resetGame: () => void;
}>(null!);

const GameContextProvider: FC<HasChildren> = props => {
  const store = useStore();

  const gameStateDefaultValue: GameState = {
    currentPage: "setup",
    players: {
      human: store.lastPlayer,
      ai: {
        name: "the AI",
        symbol: store.lastPlayer.symbol === "x" ? "o" : "x",
      },
    },
    nextPlayer: "human",
    boardContent: Array(9).fill(null),
    currentGameStatus: "in progress",
  };

  const [gameState, setGameState] = useReducer(
    (state: GameState, newStateProps: Partial<GameState>) => ({
      ...state,
      ...newStateProps,
    }),
    gameStateDefaultValue
  );

  const resetGame = () => {
    setGameState({
      ...gameStateDefaultValue,
      players: gameState.players,
      currentPage: gameState.currentPage,
    });
    trigger(
      "changeMessage",
      findMessageByName("initBoard")(gameState.players.human.symbol)
    );
  };

  return (
    <GameCtx.Provider
      value={{ gameState: gameState, setGameState, resetGame }}
      {...props}
    />
  );
};

function useGameContext() {
  return useContext(GameCtx);
}

export { GameContextProvider, useGameContext };
