import { NextResponse } from "next/server";
import { PokemonController } from "@/controllers/pokemon";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const name = params.name;
  const pokemon = await PokemonController.getPokemon(name);
  if (!pokemon) return NextResponse.json({ message: "Pokemon not found" });
  return NextResponse.json(pokemon);
}
