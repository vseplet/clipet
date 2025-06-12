import { Command } from "@cliffy/command";

export const focusCommand = new Command()
  .description("Start a focus")
  .action(() => {
    console.log("focus");
  });