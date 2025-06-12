import { Command } from "@cliffy/command";

export const launchCommand = new Command()
  .description("Launch the app")
  .action(() => {
    console.log("launch");
  });