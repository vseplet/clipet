import { Command } from "@cliffy/command";
import { Select } from "@cliffy/prompt";
import {
  BlinkingCursor,
  cleanPage,
  disable,
  enable,
  hideCursor,
  nicknameToColorCode,
  readKeys,
  Spinner,
  stripAnsiAndControlChars,
  TextBuffer,
  writeln,
} from "./tui.ts";
import { baseURL, introText } from "$/common.ts";

import { breakCommand } from "$cli/commands/break.cmd.ts";
import { focusCommand } from "$cli/commands/focus.cmd.ts";
import { launchCommand } from "$cli/commands/launch.cmd.ts";
import { statsCommand } from "$cli/commands/stats.cmd.ts";
import { skins } from "$cli/pet/skins.ts";
import { learnCommand } from "$cli/commands/learn.cmd.ts";
import { resetCommand } from "$cli/commands/reset.cmd.ts";
import { db } from "$cli/db.ts";

const main = async () => {
  if (!await db.name.get()) {
    const username = prompt(`type your name:`) || "unknown";

    const skin: string = await Select.prompt({
      message: "Pick your pet",
      options: Object.keys(skins).map((skin) => ({ name: skin, value: skin })),
    });

    await db.name.set(username);
    await db.skin.set(skin);
  }

  const skin = await db.skin.get();
  const name = await db.name.get();

  console.log(skins.get(skin)(`Hello, ${name}!`));

  // cleanPage();
  // enable();
  // await hideCursor();

  // await disable();
};

const app = new Command();

app.name("clipet")
  .description("Tamagotchi-pomodoro timer for the cli")
  .action(main)
  .command("focus", focusCommand)
  .command("break", breakCommand)
  .command("launch", launchCommand)
  .command("stats", statsCommand)
  .command("learn", learnCommand)
  .command("reset", resetCommand)
  .parse(Deno.args);
