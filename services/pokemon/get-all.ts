import allPokemon from "@/models/data/pokemon_names.json";

export async function getAll() {
  return allPokemon;
}
