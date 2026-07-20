import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = process.cwd();
const servicesDir = path.join(root, 'data', 'services');
const schemaPath = path.join(root, 'schema', 'service.schema.json');
const categoriesPath = path.join(root, 'data', 'categories.json');

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));

const schema = await readJson(schemaPath);
const categories = await readJson(categoriesPath);
const categoryIds = new Set(categories.map((category) => category.id));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateSchema = ajv.compile(schema);

let filenames = [];
try {
  filenames = (await readdir(servicesDir)).filter((name) => name.endsWith('.json')).sort();
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const ids = new Set();
const domains = new Map();
const errors = [];

for (const filename of filenames) {
  const filePath = path.join(servicesDir, filename);
  let service;

  try {
    service = await readJson(filePath);
  } catch (error) {
    errors.push(`${filename}: invalid JSON (${error.message})`);
    continue;
  }

  if (!validateSchema(service)) {
    for (const issue of validateSchema.errors ?? []) {
      errors.push(`${filename}${issue.instancePath || '/'}: ${issue.message}`);
    }
  }

  if (service.id && filename !== `${service.id}.json`) {
    errors.push(`${filename}: filename must match id (${service.id}.json)`);
  }

  if (ids.has(service.id)) errors.push(`${filename}: duplicate id ${service.id}`);
  ids.add(service.id);

  if (service.domain) {
    const previous = domains.get(service.domain);
    if (previous) errors.push(`${filename}: duplicate domain ${service.domain} also used by ${previous}`);
    domains.set(service.domain, filename);
  }

  if (service.category && !categoryIds.has(service.category)) {
    errors.push(`${filename}: unknown category ${service.category}`);
  }
}

if (errors.length > 0) {
  console.error(`Catalog validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${filenames.length} service record(s) successfully.`);
