import create from "zustand";
import { persist } from "zustand/middleware";

import { PlayerType } from "../types/GeneralTypes";

type RecordedGame = {
  date: Date;
  winner: PlayerType;
};

type GamesHistoryStore = {
  playerName: string;
  recordedGames: RecordedGame[];
};

export const useStore = create<GamesHistoryStore>()(
  persist(
    set => ({
      playerName: "",
      setPlayerName: (newName: string) => set(() => ({ playerName: newName })),
      recordedGames: [],
      deleteRecordedGames: () => set(state => ({ recordedGames: [] })),
      addRecordedGames: (newGame: RecordedGame) =>
        set(state => ({
          recordedGames: [...state.recordedGames, { ...newGame }],
        })),
    }),
    {
      name: "tictactoeStorage",
    }
  )
);
