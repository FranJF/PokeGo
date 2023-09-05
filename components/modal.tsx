"use client"

import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { PokemonShiny } from "@/models/database/pokemon";
import { Checkbox } from "@nextui-org/checkbox";
import { Switch } from "@nextui-org/switch";
import { StartIcon } from "./icons";
import Image from "next/image";




export default function PokemonModal({ selection }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [pokemon, setPokemon] = React.useState({} as PokemonShiny);
    const [pokemonImage, setPokemonImage] = React.useState({} as any);
    const [pokemonIsShiny, setPokemonsIsShiny] = React.useState(false);

    useEffect(() => {
        const r: any = fetch(`/api/shiny/${selection}`).then((data: any) => data.json());
        r.then((data: any) => {
            setPokemon(data)

            const rImage = fetch(`/api/image/${selection}`).then((data: any) => data.json());
            rImage.then((data: any) => {
                setPokemonImage(data)
                onOpen();
            })
        })

    }, [selection]);

    const handleOnSwitch = () => {
        setPokemonsIsShiny(!pokemonIsShiny);
    }

    const imagen = pokemonIsShiny ? pokemonImage.front_shiny : pokemonImage.front_default;

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Informacion shiny: {selection}</ModalHeader>
                            <ModalBody>

                                <Image
                                    src={imagen}
                                    width={500}
                                    height={500}
                                    alt={pokemon.name}
                                />

                                <Switch
                                    defaultSelected={pokemonIsShiny}
                                    size="lg"
                                    color="secondary"
                                    startContent={<StartIcon />}
                                    endContent={<StartIcon />}
                                    onChange={handleOnSwitch}
                                >
                                    Ver shiny
                                </Switch>

                                <Checkbox value="found_wild" isDisabled isSelected={pokemon.found_wild} color="secondary">Salvaje</Checkbox>
                                <Checkbox value="found_raid" isDisabled isSelected={pokemon.found_raid} color="secondary">Incursiones</Checkbox>
                                <Checkbox value="found_research" isDisabled isSelected={pokemon.found_research} color="secondary">Investigaciones</Checkbox>
                                <Checkbox value="found_egg" isDisabled isSelected={pokemon.found_egg} color="secondary" >Huevos</Checkbox>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}

