import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import "twin.macro";

import { PlayerType } from "../../types/GeneralTypes";

import { findMessageByName } from "../../utils";
import { trigger } from "../../utils/events";
import { Board } from "../Board";
import { NameInput } from "./NameInput";

export const Game: FC = () => {
  const [selectedPage, setSelectedPage] = useState<
    "setup" | "board" | "results"
  >("board");
  const [player, setPlayer] = useState<PlayerType>({ name: "", symbol: "o" });
  // const AI: PlayerType = { name: "the AI", symbol: "x" };

  useEffect(() => {
    if (selectedPage === "setup") {
      trigger("changeMessage", findMessageByName("enterYourName"));
    } else if (selectedPage === "board") {
      trigger("changeMessage", findMessageByName("initBoard"));
    } else if (selectedPage === "results") {
      trigger("changeMessage", findMessageByName("resultsHeader"));
    }
  }, [selectedPage]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { delay: 1.5, duration: 2 } }}
    >
      {/* <button
        type="button"
        onClick={() =>
          selectedPage === "setup"
            ? setSelectedPage("board")
            : setSelectedPage("setup")
        }
      >
        Page toggle
      </button> */}

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
    </motion.main>
  );
};
