const path = require('path');

const WWW_PATH = path.resolve(__dirname, '../../bin/www');

module.exports = {
  // http://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'marmoym-api',
      script: WWW_PATH,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  // http://pm2.keymetrics.io/docs/usage/deployment/
  deploy: {
    development: {
      user: 'ubuntu',
      host: '52.79.188.113',
      ref: 'origin/dev',
      repo: 'git@github.com:marmoym/marmoym-api.git',
      path: '/home/ubuntu/work/marmoym/marmoym-api',
      'post-setup': 'git fetch origin',
      'post-deploy': 'yarn install && yarn run pm2:start:prod',
    },
    production: {
      user: 'ubuntu',
      host: '52.79.188.113',
      ref: 'origin/dev',
      repo: 'git@github.com:marmoym/marmoym-api.git',
      path: '/home/ubuntu/work/marmoym/marmoym-api',
      'post-setup': 'git fetch origin',
      'post-deploy': 'yarn install && yarn run pm2:start:prod',
    },
  },
};
