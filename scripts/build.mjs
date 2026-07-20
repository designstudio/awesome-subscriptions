import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const servicesDir = path.join(root, 'data', 'services');
const distDir = path.join(root, 'dist');
const countriesDir = path.join(distDir, 'countries');

const filenames = (await readdir(servicesDir))
  .filter((name) => name.endsWith('.json'))
  .sort();

const services = [];
for (const filename of filenames) {
  services.push(JSON.parse(await readFile(path.join(servicesDir, filename), 'utf8')));
}

services.sort((a, b) => a.name.localeCompare(b.name, 'en'));
await mkdir(countriesDir, { recursive: true });
await writeFile(path.join(distDir, 'services.json'), `${JSON.stringify(services, null, 2)}\n`);
await writeFile(path.join(distDir, 'services.min.json'), JSON.stringify(services));

const regions = new Map();
for (const service of services) {
  for (const region of service.regions) {
    if (!regions.has(region)) regions.set(region, []);
    regions.get(region).push(service);
  }
}

for (const [region, regionalServices] of [...regions.entries()].sort()) {
  await writeFile(
    path.join(countriesDir, `${region}.json`),
    `${JSON.stringify(regionalServices, null, 2)}\n`
  );
}

console.log(`Built ${services.length} services across ${regions.size} region(s).`);
