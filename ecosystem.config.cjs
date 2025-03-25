module.exports = {
  apps : [{
    script: 'pnpm run dev --host',
    watch: '.',
    env: {
      NODE_ENV: 'development',
      DATABASE_URL: 'file:./dev.db',
      AUTH_NUXT_SECRET: 'yiho-concrete-sam'
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_URL: 'file:./dev.db',
      AUTH_NUXT_SECRET: 'yiho-concrete-sam'
    }
  }],

  deploy : {
    production : {
      user : 'yiho-concrete',
      host : 'cp.cloudeasy.net',
      ref  : 'origin/main',
      repo : 'git@github.com:wl00215041/yiho-concrete.git',
      path : '/home/yiho-concrete/htdocs/yiho-concrete.cloudeasy.net',
      'pre-deploy-local': '',
      'post-deploy' : 'PATH=/home/yiho-concrete/.nvm/versions/node/v20.19.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/snap/bin npm install -g pnpm && pnpm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
