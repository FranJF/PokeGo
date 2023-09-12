import { EvolutionClient, PokemonClient } from "pokenode-ts";

export type PokemonEvolution = {
  chain: string[];
  index: number;
};

export async function getEvolution(n: string): Promise<PokemonEvolution | any> {
  const name = n.toLowerCase();

  const pokemonApi = new PokemonClient();
  let species;
  try {
    species = await pokemonApi.getPokemonSpeciesByName(name);
  } catch (e) {
    return {
      error: "Pokemon not found",
    };
  }

  const evolutionChainId: any = species.evolution_chain?.url.split("/").at(-2);
  if (!evolutionChainId) throw new Error("Species not found");

  const evolutionApi = new EvolutionClient();
  const data = await evolutionApi.getEvolutionChainById(evolutionChainId);
  if (!data) throw new Error("Evolution chain not found");

  let chain = [];
  while (data.chain.evolves_to.length > 0) {
    chain.push(data.chain.species.name);
    data.chain = data.chain.evolves_to[0];
    chain.push(data.chain.species.name);
  }
  chain = [...new Set(chain)];

  return {
    chain,
    index: chain.indexOf(name),
  } as PokemonEvolution;
}
