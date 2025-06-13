import { Command } from "@cliffy/command";
import { db } from "$cli/db.ts";

export const resetCommand = new Command()
  .description("Reset the pet")
  .alias("r")
  .action(async () => {
    await db.reset();
    console.log("reset done");
  });