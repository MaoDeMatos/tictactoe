export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const messagesToDisplay = {
  // Informations
  enterYourName: {
    error: false,
    message: "Enter your name !",
  },
  initBoard: {
    error: false,
    message: "Click on an empty box to place a circle and start playing !",
  },
  playerTurn: (playerName: string) => `It's ${playerName}'s turn`,
  // Errors
  nameError: {
    error: true,
    message: "You must enter a valid name !",
  },
};
