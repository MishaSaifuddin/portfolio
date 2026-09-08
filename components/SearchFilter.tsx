"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
}

interface SearchFilterProps {
  projects: Project[];
}

export function SearchFilter({ projects }: SearchFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.some((tech) => project.techStack.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [projects, search, selectedTech]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border bg-background px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {allTech.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTech(tech)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedTech.includes(tech)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No projects found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
