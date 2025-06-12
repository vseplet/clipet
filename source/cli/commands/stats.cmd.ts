import { Command } from "@cliffy/command";

export const statsCommand = new Command()
  .description("Show stats")
  .action(() => {
    console.log("stats");
  });