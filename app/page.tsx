import { getAll } from "@/services/pokemon/get-all";
import { title, subtitle } from "@/components/primitives";
import { PokemonSearch } from "@/components/pokemon-search";

export default function Home() {
    const data: any = getAll();
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 flex-grow-0">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Poke&nbsp;</h1>
                <h1 className={title({ color: "violet" })}>Go&nbsp;</h1>
                <br />
                <h2 className={subtitle({ class: "mt-5" })}>
                    Looking for a Pokemon? Search it!
                </h2>
            </div>
            <div className="inline-block max-w-lg text-center justify-center">
                <PokemonSearch data={data} />
            </div>
        </section>
    );
}
