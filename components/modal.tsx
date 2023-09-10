"use client";

import { motion } from "framer-motion";
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
import { usePokemon } from "@/hooks/usePokemon";

export default function PokemonModal({ selection }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pokemonIsShiny, setPokemonsIsShiny] = useState(false);
  const [pokemon, pokemonImage] = usePokemon({ selectedPokemon: selection });

  useEffect(() => {
    onOpen();
  }, [pokemon]);

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
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  className="flex justify-center"
                >
                  <Avatar
                    isBordered
                    color={borderColor}
                    src={imagen}
                    imgProps={{
                      alt:
                        "Pixel art image from the Pokemon named: " + selection,
                    }}
                    className="w-3/4 h-3/4 self-center cursor-pointer"
                    onClick={() => setPokemonsIsShiny(!pokemonIsShiny)}
                  />
                </motion.div>

                <div className="flex flex-col gap-1 mt-2"></div>

                <div className="flex flex-col gap-3 items-start content-start">
                  <p>Se puede encontrar shiny de estas formas:</p>
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
                </div>
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
