// server.mjs

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import ssr from './ssr.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const { html, ttRenderMs } = await ssr(
      `file://${path.join(__dirname, 'public', 'index.html')}`
    );
    res.set(
      'Server-Timing',
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
    );
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error during SSR:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/posts', (req, res) => {
  // Dummy data for demonstration. Replace with your actual data source.
  const posts = [
    { title: 'Post 1', summary: 'Summary 1', content: 'Content 1' },
    { title: 'Post 2', summary: 'Summary 2', content: 'Content 2' },
  ];
  res.json(posts);
});

app.listen(8080, () => console.log('Server started. Press Ctrl+C to quit'));
