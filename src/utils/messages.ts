import { MessageType, Symbol } from "../types/GeneralTypes";

import { capitalizeFirstLetter } from ".";

export type MessagesToDisplayType = ((param?: any) => MessageType)[];

export const messagesToDisplay: MessagesToDisplayType = [
  () => ({
    name: "emptyMessage",
    type: "default",
    message: " ",
  }),
  (message: string) => ({
    name: "customMessage",
    type: "default",
    message: `${message}`,
  }),
  // Informations
  () => ({
    name: "enterYourName",
    type: "default",
    message: "Enter your name !",
  }),
  (symbol: Symbol) => ({
    name: "initBoard",
    type: "default",
    message: `Click on an empty box to place a ${
      symbol === "o" ? "circle" : "cross"
    } and start playing !`,
  }),
  (playerName: string) => ({
    name: "playerTurn",
    type: "default",
    message: `It's ${playerName}'s turn`,
  }),
  () => ({ name: "resultsHeader", type: "default", message: "Results" }),
  (playerName: string) => ({
    name: "gameWon",
    type: "victory",
    message: `${capitalizeFirstLetter(playerName)} won the game !`,
  }),
  () => ({ name: "gameTie", type: "default", message: "It's a tie !" }),
  // Errors
  () => ({
    name: "nameError",
    type: "error",
    message: "You must enter a valid name !",
  }),
  () => ({
    name: "cellNotEmptyError",
    type: "error",
    message: "You must click on an empty cell !",
  }),
];
