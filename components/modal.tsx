"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Switch } from "@nextui-org/switch";
import { StartIcon } from "./icons";
import { usePokemon } from "@/hooks/usePokemon";

export default function PokemonModal({ selection }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pokemonIsShiny, setPokemonsIsShiny] = useState(false);
  const [pokemon, pokemonImage] = usePokemon({ selectedPokemon: selection });

  useEffect(() => {
    onOpen();
  }, [pokemon]);

  const handleOnSwitch = () => {
    setPokemonsIsShiny(!pokemonIsShiny);
  };

  const imagen = pokemonIsShiny
    ? pokemonImage.front_shiny
    : pokemonImage.front_default;

  const borderColor = pokemonIsShiny ? "secondary" : "default";

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2> {selection} </h2>
              </ModalHeader>

              <ModalBody>
                <Avatar
                  isBordered
                  color={borderColor}
                  className="w-3/4 h-3/4 self-center"
                  src={imagen}
                  imgProps={{
                    alt: "Pixel art image from the Pokemon named: " + selection,
                  }}
                />

                <Switch
                  className="mt-2"
                  defaultSelected={pokemonIsShiny}
                  size="lg"
                  color="secondary"
                  startContent={<StartIcon />}
                  endContent={<StartIcon />}
                  onChange={handleOnSwitch}
                >
                  Ver shiny
                </Switch>

                <Checkbox
                  value="found_wild"
                  isDisabled
                  isSelected={pokemon.found_wild}
                  color="secondary"
                >
                  Salvaje
                </Checkbox>
                <Checkbox
                  value="found_raid"
                  isDisabled
                  isSelected={pokemon.found_raid}
                  color="secondary"
                >
                  Incursiones
                </Checkbox>
                <Checkbox
                  value="found_research"
                  isDisabled
                  isSelected={pokemon.found_research}
                  color="secondary"
                >
                  Investigaciones
                </Checkbox>
                <Checkbox
                  value="found_egg"
                  isDisabled
                  isSelected={pokemon.found_egg}
                  color="secondary"
                >
                  Huevos
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
