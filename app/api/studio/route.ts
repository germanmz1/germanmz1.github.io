import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const filePath = path.join(process.cwd(), 'lib', 'projects.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(fileContent);
    
    // Generar un ID único
    data.id = Date.now().toString();
    
    // Crear slug a partir del título
    if (!data.slug) {
      data.slug = data.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Convertir string de tecnologías en array
    if (typeof data.tecnologias === 'string') {
      data.tecnologias = data.tecnologias.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    
    projects.push(data);
    
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, project: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
