import { expect, test, describe } from "bun:test";
import { getEvolution } from "./get-evolution";

describe("Get evolution chain service should always return all the evolutions", () => {
  test("should return evolution chain", async () => {
    const { chain: charizard_chain, index: idx_charizard } =
      await getEvolution("charizard");
    const { chain: squirtle_chain, index: idx_squirtle } =
      await getEvolution("squirtle");

    expect(charizard_chain).toBeDefined();
    expect(idx_charizard).toBe(2);
    expect(charizard_chain[0]).toBe("charmander");
    expect(charizard_chain[1]).toBe("charmeleon");
    expect(charizard_chain[2]).toBe("charizard");

    expect(squirtle_chain).toBeDefined();
    expect(idx_squirtle).toBe(0);
    expect(squirtle_chain[0]).toBe("squirtle");
    expect(squirtle_chain[1]).toBe("wartortle");
    expect(squirtle_chain[2]).toBe("blastoise");
  });

  test("should return empty", async () => {
    const { chain: mewtwo_chain, index: idx_mewtwo } =
      await getEvolution("mewtwo");
    const { chain: groudon_chain, index: idx_groudon } =
      await getEvolution("groudon");

    expect(mewtwo_chain).toBeDefined();
    expect(idx_mewtwo).toBe(-1);
    expect(mewtwo_chain).toStrictEqual([]);

    expect(groudon_chain).toBeDefined();
    expect(idx_groudon).toBe(-1);
    expect(groudon_chain).toStrictEqual([]);
  });

  test("should return not found", async () => {
    const dontcare = await getEvolution("dontcare");
    expect(dontcare).toStrictEqual({ error: "Pokemon not found" });
  });
});
