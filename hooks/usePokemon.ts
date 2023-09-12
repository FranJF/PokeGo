import { useEffect, useState } from "react";
import { Pokemon } from "@/models/pokemon";

const ENDPOINT = "/api/pokemon/";

export const usePokemon = ({ selectedPokemon }: any) => {
  selectedPokemon = selectedPokemon.toLowerCase();
  const emptyPokemon = {
    name: "",
    shiny: {
      egg: false,
      evolution: false,
      found_evolution: false,
      found_egg: false,
      found_photobomb: false,
      found_raid: false,
      found_research: false,
      found_wild: false,
      id: 0,
      photobomb: false,
      raid: false,
      research: false,
      wild: false,
    },
    image: { default: "", image: "", shiny: "" },
    evolutions: { chain: [], index: 0 },
  } as Pokemon;

  const [pokemon, setPokemon] = useState(emptyPokemon);
  const [isShiny, setShiny] = useState(false);

  useEffect(() => {
    const pokemonInLocalStorage = localStorage.getItem(selectedPokemon);
    if (pokemonInLocalStorage) {
      setPokemon(JSON.parse(pokemonInLocalStorage));
      return;
    }

    fetch(ENDPOINT + selectedPokemon)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data: any) => {
        console.log(data);
        setPokemon(data);
        localStorage.setItem(selectedPokemon, JSON.stringify(data));
      })
      .catch((err) => {
        setPokemon({} as Pokemon);
      });
  }, [selectedPokemon]);

  return {
    pokemon,
    isShiny,
    setShiny,
  };
};
