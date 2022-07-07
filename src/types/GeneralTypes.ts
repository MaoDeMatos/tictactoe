import { MouseEvent, ReactNode } from "react";

export type HasChildren = {
  children?: ReactNode | undefined;
};

export type isClickable = {
  onClick?: (e: MouseEvent) => void;
};

export type PlayerCheckMark = "o" | "x" | null;

export type PlayerType = {
  name: string;
  symbol: PlayerCheckMark;
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
