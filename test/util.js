import fs from 'fs';
import path from 'path';

export function readJson(from) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, from), 'utf8'));
}

export function readHtml(from) {
  return fs.readFileSync(path.resolve(__dirname, from), 'utf8');
}