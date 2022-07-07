import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import tw from "twin.macro";

import { findMessageByName } from "../utils";
import { off, on } from "../utils/events";

export const Informations = () => {
  const [informations, setInformations] = useState(findMessageByName());

  function handleInformationsChange(e: CustomEvent) {
    setInformations(e.detail);
  }

  // "informations" changes when a new "changeMessage" event is catched
  // useEffect will add the listener on mount and remove it on dismount
  useEffect(() => {
    on("changeMessage", handleInformationsChange);

    return () => off("changeMessage", handleInformationsChange);
  }, [informations]);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.h2
        key={informations.message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        tw="sm:text-xl font-montserrat mb-8 sm:mb-16"
        css={[
          informations.type === "error"
            ? tw`text-red-300`
            : informations.type === "victory"
            ? tw`text-primary-400`
            : null,
        ]}
      >
        <p tw="relative">{informations.message}</p>
      </motion.h2>
    </AnimatePresence>
  );
};
