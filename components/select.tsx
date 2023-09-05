import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import PokemonModal from "./modal";


export const PokemonSelect = ({ data }: any) => {
    const [selected, setselected] = useState(null)
    const handleChange = (event: any) => {
        const pokemon = event.target.value;
        setselected(pokemon);
    }

    return (
        <>
            <Select
                items={data}
                label="Pokemon"
                placeholder="Selecciona un pokemon"
                className="max-w-xs"
                onChange={handleChange}
            >
                {data.map((pokemon: any) => <SelectItem key={pokemon}>{pokemon}</SelectItem>)}
            </Select >

            {selected && <PokemonModal selection={selected} onClose={() => setselected(null)} />}
        </>
    );
}

