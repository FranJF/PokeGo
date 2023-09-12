import { PokemonImage } from "@/services/pokemon/get-image";
import { PokemonShiny } from "@/services/pokemon/get-shiny";
import { PokemonEvolution } from "@/services/pokemon/get-evolution";
import { Client } from "@/database/client";

export type Pokemon = {
  id: number;
  name: string;
  shiny: PokemonShiny;
  image: PokemonImage;
  evolutions: PokemonEvolution;
};

export class PokemonModel {
  constructor(
    public id: number,
    public name: string,
    public shiny: PokemonShiny,
    public image: PokemonImage,
    public evolutions: PokemonEvolution,
  ) {}

  async exists(): Promise<boolean> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    const exists = collection.findOne({ id: this.id });
    if (!exists) return false;
    return true;
  }

  async save(): Promise<void> {
    const db = await Client.connect();
    const collection = db.collection("pokemon");
    collection.updateOne({ id: this.id }, { $set: this }, { upsert: true });
  }
}
