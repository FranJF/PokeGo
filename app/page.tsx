import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { PokemonSearch } from "@/components/pokemon-search";
import { getAll } from "@/services/pokemon/get-all";

export default function Home() {
  const data: any = getAll();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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

      <div className="flex gap-3">
        <Link
          isExternal
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
