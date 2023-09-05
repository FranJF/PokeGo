import { PokemonController } from '@/controllers/pokemon'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const data = await PokemonController.getAll()
    return NextResponse.json(data)
}
