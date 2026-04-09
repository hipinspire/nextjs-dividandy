import { SectionsRenderer } from "@/components/sections/SectionsRenderer";
import { getPageBySlug } from "@/lib/strapi";

export default async function Home() {
  const page = await getPageBySlug("home");

  return (
    <main>
      {page?.sections?.length ? (
        <SectionsRenderer sections={page.sections} />
      ) : null}
    </main>
  );
}