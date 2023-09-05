import { kv } from "@vercel/kv";
import { PokemonClient } from 'pokenode-ts';

type PokemonImage = {
    image: string,
    front_default: string,
    front_shiny: string,
}

export async function getImage(n: string): Promise<any> {
    const name = n.toLowerCase();
    const client = kv;
    try {
        await client.get(name)
        const image = await client.get(name)
        if (image) return image;
    } catch (err) {
        console.log(err);
    }

    const api = new PokemonClient();
    const request = api.getPokemonByName(name)

    return request
        .then((data) => {
            if (!data) return;
            if (!data.sprites) return;
            if (!data.sprites.front_default) return;
            if (!data.sprites.front_shiny) return;

            const pokemonImage: PokemonImage = {
                front_default: data.sprites.front_default,
                front_shiny: data.sprites.front_shiny,
                image: data.sprites.front_default,
            }
            client.set(name, pokemonImage);
            return pokemonImage;
        })
        .catch((err) => {
            console.log(err);
            return;
        })

}
