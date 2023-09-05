import allPokemon from '@/models/data/pokemon_names.json';

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

export class PokemonModel {
    static async getByName(n: string): Promise<Array<string>> {
        const name = n.toLowerCase();
        const all: string[] = allPokemon.filter((p: string) => p.toLowerCase().includes(name));
        return all.map((p: string) => `<option id="${p}">${p}</option>`);
    }

    static async getAll(): Promise<Array<string>> {
        return allPokemon
    }
}
