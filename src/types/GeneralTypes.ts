import { ReactNode } from "react";

export type HasChildren = {
  children?: ReactNode | undefined;
};

export type PlayerType = {
  name: string;
  symbol: "o" | "x";
};

export type MessageType = {
  name: string;
  error: boolean;
  message: string;
};

export type BoardCellType = "o" | "x" | null;
