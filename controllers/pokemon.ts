import { getImage, PokemonImage } from "@/services/pokemon/get-image";
import { getShiny, PokemonShiny } from "@/services/pokemon/get-shiny";
import {
  getEvolution,
  PokemonEvolution,
} from "@/services/pokemon/get-evolution";
import { getAll } from "@/services/pokemon/get-all";
import { Pokemon, PokemonModel } from "@/models/pokemon";

export class PokemonController {
  static async getPokemon(name: string): Promise<Pokemon> {
    name = name.toLowerCase();

    const all: string[] = getAll();
    if (!all.includes(name)) return {} as Pokemon;

    const model = new PokemonModel(name);
    const exists = await model.exists();
    if (exists) return model.get();

    const shiny: PokemonShiny = await getShiny(name);
    const image: PokemonImage = await getImage(name);
    const evolutions: PokemonEvolution = await getEvolution(name);

    const pokemon: Pokemon = await model.create(name, shiny, image, evolutions);
    return pokemon;
  }
}
