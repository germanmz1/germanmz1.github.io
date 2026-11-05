import { Project } from '@/types/project';
import projectsData from './projects.json';

// Casteamos el JSON importado al tipo Project[]
export const projects: Project[] = projectsData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
