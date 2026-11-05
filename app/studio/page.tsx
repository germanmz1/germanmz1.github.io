"use client";
import { useState } from "react";

export default function StudioPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Limpiar campos vacíos
    Object.keys(data).forEach(key => {
      if (data[key] === "") delete data[key];
    });
    
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Error al guardar");
      
      setStatus("success");
      e.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Studio Local</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Esta ruta solo existe en tu máquina local. Los proyectos se guardan en `lib/projects.json`.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div>
          <label className="block text-sm font-bold mb-2">Título del Proyecto *</label>
          <input name="titulo" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Categoría *</label>
            <select name="categoria" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <option value="Desarrollo de Software">Desarrollo de Software</option>
              <option value="Data">Data</option>
              <option value="Ciencias Económicas">Ciencias Económicas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Subcategoría</label>
            <select name="subcategoria" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <option value="">Ninguna</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analysis">Data Analysis</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Descripción corta *</label>
          <textarea name="descripcion" required rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Tecnologías (separadas por coma) *</label>
          <input name="tecnologias" required placeholder="Next.js, TypeScript, Tailwind" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">URL del Repo GitHub *</label>
            <input name="repoUrl" required type="url" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">URL de Demo (Opcional)</label>
            <input name="demoUrl" type="url" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Ruta de Imagen *</label>
          <input name="imagen" required defaultValue="/placeholder.jpg" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <hr className="border-gray-300 dark:border-gray-700 my-6" />
        
        <div>
          <label className="block text-sm font-bold mb-2 text-blue-600 dark:text-blue-400">Objetivo (Desarrollo)</label>
          <textarea name="objetivo" rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2 text-blue-600 dark:text-blue-400">Metodología / Decisiones (Desarrollo)</label>
          <textarea name="metodologia" rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <hr className="border-gray-300 dark:border-gray-700 my-6" />
        
        <div>
          <label className="block text-sm font-bold mb-2 text-purple-600 dark:text-purple-400">Problemática (Data/Eco)</label>
          <textarea name="problematica" rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-purple-600 dark:text-purple-400">Conclusiones (Data/Eco)</label>
          <textarea name="conclusiones" rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl transition-transform hover:scale-[1.02] disabled:opacity-50 mt-8"
        >
          {status === "loading" ? "Guardando..." : "Guardar Proyecto"}
        </button>
        
        {status === "success" && <p className="text-green-600 text-center font-bold text-lg mt-4">¡Proyecto guardado en projects.json!</p>}
        {status === "error" && <p className="text-red-600 text-center font-bold text-lg mt-4">Error. Revisá la consola.</p>}
      </form>
    </div>
  );
}
