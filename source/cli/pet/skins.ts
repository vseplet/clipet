

const cat = (msg: string = "") => {
  return `|\\---/|
| o_o |  ${msg}
 \\_^_/`;
};

const dog = (msg: string = "") => {
  return `  __      _
o'')}____//
 \`_/      )  ${msg}
 (_(_/-(_/`;
};

const bird = (msg: string = "") => {
  return ` ,_,
(O,O)  ${msg}
(   )
-"-"--`;
};

const ascii = { cat, dog, bird };

const get = (pet: string) => {
  return ascii[pet as keyof typeof ascii];
}

export const skins = {
  get,
}

export type PetSkin = keyof typeof ascii;