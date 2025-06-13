import { PetSkin } from "./pet/skins.ts";

export const kv = await Deno.openKv();

const prefix = "clipet";

export const name = {
  get: async () => {
    const name = await kv.get<string>([prefix, "name"]);
    return name.value;
  },
  set: async (name: string) => {
    await kv.set([prefix, "name"], name);
  },
};

export const skin = {
  get: async () => {
    const skin = await kv.get<string>([prefix, "skin"]);
    return skin.value as PetSkin;
  },
  set: async (skin: string) => {
    await kv.set([prefix, "skin"], skin);
  },
};

export const reset = async() => {
  await kv.delete([prefix]);
}

export const db = {
  name,
  skin,
  reset,
}