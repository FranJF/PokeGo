"use client";

import { Input } from "@nextui-org/input";
import { PokemonSelect } from "@/components/select";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function PokemonSearch({ data }: any) {
  const [dataInput, setDataInput] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const searchPokemon = useDebouncedCallback((value: string) => {
    if (value.length >= 3) {
      const nombrePokemon = data.filter((item: string) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      setDataSelect(nombrePokemon);
      return;
    }
    setDataSelect([]);
  }, 300);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setDataInput(value);
    searchPokemon(value);
  };

  return (
    <>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center mb-4">
        <Input
          isClearable
          type="text"
          variant="bordered"
          label="Search a Pokemon"
          value={dataInput}
          onChange={handleChange}
          onClear={() => {
            setDataInput("");
            setDataSelect([]);
          }}
        />
      </div>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center items-center">
        {dataSelect.length > 0 && <PokemonSelect data={dataSelect} />}
      </div>
    </>
  );
}
