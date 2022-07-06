import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import "twin.macro";

import { PlayerType } from "../../types/GeneralTypes";

import { Board } from "../Board/Board";
import { NameInput } from "./NameInput";

export const MainContent: FC = () => {
  const [selectedPage, setSelectedPage] = useState("setup");
  const [player, setPlayer] = useState<PlayerType>({ name: "", symbol: "o" });
  const AI: PlayerType = { name: "the AI", symbol: "x" };

  return (
    <main>
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
    </main>
  );
};
