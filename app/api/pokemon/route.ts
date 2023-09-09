import { NextResponse } from "next/server";
import { getAll } from "@/services/pokemon/get-all";

export async function GET(request: Request) {
  const data = getAll();
  return NextResponse.json(data);
}
