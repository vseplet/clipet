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
import * as colors from "jsr:@std/fmt/colors";
import { baseURL, introText } from "./common.ts";

// let username = "";


const main = async () => {
  await writeln(introText);
  // username = prompt(`type your name:`) || "unknown";

  // cleanPage();
  // enable();
  // await hideCursor();

  // await disable();
};

await main();
