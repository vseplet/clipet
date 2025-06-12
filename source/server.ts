import {
  domain,
  introText,
  kv,
  psScript,
  shScript,
  toolName,
} from "./common.ts";

const socialNetworks = {
  twitter: {
    name: "Twitter/X",
    color: "rgb(29 161 242)",
    icon: "🐦 X ",
    shareUrl: `https://twitter.com/intent/tweet?text=Check%20out%20${toolName}%20-%20a%20tamagotchi-pomodoro%20for%20the%20cli!%20https://github.com/vseplet/${toolName}`,
  },
  facebook: {
    name: "Facebook",
    color: "rgb(66 103 178)",
    icon: "👥 FB ",
    shareUrl: `https://www.facebook.com/sharer/sharer.php?u=https://github.com/vseplet/${toolName}`,
  },
  reddit: {
    name: "Reddit",
    color: "rgb(255 69 0)",
    icon: "🔴 Reddit ",
    shareUrl: `https://www.reddit.com/submit?url=https://github.com/vseplet/${toolName}&title=Check%20out%20${toolName}%20-%20a%20tamagotchi-pomodoro%20for%20the%20cli!`,
  },
  hackernews: {
    name: "Hacker News",
    color: "rgb(255 102 0)",
    icon: "🧡 HN ",
    shareUrl: `https://news.ycombinator.com/submitlink?u=https://github.com/vseplet/${toolName}&t=Check%20out%20${toolName}%20-%20a%20tamagotchi-pomodoro%20for%20the%20cli!`,
  },
  linkedin: {
    name: "LinkedIn",
    color: "rgb(0 119 181)",
    icon: "💼 LinkedIn ",
    shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/vseplet/${toolName}`,
  },
  mastodon: {
    name: "Mastodon",
    color: "rgb(99 100 255)",
    icon: "🐘 Mastodon ",
    shareUrl: `https://mastodon.social/share?text=Check%20out%20${toolName}%20-%20a%20tamagotchi-pomodoro%20for%20the%20cli!%20https://github.com/vseplet/${toolName}`,
  },
};

// deno-fmt-ignore
export const home = async () => {
  const stars = await getGitHubStars();
  return `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Tamagotchi-pomodoro for the cli</title>
    <link rel="icon" href="data:image/svg+xml,
    %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E
      %3Ctext y='0.9em' font-size='90'%3E🍅%3C/text%3E
    %3C/svg%3E" />

    <meta name="description" content="Tamagotchi-pomodoro for the cli">
    <meta name="keywords" content="tamagotchi, pomodoro, cli, timer">
    <meta name="author" content="Vsevolod Pletnev">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:title" content="Tamagotchi-pomodoro for the cli">
    <meta property="og:description" content="Tamagotchi-pomodoro for the cli">
    <meta property="og:image" content="https://clipet.deno.dev/og-image.png" />
    <meta property="og:url" content="https://clipet.deno.dev" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Tamagotchi-pomodoro for the cli" />

    <style>
      * {
        background: rgb(54 31 57);
        color: white;
        font-family: monospace;
      }

      pre {
        font-size: 14px;
        line-height: 1.4;
        white-space: pre;
      }

      .header {
        color: rgb(255 236 0);
      }

      .sh {
        color: #00ff54;
      }

      .installs {
        color: rgb(0 239 255);
      }

      .stars {
        color: rgb(255 236 0);
      }

      .social-share {
        display: inline-flex;
        gap: 8px;
        align-items: center;
      }

      .social-share a {
        color: inherit;
        position: relative;
        text-decoration: none;
      }

      .social-share a:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 0;
        top: 100%;
        background: #fff;
        color: #000;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 16px;
        white-space: nowrap;
        z-index: 1;
      }

      .stars a {
        position: relative;
      }

      .stars a:hover::after {
        content: "Star this project on GitHub! 🌟";
        position: absolute;
        left: 0;
        top: 100%;
        background: #fff;
        color: #000;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 16px;
        white-space: nowrap;
        z-index: 1;
      }
    </style>
  </head>
  <body>
    <pre>
      <span class="header">${
        introText.replace(
          /https?:\/\/[^\s]+/g,
          (url) => `<a href="${url}">${url}</a>`,
        )
      }</span>
      <span style="color: orange">🚀 Total installs: ${(await kv.get(["installs"])).value}</span>

      Share on
      <span class="social-share">${
          Object.entries(socialNetworks)
            .map(([key, network]) =>
              `<a href="${network.shareUrl}" style="color: ${network.color}" data-tooltip="Share on ${network.name}! ${network.icon}">${network.icon}</a>`
            )
            .join(" ")
        }
      </span>

      <span class="stars"><a href="https://github.com/vseplet/${toolName}" style="color: rgb(255 236 0);">⭐ GitHub Stars:</a> ${stars}</span>

      <span class="header">Install / Update</span>

        Unix-like: <span class="sh">curl -fsSL ${domain} | sh</span>
        Windows:   <span class="sh">irm ${domain} | iex</span>

      <span class="header">Run</span>          <span class="sh">${toolName}</span>

      <span class="header">View installation script</span>

        Unix-like: <span class="sh">curl -sL ${domain}</span>
        Windows:   <span class="sh">irm ${domain}</span>

      <span class="header">How to use</span>
  </body>
</html>
`;
};

const getGitHubStars = async (): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/vseplet/${toolName}`);
    if (!response.ok) {
      return "N/A";
    }
    const data = await response.json();
    return data.stargazers_count.toString();
  } catch (e) {
    console.error("Failed to fetch GitHub stars:", e);
    return "N/A";
  }
};

const updateInstallsCount = async () => {
  try {
    if ((await kv.get<number>(["installs"])).value === null) {
      await kv.set(["installs"], new Deno.KvU64(1n));
      return;
    }

    await kv.atomic()
      .mutate({
        type: "sum",
        key: ["installs"],
        value: new Deno.KvU64(1n),
      })
      .commit();
  } catch (e) {
    console.log(e);
  }
};

const requestHandler = async (req: Request) => {
  const userAgent = req.headers.get("User-Agent");
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (userAgent?.includes("curl")) {
    await updateInstallsCount();
    return new Response(shScript);
  } else if (userAgent?.includes("PowerShell")) {
    await updateInstallsCount();
    return new Response(psScript);
  } else if (userAgent?.includes("Deno") && method == "GET") {
    return new Response(await Deno.readFile(`./source${path}`));
  } else if (method == "GET" && path == "/") {
    return new Response(await home(), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } else {
    return new Response("unknown");
  }
};

Deno.serve(requestHandler);
