import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  id: string;
  title: string;
  description: string;
  link: string;
  image?: string;
  category: "figma-plugin" | "desktop-web" | "mobile-web" | "mobile-app";
  featured?: boolean;
  tags?: string[];
  external?: boolean;
}

export interface WritingFrontmatter {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
}

export interface RandomFrontmatter {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
}

export interface PortfolioFrontmatter {
  title: string;
  subtitle: string;
}

const contentDirectory = path.join(process.cwd(), "src/content");
const projectsDirectory = path.join(contentDirectory, "projects");
const writingsDirectory = path.join(contentDirectory, "writings");
const randomDirectory = path.join(contentDirectory, "random");

export async function getPortfolioContent() {
  const fullPath = path.join(contentDirectory, "portfolio.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as PortfolioFrontmatter,
    content,
  };
}

export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data as ProjectFrontmatter;
    });

  return projects;
}

export async function getProjectById(
  id: string
): Promise<ProjectFrontmatter | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id);
}

export async function getProjectContentById(
  id: string
): Promise<{ frontmatter: ProjectFrontmatter; content: string } | undefined> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  } catch {
    return undefined;
  }
}

export async function getProjectsByCategory(
  category: ProjectFrontmatter["category"]
): Promise<ProjectFrontmatter[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.category === category);
}

export async function getFeaturedProjects(): Promise<ProjectFrontmatter[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectsByTag(
  tag: string
): Promise<ProjectFrontmatter[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.tags?.includes(tag));
}

export async function getProjectCategories(): Promise<
  ProjectFrontmatter["category"][]
> {
  const projects = await getAllProjects();
  const categories = projects.map((project) => project.category);
  return [...new Set(categories)];
}

export async function getAllTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const allTags = projects.flatMap((project) => project.tags || []);
  return [...new Set(allTags)];
}

export async function getAllWritings(): Promise<WritingFrontmatter[]> {
  const fileNames = fs.readdirSync(writingsDirectory);
  const writings = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(writingsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data as WritingFrontmatter;
    });

  return writings.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getWritingById(
  id: string
): Promise<WritingFrontmatter | undefined> {
  const writings = await getAllWritings();
  return writings.find((writing) => writing.id === id);
}

export async function getAllRandom(): Promise<RandomFrontmatter[]> {
  const fileNames = fs.readdirSync(randomDirectory);
  const randomItems = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(randomDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data as RandomFrontmatter;
    });

  return randomItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getRandomById(
  id: string
): Promise<RandomFrontmatter | undefined> {
  const randomItems = await getAllRandom();
  return randomItems.find((item) => item.id === id);
}
