import { Command } from "@cliffy/command";
import { skins } from "$cli/pet/skins.ts";
import { db } from "$cli/db.ts";

export const statsCommand = new Command()
  .description("Show stats")
  .alias("s")
  .action(async () => {
    const pet = await db.skin.get() || "cat";
    console.log(skins.get(pet)(`I am hungry...`));
    console.log(`Hunger: 0 | Joy: 0 | Happiness: 100`)
  });