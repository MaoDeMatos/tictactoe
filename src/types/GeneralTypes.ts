import { ReactNode } from "react";

export type HasChildren = {
  children?: ReactNode | undefined;
};

export type isClickable = {
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void) | (() => void);
};
