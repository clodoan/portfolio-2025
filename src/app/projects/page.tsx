import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="w-screen min-h-[100dvh]">
      <div className="flex flex-col gap-8 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto p-5 py-20">
        <div className="space-y-4">
          <h1 className="text-label-1">Projects</h1>
          <p className="text-body-1 text-secondary">
            A collection of my work across different platforms and technologies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-secondary rounded-lg border border-tertiary hover:border-primary transition-colors"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-label-2 font-medium">{project.title}</h3>
                  <p className="text-body-2 text-secondary mt-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-xs">
                    {project.category}
                  </span>
                  {project.tags?.map((tag) => (
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
                    href={`/projects/${project.id}`}
                    className="px-4 py-2 bg-primary text-background rounded hover:bg-primary/90 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  {project.external && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-background transition-colors text-sm"
                    >
                      External Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
