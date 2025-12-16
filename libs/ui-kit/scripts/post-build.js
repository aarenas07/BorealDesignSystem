// libs/ui-kit/scripts/post-build.js
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../../../dist/libs/ui-kit');
const packageJsonPath = path.join(distPath, 'package.json');

console.log('📦 Actualizando package.json...');

// Leer el package.json generado
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// ========== CAMPOS PRINCIPALES (OBLIGATORIOS) ==========
// Estos son los que faltan y causan el error
packageJson.main = './fesm2022/ui-kit.mjs';
packageJson.module = './fesm2022/ui-kit.mjs';
packageJson.es2022 = './esm2022/ui-kit.mjs';
packageJson.esm2022 = './esm2022/ui-kit.mjs';
packageJson.fesm2022 = './fesm2022/ui-kit.mjs';
packageJson.typings = './index.d.ts';
packageJson.types = './index.d.ts';

// ========== EXPORTS ==========
packageJson.exports = {
  '.': {
    types: './index.d.ts',
    esm2022: './esm2022/ui-kit.mjs',
    esm: './esm2022/ui-kit.mjs',
    default: './fesm2022/ui-kit.mjs',
  },
  './package.json': {
    default: './package.json',
  },
  // ========== ESTILOS ==========
  './styles': {
    sass: './styles/index.scss',
    default: './styles/index.scss',
  },
  // ========== PALETAS ==========
  './styles/palettes': {
    sass: './styles/_palettes.scss',
    default: './styles/_palettes.scss',
  },
  // ========== VARIABLES ==========
  './styles/variables': {
    sass: './styles/_variables.scss',
    default: './styles/_variables.scss',
  },
  // ========== TEMA MATERIAL DESIGN 3 ==========
  './styles/theme': {
    sass: './styles/_theme.scss',
    default: './styles/_theme.scss',
  },
  // ========== TEMA SICOFERP PERSONALIZADO ==========
  './styles/sicoferp-theme': {
    sass: './styles/sicoferp-theme/theme.scss',
    default: './styles/sicoferp-theme/theme.scss',
  },
  // ========== TOKENS DEL SISTEMA ==========
  './styles/tokens/palettes': {
    sass: './styles/tokens/_palettes.scss',
    default: './styles/tokens/_palettes.scss',
  },
  './styles/tokens/spacing': {
    sass: './styles/tokens/_spacing.scss',
    default: './styles/tokens/_spacing.scss',
  },
  './styles/tokens/typography': {
    sass: './styles/tokens/_typography.scss',
    default: './styles/tokens/_typography.scss',
  },
  './styles/tokens/variables': {
    sass: './styles/tokens/_variables.scss',
    default: './styles/tokens/_variables.scss',
  },
  // ========== ESTILOS GLOBALES ==========
  './styles/global': {
    sass: './styles/styles.scss',
    default: './styles/styles.scss',
  },
};

// ========== SIDE EFFECTS ==========
packageJson.sideEffects = ['*.css', '*.scss'];

// Guardar el package.json actualizado
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ package.json actualizado correctamente');
console.log('');
console.log('📋 Configuración principal:');
console.log('   main:', packageJson.main);
console.log('   module:', packageJson.module);
console.log('   types:', packageJson.types);
console.log('');
console.log('📦 Exports disponibles:');
console.log('   - @ada-lib/ui-kit (componentes)');
console.log('   - @ada-lib/ui-kit/styles (todos los estilos)');
console.log('   - @ada-lib/ui-kit/styles/palettes');
console.log('   - @ada-lib/ui-kit/styles/variables');
console.log('   - @ada-lib/ui-kit/styles/theme (Material Design 3)');
console.log('   - @ada-lib/ui-kit/styles/sicoferp-theme');
console.log('   - @ada-lib/ui-kit/styles/tokens/palettes');
console.log('   - @ada-lib/ui-kit/styles/tokens/spacing');
console.log('   - @ada-lib/ui-kit/styles/tokens/typography');
console.log('   - @ada-lib/ui-kit/styles/tokens/variables');
console.log('   - @ada-lib/ui-kit/styles/global');
