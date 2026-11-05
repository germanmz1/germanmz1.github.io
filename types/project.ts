export type Category = 'Desarrollo de Software' | 'Data' | 'Ciencias Económicas';
export type SubCategory = 'Data Science' | 'Data Analysis';

export interface Project {
  id: string;
  slug: string; // URL amigable, ej: "mi-proyecto"
  titulo: string;
  categoria: Category;
  subcategoria?: SubCategory; // Opcional, principalmente para Data
  
  descripcion: string; // Resumen corto para las tarjetas (cards)
  tecnologias: string[];
  repoUrl: string; // Obligatorio según requerimientos
  demoUrl?: string; // Opcional
  imagen: string; // Ruta a la imagen en public/ (ej: "/images/proyecto1.jpg")
  
  // Campos específicos según categoría (Desarrollo)
  objetivo?: string;
  metodologia?: string;
  
  // Campos específicos según categoría (Data/Economía)
  problematica?: string;
  conclusiones?: string;
}
