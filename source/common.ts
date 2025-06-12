// Constants
export const kv = await Deno.openKv();

export const baseURL = Deno.permissions.querySync &&
    Deno.permissions.querySync({ name: "env" }).state === "granted"
  ? Deno.env.get(`BASE_URL`) || "https://localhost:8000"
  : `https://clipet.deno.dev`;

export const domain = baseURL.split("//")[1];

export const toolName = "clipet";

export const introText = `
       _____  ____   ___  _____  _____  ____
      /     \\/  _/  /___\\/  _  \\/   __\\/    \\
      |  |--||  |---|   ||   __/|   __|\\-  -/
      \\_____/\\_____/\\___/\\__/   \\_____/ |__|

      Tamagotchi-pomodoro for the command line

      Created by Vsevolod Pletnev
      https://linkedin.com/in/sevapp

      Source Code:
      https://github.com/vseplet/${toolName}
`;

export const installCommand =
  `deno install -g -f -r --unstable-kv --allow-net=${
    baseURL.split("//")[1]
  } ${baseURL}/cli.ts -n ${toolName}`;

export const shScript = `
if ! command -v deno &> /dev/null
then
    echo "Deno is not installed. Proceeding with installation..."
    curl -fsSL https://deno.land/install.sh | sh
else
    echo "Deno is already installed."
fi

${installCommand}
`;

export const psScript = `
if (Get-Command deno -ErrorAction SilentlyContinue) {
  Write-Host "Deno is already installed."
} else {
  Write-Host "Deno is not installed. Proceeding with installation..."
  Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://deno.land/install.ps1'))
}

${installCommand}
`;