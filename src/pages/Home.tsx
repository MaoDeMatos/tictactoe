import { motion } from "framer-motion";
import { FC, Fragment } from "react";
import { SiGithub } from "react-icons/si";
import "twin.macro";

import { Game } from "../components/Game/Game";
import { Informations } from "../components/Informations";
import Particles from "../components/shared/Particles";

export const Home: FC = () => {
  return (
    <Fragment>
      <Particles />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { delay: 1, duration: 2 } }}
        tw="flex flex-col justify-center items-center h-full w-full gap-4 p-4 sm:p-8"
      >
        <div tw="flex flex-col justify-center items-center text-center font-bold">
          <motion.a
            drag
            dragSnapToOrigin
            dragConstraints={{
              top: -4,
              left: -4,
              right: 4,
              bottom: 4,
            }}
            href="https://github.com/MaoDeMatos/tictactoe"
            target="_blank"
            rel="noreferrer noopener"
            tw="absolute top-4 right-4"
          >
            <SiGithub tw="h-8 w-8" />
          </motion.a>

          <h1
            tw="text-5xl sm:text-8xl font-montserrat mb-4 sm:mb-8"
            css={{ textShadow: "0 0 0.5rem currentColor" }}
          >
            T<span tw="text-primary-400">I</span>C T
            <span tw="text-primary-400">A</span>C T
            <span tw="text-primary-400">O</span>E
          </h1>

          <Informations />
        </div>

        <Game />
      </motion.div>
    </Fragment>
  );
};
