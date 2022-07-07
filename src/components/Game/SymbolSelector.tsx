import { Switch } from "@headlessui/react";
import { FC, useState } from "react";
import tw from "twin.macro";

import type { Symbol } from "../../types/GeneralTypes";

import { useGameContext } from "../../contexts/gameContext";
import { GlassStyles } from "../../style/GlassStyles";
import { Circle, Cross } from "../Board";

export const SymbolSelector: FC = () => {
  const { gameState, setGameState } = useGameContext();
  const [enabled, setEnabled] = useState(true);

  const handleChange = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    const [humanSym, aiSym]: Symbol[] = nextState ? ["o", "x"] : ["x", "o"];
    setGameState({
      players: {
        human: { ...gameState.players.human, symbol: humanSym },
        ai: { ...gameState.players.ai, symbol: aiSym },
      },
    });
  };

  return (
    // @ts-ignore
    <Switch
      checked={enabled}
      onChange={handleChange}
      css={[
        tw`transition ease-in-out bg-slate-200 text-slate-100 backdrop-blur-sm relative inline-flex h-10 w-24 items-center rounded-full`,
        GlassStyles,
      ]}
    >
      <span
        css={[
          enabled ? tw`translate-x-12` : null,
          tw`transition ease-in-out inline-block h-12 w-12 transform rounded-full bg-primary-500`,
        ]}
      />
      <Circle
        css={[
          enabled ? tw`h-8 w-8` : tw`h-5 w-5 border-2`,
          tw`transition-all absolute right-2`,
        ]}
      />
      <Cross
        css={[
          enabled ? tw`h-6 w-6 left-2` : tw`h-10 w-10 left-1`,
          tw`transition-all absolute`,
        ]}
      />
    </Switch>
  );
};
