#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const GITHUB_USERNAME = "MishaSaifuddin";
const PROJECTS_DIR = path.join(process.cwd(), "projects");

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

async function fetchGitHubRepos() {
  return fetchJSON(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );
}

async function fetchLanguages(repoFullName) {
  try {
    return await fetchJSON(
      `https://api.github.com/repos/${repoFullName}/languages`
    );
  } catch {
    return {};
  }
}

async function fetchReadme(repoFullName, defaultBranch) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch || "main"}/README.md`
    );
    if (!response.ok) return "";
    return await response.text();
  } catch {
    return "";
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/^[^a-z0-9]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(name) {
  return name
    .replace(/^-+|-+$/g, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => {
      const lower = w.toLowerCase();
      if (["and", "or", "the", "a", "an", "with", "for"].includes(lower)) return lower;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function cleanDescription(description) {
  if (!description) return "A project hosted on GitHub. Visit the repository for full details.";
  return description.replace(/"/g, '\\"').trim();
}

function stripReadmeHeaders(readme) {
  const lines = readme.split("\n");
  // Skip leading title/description lines (markdown headings at top)
  while (lines.length && (lines[0].trim() === "" || lines[0].trim().startsWith("#"))) {
    lines.shift();
  }
  return lines.join("\n").trim();
}

function generateMarkdown(repo, languages, readme) {
  const title = titleCase(repo.name);
  const description = cleanDescription(repo.description);
  const techStack = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
  const date = repo.created_at ? repo.created_at.split("T")[0] : undefined;
  const githubUrl = repo.html_url;
  const homepage = repo.homepage || undefined;

  const readmeBody = readme ? stripReadmeHeaders(readme) : "";

  const frontmatter = `---
title: "${title}"
description: "${description}"
techStack:
${techStack.map((t) => `  - "${t}"`).join("\n")}
github: "${githubUrl}"
${homepage ? `demo: "${homepage}"\n` : ""}${date ? `date: "${date}"\n` : ""}---`;

  const stats = `## Overview

${description}

## Repository

View the source code: [${repo.full_name}](${githubUrl})

- **Language**: ${repo.language || "N/A"}
- **Stars**: ${repo.stargazers_count}
- **Forks**: ${repo.forks_count}
- **Updated**: ${repo.updated_at ? repo.updated_at.split("T")[0] : "N/A"}
${repo.topics && repo.topics.length ? `- **Topics**: ${repo.topics.join(", ")}` : ""}`;

  return `${frontmatter}\n\n${stats}${readmeBody ? `\n\n---\n\n${readmeBody}` : ""}`;
}

async function main() {
  console.log(`Fetching GitHub repos for @${GITHUB_USERNAME}...`);

  const repos = await fetchGitHubRepos();
  const nonForks = repos.filter((r) => !r.fork);
  console.log(`Found ${repos.length} repositories (${nonForks.length} non-fork)`);

  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    console.log(`Created directory: ${PROJECTS_DIR}`);
  }

  const existingFiles = fs.readdirSync(PROJECTS_DIR);
  const generatedSlugs = new Set();

  for (const repo of nonForks) {
    const slug = slugify(repo.name);
    const filePath = path.join(PROJECTS_DIR, `${slug}.md`);

    process.stdout.write(`  Fetching details for ${repo.name}... `);
    const [languages, readme] = await Promise.all([
      fetchLanguages(repo.full_name),
      fetchReadme(repo.full_name, repo.default_branch),
    ]);

    const markdown = generateMarkdown(repo, languages, readme);
    fs.writeFileSync(filePath, markdown, "utf8");
    generatedSlugs.add(`${slug}.md`);
    console.log(`✓ (${Object.keys(languages).length} langs, ${readme.length ? "README" : "no README"})`);
  }

  const removed = existingFiles.filter((f) => !generatedSlugs.has(f));
  for (const file of removed) {
    const filePath = path.join(PROJECTS_DIR, file);
    fs.unlinkSync(filePath);
    console.log(`  Removed (no longer on GitHub): ${file}`);
  }

  console.log(`Synced ${nonForks.length} projects successfully!`);
}

main().catch((error) => {
  console.error("Sync failed:", error.message);
  process.exit(1);
});
