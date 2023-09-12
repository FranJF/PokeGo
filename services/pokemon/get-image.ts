import { PokemonClient } from "pokenode-ts";

export type PokemonImage = {
  image: string;
  default: string;
  shiny: string;
};

export async function getImage(n: string): Promise<PokemonImage> {
  const name = n.toLowerCase();
  const api = new PokemonClient();
  const request: any = api.getPokemonByName(name);

  return request
    .then((data: any) => {
      if (!data) return;
      if (!data.sprites) return;
      if (!data.sprites.front_default) return;
      if (!data.sprites.front_shiny) return;

      const pokemonImage: PokemonImage = {
        image: data.sprites.front_default,
        default: data.sprites.front_default,
        shiny: data.sprites.front_shiny,
      };
      return pokemonImage;
    })
    .catch(() => {
      return { error: "Pokemon image not found" };
    });
}
