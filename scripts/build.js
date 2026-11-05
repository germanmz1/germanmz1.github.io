const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const studioPath = path.join(__dirname, '../app/studio');
const apiPath = path.join(__dirname, '../app/api');
const backupStudioPath = path.join(__dirname, '../.backup_studio');
const backupApiPath = path.join(__dirname, '../.backup_api');

try {
  console.log('📦 Ocultando rutas locales (/studio, /api) antes del build...');
  if (fs.existsSync(studioPath)) fs.renameSync(studioPath, backupStudioPath);
  if (fs.existsSync(apiPath)) fs.renameSync(apiPath, backupApiPath);
  
  console.log('🚀 Ejecutando next build...');
  execSync('npx next build', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ El build falló:', err);
  process.exit(1);
} finally {
  console.log('♻️ Restaurando rutas locales...');
  if (fs.existsSync(backupStudioPath)) fs.renameSync(backupStudioPath, studioPath);
  if (fs.existsSync(backupApiPath)) fs.renameSync(backupApiPath, apiPath);
  console.log('✅ Listo!');
}
