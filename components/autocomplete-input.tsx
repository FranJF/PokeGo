"use client";

import { Input } from "@nextui-org/input";
import { PokemonSelect } from "@/components/select";
import { useEffect, useState } from "react";

export const AutoCompleteInput = ({ data }: any) => {
  const [dataInput, setDataInput] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    if (dataInput.length >= 3) {
      const nombrePokemon = data.filter((item: string) =>
        item.includes(dataInput),
      );
      setDataSelect(nombrePokemon);
      return;
    }
    setDataSelect([]);
  }, [dataInput]);

  return (
    <>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center">
        <Input
          isClearable
          type="text"
          value={dataInput}
          variant="bordered"
          label="Pokemon"
          onChange={(e) => setDataInput(e.target.value)}
          onClear={() => setDataInput("")}
        />
      </div>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center">
        {dataSelect.length > 0 && <PokemonSelect data={dataSelect} />}
      </div>
    </>
  );
};
