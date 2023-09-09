import { NextResponse } from "next/server";
import { getShiny } from "@/services/pokemon/get-shiny";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const name = params.name;
  const pokemon = await getShiny(name);
  if (!pokemon) return { message: "Pokemon shiny not found" };
  return NextResponse.json(pokemon);
}
