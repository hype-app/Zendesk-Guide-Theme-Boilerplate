#!/usr/bin/env/node
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const packagePath = 'package.json';
const manifestPath = 'dist/manifest.json';

readFileAsync(packagePath)
  .then(blob => {
    return JSON.parse(blob);
  })
  .then(pkg => {
    return readFileAsync(manifestPath).then(blob => {
      const manifest = JSON.parse(blob);

      manifest.version = pkg.version;

      manifest.name = `${pkg.themeName}-${pkg.version}`;

      return writeFileAsync(
        manifestPath,
        JSON.stringify(manifest, null, '  '),
        'utf8'
      );
    });
  });
