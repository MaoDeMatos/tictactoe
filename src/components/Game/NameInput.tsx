import { FC, MouseEvent } from "react";
import "twin.macro";

import { useGameContext } from "../../contexts/gameContext";
import { capitalizeFirstLetter, findMessageByName } from "../../utils";
import { trigger } from "../../utils/events";
import { GlassCard } from "../shared/Cards";

export const NameInput: FC = () => {
  const { gameState, setGameState } = useGameContext();

  function checkValue(e: MouseEvent) {
    e.preventDefault();
    const playerNameInput: HTMLInputElement | null = document.querySelector(
      "input[name=playerName]"
    );

    if (
      !playerNameInput?.value ||
      playerNameInput.value.length < 2 ||
      playerNameInput.value.length > 15
    ) {
      trigger("changeMessage", findMessageByName("nameError"));
      return;
    }

    setGameState({
      players: {
        ...gameState.players,
        human: {
          ...gameState.players.human,
          name: capitalizeFirstLetter(playerNameInput.value).trim(),
        },
      },
    });

    setGameState({ selectedPage: "board" });
  }

  return (
    <GlassCard
      as={"form"}
      tw="relative w-72 overflow-hidden transition ring-2 ring-transparent focus-within:(ring-primary-300 [button]:(font-bold bg-primary-300 text-primary-900))"
    >
      <input
        type="text"
        name="playerName"
        required
        minLength={2}
        maxLength={15}
        tw="relative -bottom-0.5 w-full bg-transparent outline-none ring-transparent border-transparent"
        defaultValue={gameState.players.human.name}
        placeholder="2 - 15 chars"
      />
      <button
        type="submit"
        onClick={e => checkValue(e)}
        tw="transition bg-primary-500 px-6 absolute -right-0.5 -top-0.5 -bottom-0.5"
      >
        Play
      </button>
    </GlassCard>
  );
};
