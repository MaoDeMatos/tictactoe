import { FC, MouseEvent } from "react";
import "twin.macro";

import { PlayerType } from "../../types/GeneralTypes";

import { capitalizeFirstLetter, messagesToDisplay } from "../../utils";
import { trigger } from "../../utils/events";
import { GlassCard } from "../shared/Cards";

export type NameInputProps = {
  setPage: Function;
  player: PlayerType;
  setPlayer: Function;
};

export const NameInput: FC<NameInputProps> = ({
  setPage,
  player,
  setPlayer,
}) => {
  function checkValue(e: MouseEvent) {
    e.preventDefault();
    const playerNameInput: HTMLInputElement | null = document.querySelector(
      "input[name=playerName]"
    );

    if (
      !playerNameInput?.value ||
      playerNameInput.value.length < 3 ||
      playerNameInput.value.length > 15
    ) {
      trigger("changeMessage", messagesToDisplay.nameError);
      return;
    }

    setPlayer({
      ...player,
      name: capitalizeFirstLetter(playerNameInput.value).trim(),
    });
    changePage();
  }

  function changePage() {
    trigger("changeMessage", messagesToDisplay.initBoard);
    setPage("board");
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
        defaultValue={player.name}
        placeholder="3 - 15 chars"
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
