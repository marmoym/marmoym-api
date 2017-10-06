const serverConfig = require('../../src/config/marmoym-config').serverConfig;

module.exports = {
  "apps": [
    {
      "name": "marmoym-api",
      script: '/home/user/deploy/marmoym-api/current/lib/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    development : {
      'user': serverConfig['marmoym-dev1'].user,
      'host': serverConfig['marmoym-dev1'].host,
      'ref': 'origin/dev',
      'repo': 'git@github.com:tymsai/marmoym-api.git',
      'path': '/home/user/deploy/marmoym-api', 
      'post-deploy': 'yarn install && yarn run reload:dev',
      'env'  : {
        'NODE_ENV': 'development'
      }
    },
    production : {
      user : serverConfig['marmoym-dev1'].user,
      host : serverConfig['marmoym-dev1'].host,
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      env  : {
        NODE_ENV: 'development'
      }
    }
  }
};
