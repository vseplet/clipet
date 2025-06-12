import { Command } from "@cliffy/command";
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

// let username = "";


const main = async () => {
  const app = new Command();

  app.name("clipet")
    .description("Tamagotchi-pomodoro timer for the cli")
    .action(() => {
      app.showHelp()
    })
    .command("focus", focusCommand)
    .command("break", breakCommand)
    .command("launch", launchCommand)
    .command("stats", statsCommand)
    .parse(Deno.args);

  // username = prompt(`type your name:`) || "unknown";

  // cleanPage();
  // enable();
  // await hideCursor();

  // await disable();
};

await main();
