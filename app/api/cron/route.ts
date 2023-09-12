import { NextResponse } from "next/server";
import { getAll } from "@/services/pokemon/get-all";
import { PokemonController } from "@/controllers/pokemon";
import { Client } from "@/database/client";
import { Pokemon } from "@/models/pokemon";

export async function GET() {
  await syncAllPokemons();
  return NextResponse.json({ ok: true });
}

async function syncAllPokemons() {
  const db = await Client.connect();
  const collection = db.collection("pokemon");

  const all: string[] = getAll();
  all.forEach(async (name) => {
    const pokemon: Pokemon = await PokemonController.getPokemon(name);
    if (pokemon) {
      await collection.updateOne(
        { name: pokemon.name },
        { $set: pokemon },
        { upsert: true },
      );
    }
  });
}
