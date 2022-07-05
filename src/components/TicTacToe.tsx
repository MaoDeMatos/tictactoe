import { AnimatePresence, motion } from "framer-motion";
import { FC, Fragment, MouseEvent, useState } from "react";
import "twin.macro";

import { capitalizeFirstLetter, messagesToDisplay } from "../utils";
import { trigger } from "../utils/events";
import { Board } from "./Board";
import { GlassCard } from "./shared/Cards";

export type PlayerType = {
  name: string;
};

export const TicTacToe: FC = () => {
  const [selectedPage, setSelectedPage] = useState("setup");
  const [player, setPlayer] = useState<PlayerType>({ name: "" });
  const AI: PlayerType = { name: "the AI" };

  return (
    <Fragment>
      <button
        type="button"
        onClick={() =>
          selectedPage === "setup"
            ? setSelectedPage("board")
            : setSelectedPage("setup")
        }
      >
        Page toggle {/* Temporary */}
      </button>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={selectedPage ?? "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {selectedPage === "setup" ? (
            <NameInput
              setPage={setSelectedPage}
              player={player}
              setPlayer={setPlayer}
            />
          ) : selectedPage === "board" ? (
            <Board />
          ) : selectedPage === "results" ? (
            <div></div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
};

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

    setPlayer({ name: capitalizeFirstLetter(playerNameInput.value).trim() });
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
