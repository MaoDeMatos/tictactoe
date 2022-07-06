import { ReactNode } from "react";

export type HasChildren = {
  children?: ReactNode | undefined;
};

export type PlayerType = {
  name: string;
  symbol: "o" | "x";
};
