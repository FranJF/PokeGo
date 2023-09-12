import { expect, test, describe } from "bun:test";
import { getImage } from "./get-image";

describe("Get images service", () => {
  test("should return images", async () => {
    const charizard_chain = await getImage("charizard");
    const squirtle_chain = await getImage("squirtle");
    const mewtwo_chain = await getImage("mewtwo");
    const groudon_chain = await getImage("groudon");

    checkImage(charizard_chain);
    checkImage(squirtle_chain);
    checkImage(mewtwo_chain);
    checkImage(groudon_chain);
  });

  test("should return image not found", async () => {
    const dontcare = await getImage("dontcare");
    expect(dontcare).toStrictEqual({ error: "Pokemon image not found" });
  });
});

const checkImage = (image: any) => {
  expect(image).toBeDefined();
  expect(image).hasOwnProperty("front_default");
  expect(image).hasOwnProperty("front_shiny");
  expect(image).hasOwnProperty("image");
  expect(image).hasOwnProperty("name");
};
