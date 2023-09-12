import { PokemonImage } from "@/services/pokemon/get-image";
import { PokemonShiny } from "@/services/pokemon/get-shiny";
import { PokemonEvolution } from "@/services/pokemon/get-evolution";
import { Client } from "@/database/client";
import { Filter } from "mongodb";

export type Pokemon = {
  name: string;
  shiny: PokemonShiny;
  image: PokemonImage;
  evolutions: PokemonEvolution;
};

export class PokemonModel {
  constructor(public name: string) {}

  async get(): Promise<any> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    const pokemon = collection.findOne({
      name: this.name,
    }) as Filter<Pokemon>;
    if (!pokemon) return {} as Pokemon;
    return pokemon;
  }

  async create(
    name: string,
    shiny: PokemonShiny,
    image: PokemonImage,
    evolutions: PokemonEvolution,
  ): Promise<Pokemon> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    const pokemon = { name, shiny, image, evolutions };
    collection.insertOne(pokemon);
    return pokemon as Pokemon;
  }

  async exists(): Promise<boolean> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    const exists = collection.findOne({ name: this.name });
    if (!exists) return false;
    return true;
  }

  async save(): Promise<void> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    collection.updateOne({ name: this.name }, { $set: this }, { upsert: true });
  }
}
