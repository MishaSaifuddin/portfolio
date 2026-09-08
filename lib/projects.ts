import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "projects");

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
  date?: string;
  contentHtml: string;
}

export function getSortedProjectsData(): Omit<ProjectData, "contentHtml">[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        techStack: data.techStack || [],
        github: data.github || undefined,
        demo: data.demo || undefined,
        date: data.date || undefined,
      };
    });

  return allProjectsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

export async function getProjectData(slug: string): Promise<ProjectData> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    techStack: data.techStack || [],
    github: data.github || undefined,
    demo: data.demo || undefined,
    date: data.date || undefined,
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  return fs
    .readdirSync(projectsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
