import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const source = JSON.parse(await readFile(new URL('../source.json', import.meta.url), 'utf8'));
const { foundation, design } = source;
await mkdir('dist', { recursive: true });
const declarations = Object.entries(foundation.tokens).map(([key, value]) => `  --krigsvold-${key}: ${value};`).join('\n');
await writeFile('dist/foundation.css', `/* Origin: krigsvold.org. Variables only; no element styles or font downloads. */\n:root, [data-krigsvold] {\n${declarations}\n}\n@media (prefers-reduced-motion: reduce) {\n  :root, [data-krigsvold] { --krigsvold-transition-ui: 0s; --krigsvold-motion-duration: 0s; }\n}\n`);
const typography = `/* Optional typography, independent of font loading. */
:where(.krigsvold) { font-family: var(--krigsvold-font-sans); font-size: var(--krigsvold-text-body); line-height: var(--krigsvold-leading-body); }
:where(.krigsvold) :where(h1,h2,h3,h4,h5,h6) { overflow-wrap: anywhere; }
:where(.krigsvold) :where(h1,h2,h3) { font-family: var(--krigsvold-font-serif); font-weight: var(--krigsvold-weight-heading); letter-spacing: var(--krigsvold-tracking-heading); line-height: var(--krigsvold-leading-heading); text-wrap: balance; }
:where(.krigsvold) :where(h4,h5,h6) { font-family: var(--krigsvold-font-sans); font-weight: 700; line-height: var(--krigsvold-leading-heading); }
:where(.krigsvold) h1 { font-size: var(--krigsvold-text-h1); }
:where(.krigsvold) h2 { font-size: var(--krigsvold-text-h2); }
:where(.krigsvold) h3 { font-size: var(--krigsvold-text-h3); }
:where(.krigsvold) :where(nav,button,input,select,textarea,table,.krigsvold-ui) { font-family: var(--krigsvold-font-sans); }
:where(.krigsvold) :where(code,pre,kbd,samp), :where(.krigsvold-code) { font-family: var(--krigsvold-font-mono); }
`;
await writeFile('dist/typography.css', typography);
const fontImports = [
  ...[400,500,700].flatMap(w => [`@fontsource/roboto/${w}.css`, `@fontsource/roboto/${w}-italic.css`]),
  ...[400,700].map(w => `@fontsource/roboto-slab/${w}.css`),
  ...[400,500,700].flatMap(w => [`@fontsource/roboto-mono/${w}.css`, `@fontsource/roboto-mono/${w}-italic.css`]),
];
await writeFile('dist/fonts.css', fontImports.map(path => `@import '${path}';`).join('\n')+'\n');
const require = createRequire(import.meta.url);
await mkdir('dist/licenses', { recursive: true });
for (const family of ['roboto','roboto-slab','roboto-mono']) {
  const pkg = require.resolve(`@fontsource/${family}/package.json`);
  await writeFile(`dist/licenses/${family}.txt`, await readFile(new URL('./LICENSE', `file://${pkg}`)));
}
await writeFile('dist/full.css', "@import './theme.css';\n@import './foundation.css';\n@import './typography.css';\n@import './components.css';\n@import './layout.css';\n@import './patterns.css';\n@import './forms.css';\n");
await writeFile('dist/foundation.json', JSON.stringify(foundation,null,2)+'\n');
await writeFile('dist/capabilities.json', JSON.stringify(source.capabilities,null,2)+'\n');
await writeFile('dist/design.json', JSON.stringify(design,null,2)+'\n');

await writeFile('dist/components.css', await readFile(new URL('../styles/components.css', import.meta.url), 'utf8'));

const aliases = Object.keys(foundation.tokens).map(key => `  --${key}: var(--krigsvold-${key});`).concat(Object.keys(foundation.tokens).filter(k=>k.startsWith('color-')).map(key=>`  --${key.slice(6)}: var(--krigsvold-${key});`), ['serif','sans'].map(key=>`  --${key}: var(--krigsvold-font-${key});`)).join('\n');
await writeFile('dist/legacy.css', `/* Optional aliases for an existing website migrating to Krigsvold. */\n:root {\n${aliases}\n}\n`);

await writeFile('dist/layout.css', await readFile(new URL('../styles/layout.css',import.meta.url),'utf8'));
await writeFile('dist/layout.json', JSON.stringify(source.layout,null,2)+'\n');

for (const name of ['patterns','source-profile','forms']) await writeFile(`dist/${name}.css`, await readFile(new URL(`../styles/${name}.css`, import.meta.url), 'utf8'));
await writeFile('dist/language.json', await readFile(new URL('../language.json', import.meta.url), 'utf8'));
