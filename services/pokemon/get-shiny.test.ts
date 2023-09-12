import { expect, test, describe } from "bun:test";
import { getShiny } from "./get-shiny";

describe("Get shiny service", () => {
  test("should return shiny info", async () => {
    const charizard_shiny = await getShiny("charizard");
    const squirtle_shiny = await getShiny("squirtle");
    const mewtwo_shiny = await getShiny("mewtwo");
    const groudon_shiny = await getShiny("groudon");

    checkShiny(charizard_shiny);
    checkShiny(squirtle_shiny);
    checkShiny(mewtwo_shiny);
    checkShiny(groudon_shiny);
  });

  test("should return shiny not found", async () => {
    const dontcare = await getShiny("dontcare");
    expect(dontcare).toStrictEqual({ error: "Pokemon shiny not found" });
  });
});

const checkShiny = (shiny: any) => {
  expect(shiny).toBeDefined();
  expect(shiny).hasOwnProperty("id");
  expect(shiny).hasOwnProperty("name");
  expect(shiny).hasOwnProperty("wild");
  expect(shiny).hasOwnProperty("raid");
  expect(shiny).hasOwnProperty("egg");
  expect(shiny).hasOwnProperty("research");
  expect(shiny).hasOwnProperty("evolution");
  expect(shiny).hasOwnProperty("photobomb");
};
