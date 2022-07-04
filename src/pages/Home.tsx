import { FC } from "react";
import "twin.macro";

import { BaseButton } from "../components/shared/Buttons";

export const Home: FC = () => {
  return (
    <main tw="flex flex-col justify-center items-center h-full w-full gap-4 p-4 sm:p-8">
      <BaseButton size="sm" />
      <BaseButton size="md" />
      <BaseButton size="lg" />
      {/* Page header */}
      {/* Game Board */}
      {/* History */}
    </main>
  );
};
