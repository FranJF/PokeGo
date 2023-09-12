import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import PokemonModal from "./modal";

export const PokemonSelect = ({ data }: any) => {
  const [selected, setSelected]: any = useState(null);

  return (
    <>
      <Select
        items={data}
        label="Pokemon"
        placeholder="Select your Pokemon"
        className="max-w-lg"
        variant="underlined"
        onChange={(e) => setSelected(e.target.value)}
      >
        {data.map((pokemon: any) => (
          <SelectItem key={pokemon}>{pokemon}</SelectItem>
        ))}
      </Select>

      {selected && (
        <PokemonModal selection={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
