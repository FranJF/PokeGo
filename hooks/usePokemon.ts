import { useEffect, useState } from "react";
import { PokemonShiny } from "@/services/pokemon/get-shiny";

const ENDPOINT_SHINY = "/api/shiny/";
const ENDPOINT_IMAGE = "/api/image/";

export const usePokemon = ({ selectedPokemon }: any) => {
  const [pokemon, setPokemon] = useState({} as PokemonShiny);
  const [pokemonImage, setPokemonImage] = useState({} as any);

  useEffect(() => {
    const shinyInLocalStorage = localStorage.getItem(
      "shiny-" + selectedPokemon,
    );
    if (shinyInLocalStorage) {
      setPokemon(JSON.parse(shinyInLocalStorage));
      return;
    }
    const getShiny: any = fetch(ENDPOINT_SHINY + selectedPokemon).then(
      (data: any) => data.json(),
    );
    getShiny.then((data: any) => {
      setPokemon(data);
      localStorage.setItem("shiny-" + selectedPokemon, JSON.stringify(data));
    });
  }, [selectedPokemon]);

  useEffect(() => {
    const imageInLocalStorage = localStorage.getItem(
      "image-" + selectedPokemon,
    );
    if (imageInLocalStorage) {
      setPokemonImage(JSON.parse(imageInLocalStorage));
      return;
    }

    const getImage = fetch(ENDPOINT_IMAGE + selectedPokemon).then((data: any) =>
      data.json(),
    );
    getImage.then((data: any) => {
      setPokemonImage(data);
      localStorage.setItem("image-" + selectedPokemon, JSON.stringify(data));
    });
  }, [pokemon]);

  return [pokemon, pokemonImage];
};
