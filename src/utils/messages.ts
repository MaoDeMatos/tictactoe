import { MessageType } from "../types/GeneralTypes";

export type MessagesToDisplayType = ((param?: any) => MessageType)[];

export const messagesToDisplay: MessagesToDisplayType = [
  () => ({
    name: "emptyMessage",
    error: false,
    message: " ",
  }),
  // Informations
  () => ({ name: "enterYourName", error: false, message: "Enter your name !" }),
  () => ({
    name: "initBoard",
    error: false,
    message: "Click on an empty box to place a circle and start playing !",
  }),
  (playerName: string) => ({
    name: "playerTurn",
    error: false,
    message: `It's ${playerName}'s turn`,
  }),
  () => ({ name: "resultsHeader", error: false, message: "Results" }),
  // Errors
  () => ({
    name: "nameError",
    error: true,
    message: "You must enter a valid name !",
  }),
];
