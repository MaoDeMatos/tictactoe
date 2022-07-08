import create from "zustand";
import { persist } from "zustand/middleware";

import { PlayerType } from "../types/GeneralTypes";

type RecordedGame = {
  id: number;
  date: Date;
  winner: PlayerType | null;
};

type GamesHistoryStore = {
  lastPlayer: PlayerType;
  recordedGames: RecordedGame[];
  setLastPlayer: (newPlayer: PlayerType) => void;
  deleteRecordedGames: () => void;
  addToRecordedGames: (newGame: RecordedGame) => void;
};

export const useStore = create<GamesHistoryStore>()(
  persist(
    set => ({
      lastPlayer: { name: "", symbol: "o" },
      recordedGames: [],
      setLastPlayer: (newPlayer: PlayerType) =>
        set(() => ({ lastPlayer: newPlayer })),
      deleteRecordedGames: () => set(() => ({ recordedGames: [] })),
      addToRecordedGames: (newGame: RecordedGame) =>
        set(state => ({
          recordedGames: [...state.recordedGames, { ...newGame }],
        })),
    }),
    {
      name: "tictactoeStorage",
    }
  )
);
