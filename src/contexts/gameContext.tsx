import { Dispatch, FC, createContext, useContext, useReducer } from "react";

import { HasChildren, Players, Symbol } from "../types/GeneralTypes";

export type GameState = {
  selectedPage: "setup" | "board" | "results";
  players: Players;
  nextPlayer: keyof Players;
  boardCells: Symbol[];
  currentGameStatus: "in progress" | "finished" | "tie";
};

const gameStateDefaultValue: GameState = {
  selectedPage: "setup",
  players: {
    human: { name: "David", symbol: "o" },
    ai: { name: "the AI", symbol: "x" },
  },
  nextPlayer: "human",
  boardCells: Array(9).fill(null),
  currentGameStatus: "in progress",
};

const GameCtx = createContext<{
  gameState: GameState;
  setGameState: Dispatch<Partial<GameState>>;
  resetGame: () => void;
}>(null!);

const GameContextProvider: FC<HasChildren> = props => {
  const [gameState, setGameState] = useReducer(
    (state: GameState, newStateProps: Partial<GameState>) => ({
      ...state,
      ...newStateProps,
    }),
    gameStateDefaultValue
  );

  const resetGame = () => {
    setGameState(gameStateDefaultValue);
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
