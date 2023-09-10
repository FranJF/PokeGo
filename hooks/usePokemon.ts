import { useEffect, useState } from "react";
import { PokemonShiny } from "@/services/pokemon/get-shiny";

const ENDPOINT_SHINY = "/api/shiny/";
const ENDPOINT_IMAGE = "/api/image/";

export const usePokemon = ({ selectedPokemon }: any) => {
  selectedPokemon = selectedPokemon.toLowerCase();

  const [pokemon, setPokemon] = useState({} as PokemonShiny);
  const [pokemonIsShiny, setPokemonsIsShiny] = useState(false);
  const [dataImagen, setDataImagen] = useState({} as any);
  const [pokemonImage, setImage] = useState(undefined);

  useEffect(() => {
    if (pokemonIsShiny) {
      setImage(dataImagen.front_shiny);
      return;
    }
    setImage(dataImagen.front_default);
  }, [pokemonIsShiny, dataImagen]);

  useEffect(() => {
    const shinyInLocalStorage = localStorage.getItem(
      "shiny-" + selectedPokemon,
    );
    if (shinyInLocalStorage) {
      setPokemon(JSON.parse(shinyInLocalStorage));
      return;
    }
    fetch(ENDPOINT_SHINY + selectedPokemon.split("-")[0])
      .then((res: any) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data: any) => {
        setPokemon(data);
        localStorage.setItem("shiny-" + selectedPokemon, JSON.stringify(data));
      })
      .catch((err) => {
        setPokemon({} as PokemonShiny);
      });
  }, [selectedPokemon]);

  useEffect(() => {
    const imageInLocalStorage = localStorage.getItem(
      "image-" + selectedPokemon,
    );
    if (imageInLocalStorage) {
      setDataImagen(JSON.parse(imageInLocalStorage));
      return;
    }

    fetch(ENDPOINT_IMAGE + selectedPokemon)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data: any) => {
        setDataImagen(data);
        localStorage.setItem("image-" + selectedPokemon, JSON.stringify(data));
      })
      .catch((err) => {
        setDataImagen(null);
      });
  }, [pokemon]);

  return {
    pokemon,
    pokemonIsShiny,
    pokemonImage,
    setPokemonsIsShiny,
  };
};
