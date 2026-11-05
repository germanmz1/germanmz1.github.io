"use client";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {/* Placeholder en caso de que la imagen no exista o falle */}
        <span className="text-gray-400 text-sm z-0">Sin imagen</span>
        
        <Image 
          src={project.imagen} 
          alt={`Imagen de ${project.titulo}`}
          fill
          className="object-cover z-10 group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        
        <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-black/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {project.categoria}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.titulo}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {project.descripcion}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tecnologias.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {project.tecnologias.length > 3 && (
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-500">
              +{project.tecnologias.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <Link 
            href={`/proyectos/${project.slug}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Ver detalle <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex gap-3 text-gray-500 dark:text-gray-400">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Ver código fuente">
                <Code2 className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Visitar demo">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
