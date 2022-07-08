import { Switch } from "@headlessui/react";
import { FC, useState } from "react";
import tw from "twin.macro";

import type { PlayerCheckMark } from "../../types/GeneralTypes";

import { useGameContext } from "../../contexts/gameContext";
import { GlassStyles } from "../../style/GlassStyles";
import { findMessageByName, isBoardEmpty } from "../../utils";
import { trigger } from "../../utils/events";
import { Circle, Cross } from "./Board";

export const SymbolSelector: FC = () => {
  const { gameState, setGameState } = useGameContext();
  const [enabled, setEnabled] = useState(
    gameState.players.human.symbol === "o" ? true : false
  );
  const isClickable =
    gameState.currentGameStatus !== "in progress" ||
    isBoardEmpty(gameState.boardCells);

  const handleChange = isClickable
    ? () => {
        const nextState = !enabled;
        setEnabled(nextState);
        const [humanSym, aiSym]: PlayerCheckMark[] = nextState
          ? ["o", "x"]
          : ["x", "o"];
        setGameState({
          players: {
            human: { ...gameState.players.human, symbol: humanSym },
            ai: { ...gameState.players.ai, symbol: aiSym },
          },
        });
      }
    : () =>
        trigger("changeMessage", findMessageByName("cannotChangeSymbolError"));

  return (
    // @ts-ignore
    <Switch
      checked={enabled}
      onChange={handleChange}
      css={[
        tw`transition ease-in-out bg-slate-200 text-slate-100 backdrop-blur-sm relative inline-flex h-10 w-24 items-center rounded-full`,
        GlassStyles,
        !isClickable && tw`opacity-60`,
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
