import { Command } from "@cliffy/command";

export const breakCommand = new Command()
  .description("Start a break")
  .alias("b")
  .action(() => {
    console.log("break");
  });