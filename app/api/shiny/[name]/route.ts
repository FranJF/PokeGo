import { NextResponse } from 'next/server'
import { PokemonController } from '@/controllers/pokemon'

export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    const name = params.name
    const data = await PokemonController.getShinyByName(name)
    return NextResponse.json(data)
}
