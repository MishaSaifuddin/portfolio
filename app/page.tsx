import { getSortedProjectsData } from "@/lib/projects";
import { SearchFilter } from "@/components/SearchFilter";

export const dynamic = "force-static";

export default function Home() {
  const projects = getSortedProjectsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-2">
          A collection of my work and personal projects.
        </p>
      </div>
      <SearchFilter projects={projects} />
    </div>
  );
}
