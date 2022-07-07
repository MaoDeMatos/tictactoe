import { MouseEvent, ReactNode } from "react";

export type HasChildren = {
  children?: ReactNode | undefined;
};

// export type isClickable = {
//   onClick?: (e: MouseEvent) => void;
// };

export type isClickable = {
  onClick?: (e: MouseEvent) => void;
};

export type Symbol = "o" | "x" | null;

export type PlayerType = {
  name: string;
  symbol: Symbol;
};

export type Players = {
  human: PlayerType;
  ai: PlayerType;
};

export type MessageType = {
  name: string;
  type: "default" | "error" | "victory";
  message: string;
};
