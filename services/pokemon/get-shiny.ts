const URL = "https://pogoapi.net/api/v1/shiny_pokemon.json";

export type PokemonShiny = {
  id: number;
  wild: boolean;
  raid: boolean;
  egg: boolean;
  research: boolean;
  evolution: boolean;
  photobomb: boolean;
};

const PROBLEMATIC_POKEMONS: string[] = ["giratina-altered", "giratina-origin"];

export async function getShiny(n: string): Promise<PokemonShiny | any> {
  if (PROBLEMATIC_POKEMONS.includes(n)) n = n.split("-")[0];

  const name = n.toLowerCase();
  const shinys = await fetch(URL).then((res) => res.json());

  const shinyPokemonsParsed: object[] = Object.values(shinys);
  const wantedPokemon: any = shinyPokemonsParsed.find(
    (p: any) => p.name.toLowerCase() == name,
  );

  if (!wantedPokemon) return { error: "Pokemon shiny not found" };

  return {
    id: wantedPokemon.id,
    wild: wantedPokemon.found_wild,
    raid: wantedPokemon.found_raid,
    egg: wantedPokemon.found_egg,
    research: wantedPokemon.found_research,
    evolution: wantedPokemon.found_evolution,
    photobomb: wantedPokemon.found_photobomb,
  };
}
