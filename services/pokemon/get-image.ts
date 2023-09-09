import { ClientV2 } from "@/database/client-v2";
import { PokemonClient } from "pokenode-ts";

type PokemonImage = {
  name: string;
  image: string;
  front_default: string;
  front_shiny: string;
};

export async function getImage(n: string): Promise<any> {
  const name = n.toLowerCase();
  const db = await ClientV2.connect();
  const collection = db.collection("images");

  const imageInDB = await getImageFromDB(collection, name);
  if (imageInDB) return imageInDB;

  const imageInAPI = await getImageFromAPI(name);
  if (imageInAPI) {
    collection.insertOne(imageInAPI);
    return imageInAPI;
  }

  return { message: "Pokemon image not found" };
}

const getImageFromDB = async (
  collection: any,
  name: string,
): Promise<PokemonImage | undefined> => {
  const imageInDB: any[] = await collection.find({}).toArray();

  if (imageInDB.length > 0) {
    const data = imageInDB.find((p) => p.name == name);
    if (data) {
      const pokemonImage: PokemonImage = {
        front_default: data.front_default,
        front_shiny: data.front_shiny,
        image: data.front_default,
        name: data.name,
      };
      return pokemonImage;
    }
  }
};

const getImageFromAPI = async (
  name: string,
): Promise<PokemonImage | undefined> => {
  const api = new PokemonClient();
  const request: any = api.getPokemonByName(name);

  return request
    .then((data: any) => {
      if (!data) return;
      if (!data.sprites) return;
      if (!data.sprites.front_default) return;
      if (!data.sprites.front_shiny) return;

      const pokemonImage: PokemonImage = {
        front_default: data.sprites.front_default,
        front_shiny: data.sprites.front_shiny,
        image: data.sprites.front_default,
        name: data.name,
      };
      return pokemonImage;
    })
    .catch((err: any) => {
      console.log(err);
      return;
    });
};
