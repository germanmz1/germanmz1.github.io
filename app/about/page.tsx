import { Metadata } from "next";
import { Code, Briefcase, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Mí | Germán",
  description: "Conoce más sobre Germán MZ, Desarrollador Fullstack.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Sobre Mí</h1>

      <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-12 leading-relaxed">
          Soy un Desarrollador Fullstack en formación, enfocado en construir aplicaciones web robustas, rápidas y escalables con tecnologías modernas.
        </p>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <Code className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Stack Objetivo</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Especializado en Next.js, TypeScript y Tailwind CSS para el frontend, sumado a Prisma y PostgreSQL para la persistencia de datos.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <Briefcase className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Visión de Negocio</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              9 años de experiencia en banca comercial (Representante de Servicios al Cliente), enfocando mi gestión en la rentabilidad de cartera de productos.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <GraduationCap className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Formación Analítica</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Estudiante de la carrera de Actuaría en la Universidad de Buenos Aires (UBA), desarrollando un fuerte perfil cuantitativo.
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-16 text-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">El Desarrollo como Eje Central</h2>
          <p>
            Mi oferta principal y mi foco absoluto es el <strong>desarrollo de software</strong>. Disfruto creando soluciones técnicas limpias, eficientes y mantenibles.
          </p>
          <p>
            Al mismo tiempo, mi formación en ciencias económicas (Actuaría) y mi extensa trayectoria en el sector bancario funcionan como un <em>diferenciador de contexto</em>.Entiendo el entorno del negocio, los objetivos de rentabilidad y cómo la tecnología impacta en los resultados financieros.
          </p>
          <p>
            Esta combinación me permite tomar decisiones arquitectónicas que no solo resuelven problemas técnicos, sino que se alinean directamente con las necesidades estratégicas de la empresa o cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
