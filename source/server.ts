import {
  domain,
  introText,
  kv,
  psScript,
  shScript,
  toolName,
} from "./common.ts";

// deno-fmt-ignore
export const home = async () => {
  const stars = await getGitHubStars();
  return `
<html>
  <head>
    <title>CliPet</title>
    <style>
      * {
        background: rgb(60 14 99);
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

      .stars a {
        position: relative;
        // text-decoration: none;
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
      <span class="installs">Total installs:  ${(await kv.get(["installs"])).value}</span>

      <span class="stars"><a href="https://github.com/vseplet/${toolName}" style="color: rgb(255 236 0);">⭐ GitHub Stars: ${stars}</a></span>

      <span class="header">Install / Update</span>

        Unix-like: <span class="sh">curl -fsSL ${domain} | sh</span>
        Windows:   <span class="sh">irm ${domain} | iex</span>

      <span class="header">Run</span>          <span class="sh">${toolName}</span>

      <span class="header">View installation script</span>

        Unix-like: <span class="sh">curl -sL ${domain}</span>
        Windows:   <span class="sh">irm ${domain}</span>
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
