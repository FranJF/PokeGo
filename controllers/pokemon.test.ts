import { expect, test, describe } from "bun:test";
import { PokemonController } from "./pokemon";
import { Pokemon } from "@/models/pokemon";

describe("Pokemon controller should be able to get a lot of data from services", () => {
  test("should return pokemon", async () => {
    const bulbasaur = await PokemonController.getPokemon("bulbasaur");
    const charmander = await PokemonController.getPokemon("charmander");
    const squirtle = await PokemonController.getPokemon("squirtle");
    const rayquaza = await PokemonController.getPokemon("rayquaza");

    const pokemons = [bulbasaur, charmander, squirtle, rayquaza];

    pokemons.forEach((pokemon) => {
      checkPokemon(pokemon);
    });
  });
});

const checkPokemon = (pokemon: Pokemon) => {
  expect(pokemon.name).toBeDefined();
  expect(pokemon.shiny).toBeDefined();
  expect(pokemon.shiny.egg).toBeDefined();
  expect(pokemon.shiny.wild).toBeDefined();
  expect(pokemon.shiny.raid).toBeDefined();
  expect(pokemon.shiny.research).toBeDefined();
  expect(pokemon.shiny.photobomb).toBeDefined();
  expect(pokemon.image).toBeDefined();
  expect(pokemon.image.image).toBeDefined();
  expect(pokemon.image.default).toBeDefined();
  expect(pokemon.image.shiny).toBeDefined();
  expect(pokemon.evolutions).toBeDefined();
  expect(pokemon.evolutions.chain).toBeDefined();
  expect(pokemon.evolutions.index).toBeDefined();
};
