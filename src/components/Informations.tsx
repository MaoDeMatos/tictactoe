import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import tw from "twin.macro";

import { messagesToDisplay } from "../utils";
import { off, on } from "../utils/events";

export const Informations = () => {
  // const [showInformations, setShowInformations] = useState(true);
  const [informations, setInformations] = useState(
    messagesToDisplay.enterYourName
  );

  function handleInformationsChange(e: CustomEvent) {
    setInformations(e.detail);
  }

  useEffect(() => {
    on("changeMessage", handleInformationsChange);

    return () => off("changeMessage", handleInformationsChange);
  }, [informations]);

  return (
    <AnimatePresence exitBeforeEnter>
      {/* {showInformations && ( */}
      <motion.h2
        key={informations.message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        tw="sm:text-xl font-montserrat mb-8 sm:mb-16"
        css={[informations.error ? tw`text-red-300` : null]}
      >
        <p tw="relative">{informations.message}</p>
      </motion.h2>
      {/* )} */}
    </AnimatePresence>
  );
};
