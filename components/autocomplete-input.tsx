"use client";

import { Input } from "@nextui-org/input";
import { PokemonSelect } from "@/components/select";
import { useState } from "react";

export const AutoCompleteInput = ({ data }: any) => {
  const [dataInput, setDataInput] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const handleChange = (event: any) => {
    const value: any = event.target.value;
    const d = data.filter((item: string) => item.includes(value));
    setDataSelect(d);
  };

  return (
    <>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center">
        <Input
          type="text"
          value={dataInput}
          variant="bordered"
          label="Pokemon"
          onChange={(e) => setDataInput(e.target.value)}
          onKeyUp={handleChange}
        />
      </div>
      <div className="inline-block w-full h-full max-w-lg text-center justify-center">
        {dataSelect.length > 0 && <PokemonSelect data={dataSelect} />}
      </div>
    </>
  );
};
