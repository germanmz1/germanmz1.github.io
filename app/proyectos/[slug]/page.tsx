import { getProjectBySlug, getProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Code2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Esta función es VITAL para exportar estáticamente (output: 'export') 
// Le dice a Next.js qué páginas dinámicas generar en el build
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound(); // Muestra la página 404 por defecto
  }

  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <Link href="/#proyectos" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 mb-10 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver a proyectos
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold tracking-wide px-3 py-1 rounded-full uppercase">
            {project.categoria}
          </span>
          {project.subcategoria && (
            <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-bold tracking-wide px-3 py-1 rounded-full uppercase">
              {project.subcategoria}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">{project.titulo}</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{project.descripcion}</p>
        
        <div className="flex flex-wrap gap-4">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all shadow-sm">
              <Code2 className="w-5 h-5" /> Repositorio GitHub
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ExternalLink className="w-5 h-5" /> Visitar Demo
            </a>
          )}
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-16 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Sin imagen de portada</span>
        <Image 
          src={project.imagen} 
          alt={project.titulo} 
          fill 
          className="object-cover z-10" 
          unoptimized 
        />
      </div>

      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
        <h2>Stack Tecnológico</h2>
        <div className="flex flex-wrap gap-3 not-prose mb-12">
          {project.tecnologias.map((tech) => (
            <span key={tech} className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>

        {/* Sección Específica: Desarrollo */}
        {(project.objetivo || project.metodologia) && (
          <div className="space-y-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            {project.objetivo && (
              <div>
                <h2>Objetivo del Proyecto</h2>
                <p>{project.objetivo}</p>
              </div>
            )}
            {project.metodologia && (
              <div>
                <h2>Metodología y Decisiones de Diseño</h2>
                <p>{project.metodologia}</p>
              </div>
            )}
          </div>
        )}

        {/* Sección Específica: Data/Economía */}
        {(project.problematica || project.conclusiones) && (
          <div className="space-y-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            {project.problematica && (
              <div>
                <h2>Problemática abordada</h2>
                <p>{project.problematica}</p>
              </div>
            )}
            {project.conclusiones && (
              <div>
                <h2>Conclusiones</h2>
                <p>{project.conclusiones}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
