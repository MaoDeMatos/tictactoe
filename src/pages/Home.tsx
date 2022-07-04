import { FC } from "react";
import "twin.macro";

import { Board } from "../components/Board";

export const Home: FC = () => {
  return (
    <main tw="flex flex-col justify-center items-center h-full w-full gap-4 p-4 sm:p-8">
      <h1 tw="text-8xl font-montserrat mb-16">TIC TAC TOE</h1>

      {/* Page header */}
      <Board />
      {/* History */}
    </main>
  );
};
