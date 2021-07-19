'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

const { parsed: dotEnv } = require('dotenv').config();

console.log('dotenv: ', dotEnv);

if (!dotEnv) {
  dotEnv = {};
}

for (const key in dotEnv) {
  if (!dotEnv[key].startsWith('"')) {
    dotEnv[key] = '"' + dotEnv[key] + '"';
  }

  if (!dotEnv[key].startsWith('"') || !dotEnv[key].endsWith('"')) {
    console.error(
      "error: env variable '" + key + "' have missing double quote"
    );
  }
}

module.exports = merge(
  prodEnv,
  {
    NODE_ENV: '"development"'
  },
  dotEnv
);
