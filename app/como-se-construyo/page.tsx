import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo se construyó | Germán MZ",
  description: "Una mirada detrás de escena sobre la creación de este portfolio.",
};

export default function HowItWasBuiltPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Cómo se construyó este sitio</h1>
      
      <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-12 leading-relaxed">
          Este portfolio fue diseñado pensando no solo en mostrar mis proyectos, sino en demostrar <strong>cómo pienso y cómo organizo mi trabajo</strong>. Aquí explico brevemente las decisiones detrás de esta plataforma, sin entrar en jerga técnica compleja.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-200 dark:border-gray-800">1. ¿Qué quise comunicar?</h2>
          <p className="mb-4">
            El objetivo principal era crear un espacio que reflejara mi perfil profesional: <strong>estructurado, analítico, pero fuertemente orientado al desarrollo de software y a los resultados comerciales</strong>. 
          </p>
          <p>
            Al venir del mundo bancario y estudiar ciencias económicas, tengo una base matemática y de negocios muy fuerte. Sin embargo, mi pasión y producto principal es la programación. Quería que el sitio dejara claro que soy un desarrollador web que entiende profundamente el idioma de los negocios y los objetivos de rentabilidad.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-200 dark:border-gray-800">2. ¿Por qué se organizó así?</h2>
          <p className="mb-4">
            Decidí separar los proyectos en categorías muy marcadas (Desarrollo de Software, Data, y Ciencias Económicas) porque cada disciplina requiere una forma distinta de presentar sus resultados:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4 mb-4">
            <li><strong>En Desarrollo:</strong> Lo más importante es la arquitectura, las tecnologías elegidas y cómo el código resuelve un problema real.</li>
            <li><strong>En Data y Economía:</strong> Lo clave es la problemática inicial, la evidencia utilizada y las conclusiones a las que se llegó.</li>
          </ul>
          <p>
            Por eso, la plantilla de cada proyecto se adapta de forma inteligente dependiendo de qué tipo de proyecto estés mirando, mostrando solo la información relevante.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-200 dark:border-gray-800">3. Diseño y Experiencia de Usuario</h2>
          <p className="mb-4">
            Opté por un diseño limpio y minimalista, dándole mucha importancia al contraste, la lectura cómoda y la accesibilidad. El sitio cuenta con soporte nativo para <strong>modo claro/oscuro</strong> y <strong>múltiples idiomas</strong>. 
          </p>
          <p>
            Técnicamente, el sitio es 100% estático. Esto significa que cuando hacés clic en un enlace, la página no tiene que "pensar" ni ir a buscar información a una base de datos lejana en ese momento; todo ya fue pre-calculado, lo que resulta en una navegación instantánea y sin tiempos de carga perceptibles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-200 dark:border-gray-800">4. Para perfiles técnicos</h2>
          <p>
            Si sos desarrollador, reclutador IT o líder técnico y te interesa ver el código puro, la arquitectura de componentes, o cómo construí un panel de administración privado (Studio) que utilizo localmente para cargar estos proyectos, te invito a leer el documento técnico (<code>README.md</code>) en el repositorio público de mi GitHub.
          </p>
        </section>
      </div>
    </div>
  );
}
