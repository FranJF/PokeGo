import { NextResponse } from "next/server";
import { getImage } from "@/services/pokemon/get-image";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const name = params.name;
  const pokemon = await getImage(name);
  if (!pokemon)
    return NextResponse.json({ message: "Pokemon image not found" });
  return NextResponse.json(pokemon);
}
