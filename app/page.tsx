import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <Hero />
      
      <section id="proyectos" className="py-20 scroll-mt-20 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
