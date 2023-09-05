"use client"

import { Input } from "@nextui-org/input";
import { PokemonSelect } from "@/components/select";
import { useState } from "react";


export const AutoCompleteInput = ({ data }: any) => {
    const [dataInput, setDataInput] = useState("")
    const [dataSelect, setDataSelect] = useState([])
    const handleChange = (event: any) => {
        const value: any = event.target.value;
        const d = data.filter((item: string) => item.includes(value));
        setDataSelect(d);
    }


    return (
        <div className="flex gap-3">
            <Input type="text" value={dataInput} variant="bordered" label="Pokemon"
                onChange={e => setDataInput(e.target.value)}
                onKeyUp={handleChange}
            />
            <div className="flex gap-3">
                {dataSelect.length > 0 && <PokemonSelect data={dataSelect} />}
            </div>
        </div>
    );
};
