import { Command } from "@cliffy/command";

export const focusCommand = new Command()
  .description("Start a focus")
  .alias("f")
  .action(() => {
    console.log("focus");
  });