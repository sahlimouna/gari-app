const express = require('express');
const { join } = require('path');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  // إذا كنت عامل build بـ output: 'standalone'
  dir: '.',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Sert les fichiers statiques depuis le dossier .next/static
  server.use('/_next', express.static(join(__dirname, '.next', 'static')));

  // Route handler par défaut pour toutes les requêtes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`🚀 Gari app running at http://localhost:${port}`);
  });
});
