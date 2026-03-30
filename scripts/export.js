// Renders EJS templates to static HTML and copies public assets → dist/
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'dist');
const VIEWS = path.join(__dirname, '..', 'views');
const PUBLIC = path.join(__dirname, '..', 'public');
const BASE = process.env.BASE_PATH || '';

// Mirror of collections in src/server.ts
const collections = [
  { slug: 'street',    title: 'Street',       cover: 'cover.jpg', photos: [] },
  { slug: 'portraits', title: 'Portraits',     cover: 'cover.jpg', photos: [] },
  { slug: 'travel',    title: 'Travel',        cover: 'cover.jpg', photos: [] },
  { slug: 'tbd',       title: 'Coming Soon',   cover: 'cover.jpg', photos: [] },
];

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// Rewrite absolute asset paths to include the base path prefix
function rebase(html) {
  if (!BASE) return html;
  return html
    .replace(/href="\//g, `href="${BASE}/`)
    .replace(/src="\//g, `src="${BASE}/`);
}

async function render(template, data, outPath) {
  const raw = await ejs.renderFile(path.join(VIEWS, template), data, { views: [VIEWS] });
  const html = rebase(raw);
  mkdirp(path.dirname(outPath));
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  wrote', path.relative(process.cwd(), outPath));
}

function copyDir(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

async function main() {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
  mkdirp(OUT);

  console.log('Rendering pages...');
  const base = { basePath: BASE };
  await render('index.ejs',       { ...base },                                          path.join(OUT, 'index.html'));
  await render('about.ejs',       { ...base, page: 'about' },                          path.join(OUT, 'about', 'index.html'));
  await render('photography.ejs', { ...base, page: 'photography', collections },       path.join(OUT, 'photography', 'index.html'));

  for (const col of collections) {
    await render('collection.ejs', { ...base, page: 'photography', collection: col },
      path.join(OUT, 'photography', col.slug, 'index.html'));
  }

  console.log('Copying public assets...');
  copyDir(PUBLIC, OUT);

  // Required for GitHub Pages to serve files that start with _
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

  console.log(`\nExport complete → dist/  (BASE_PATH="${BASE}")`);
}

main().catch(err => { console.error(err); process.exit(1); });
