import { messagesToDisplay } from "./messages";

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const findMessageByName = (messageName: string = "") =>
  messagesToDisplay.find(el => el().name === messageName) ??
  messagesToDisplay[0];
