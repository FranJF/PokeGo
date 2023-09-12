import { expect, test, describe } from "bun:test";
import { PokemonController } from "./pokemon";

describe("", () => {
  test("should return images", async () => {});
});

const checkImage = (image: any) => {
  expect(image).toBeDefined();
  expect(image).hasOwnProperty("front_default");
  expect(image).hasOwnProperty("front_shiny");
  expect(image).hasOwnProperty("image");
  expect(image).hasOwnProperty("name");
};
