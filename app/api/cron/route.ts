import { NextResponse } from "next/server";
import { Client } from "@/database/client";
import { getAll } from "@/services/pokemon/get-all";
import { Pokemon } from "@/models/pokemon";
import { PokemonController } from "@/controllers/pokemon";

export async function GET() {
  await syncAllPokemons();
  return NextResponse.json({ ok: true });
}

async function syncAllPokemons() {
  const db = await Client.connect();

  const collection = db.collection("pokemon");
  const all: string[] = await getAll();
  all.forEach(async (name) => {
    const pokemon: Pokemon = await PokemonController.getPokemon(name);
    if (pokemon) {
      collection.updateOne(
        { id: pokemon.id },
        { $set: pokemon },
        { upsert: true },
      );
    }
  });
}
