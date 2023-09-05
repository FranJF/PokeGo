import { PokemonModel } from '../models/database/pokemon.ts'
import { getImage } from '@/services/pokemon/get-image.ts'
import { getShiny } from '@/services/pokemon/get-shiny.ts'

export class PokemonController {
    static async getImageByName(name: string) {
        const pokemon = await getImage(name)
        if (!pokemon) return { message: 'Pokemon image not found' }
        return pokemon
    }
    static async getShinyByName(name: string) {
        const pokemon = await getShiny(name)
        if (!pokemon) return { message: 'Pokemon shiny not found' }
        return pokemon
    }

    static async getByName(req: any, res: any) {
        const name = req.query.name
        const pokemon = await PokemonModel.getByName(name)
        if (pokemon) return res.json(pokemon)
        res.status(404).json({ message: 'Pokemon not found' })
    }

    static async getAll() {
        const pokemon: any = await PokemonModel.getAll()
        return pokemon
    }

}
