"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
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
  const { pokemon, pokemonIsShiny, pokemonImage, setPokemonsIsShiny } =
    usePokemon({ selectedPokemon: selection });
  const borderColor = pokemonIsShiny ? "secondary" : "default";

  useEffect(() => {
    onOpen();
  }, [pokemon]);

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
                    src={pokemonImage}
                    imgProps={{
                      alt:
                        "Pixel art image from the Pokemon named: " + selection,
                    }}
                    className="w-3/4 h-3/4 self-center"
                    onClick={() => setPokemonsIsShiny(!pokemonIsShiny)}
                  />
                </motion.div>

                <div className="flex flex-col gap-1 mt-2"></div>

                <div className="flex flex-col gap-3 items-start content-start">
                  <p>Se puede encontrar shiny de estas formas:</p>
                  <Checkbox
                    value="wild"
                    isDisabled
                    isSelected={pokemon.wild}
                    color="secondary"
                  >
                    Salvaje
                  </Checkbox>
                  <Checkbox
                    value="raid"
                    isDisabled
                    isSelected={pokemon.raid}
                    color="secondary"
                  >
                    Incursiones
                  </Checkbox>
                  <Checkbox
                    value="research"
                    isDisabled
                    isSelected={pokemon.research}
                    color="secondary"
                  >
                    Investigaciones
                  </Checkbox>
                  <Checkbox
                    value="egg"
                    isDisabled
                    isSelected={pokemon.egg}
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
