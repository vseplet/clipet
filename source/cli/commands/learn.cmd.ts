import { Command } from "@cliffy/command";

export const learnAction = async () => {
  console.log("learn");
}

export const learnCommand = new Command()
  .description("Learn the basics")
  .alias("l")
  .action(learnAction);
