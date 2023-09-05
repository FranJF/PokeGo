import { kv } from "@vercel/kv";

const URL = "https://pogoapi.net/api/v1/shiny_pokemon.json";

export type PokemonShiny = {
    id: number,
    name: string,
    found_wild: boolean,
    found_raid: boolean,
    found_egg: boolean,
    found_research: boolean,
    found_evolution: boolean,
    found_photobomb: boolean,
}

export async function getShiny(n: string): Promise<PokemonShiny | undefined> {
    const client = kv;
    let shinys;

    try {
        const r = await client.get("shinys");
        if (r) {
            shinys = r;
        } else {
            await fetch(URL).then((res) => res.json()).then((data) => (shinys = data));
        }
    } catch (err) {
        await fetch(URL).then((res) => res.json()).then((data) => (shinys = data));
    }

    if (!shinys) return;

    const name = n.toLowerCase();

    const shinyPokemonsParsed: PokemonShiny[] = Object.values(shinys);
    const wantedPokemon: PokemonShiny | undefined = shinyPokemonsParsed.find((p: PokemonShiny) => p.name.toLowerCase() == name);

    return wantedPokemon;

}
