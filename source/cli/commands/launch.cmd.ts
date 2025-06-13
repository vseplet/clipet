import { Command } from "@cliffy/command";

export const launchCommand = new Command()
  .description("Launch the app")
  .alias("l")
  .action(() => {
    console.log("launch");
  });