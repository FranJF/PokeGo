import { AutoCompleteInput } from "@/components/autocomplete-input";
import { title } from "@/components/primitives";
import { getAll } from "@/services/pokemon/get-all";

export default async function ShinyPage() {
  const data: any = getAll();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>¿Es shiny?</h1>
      </div>

      <AutoCompleteInput data={data} />
    </section>
  );
}
