import Link from "next/link";
import { getAllRandom } from "@/lib/mdx";

export default async function RandomPage() {
  const randomItems = await getAllRandom();

  return (
    <div className="w-screen min-h-[100dvh]">
      <div className="flex flex-col gap-8 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto p-5 py-20">
        <div className="space-y-4">
          <h1 className="text-label-1">Random</h1>
          <p className="text-body-1 text-secondary">
            A collection of random thoughts, ideas, and miscellaneous content.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {randomItems.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-secondary rounded-lg border border-tertiary hover:border-primary transition-colors"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-label-2 font-medium">{item.title}</h3>
                  <p className="text-body-2 text-secondary mt-2">
                    {item.description}
                  </p>
                  <p className="text-sm text-secondary mt-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-xs">
                    {item.category}
                  </span>
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-background text-secondary rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/random/${item.id}`}
                    className="px-4 py-2 bg-primary text-background rounded hover:bg-primary/90 transition-colors text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
