module.exports = {
  apps : [{
    script: 'node --trace-warnings ./server/index.mjs',
    env: {
      NODE_ENV: 'development',
      DATABASE_URL: `file:${__dirname}/production.db`,
      AUTH_NUXT_SECRET: 'yiho-concrete-sam',
      AUTH_ORIGIN: 'https://yiho-concrete.com.tw'
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_URL: `file:${__dirname}/production.db`,
      AUTH_NUXT_SECRET: 'yiho-concrete-sam',
      AUTH_ORIGIN: 'https://yiho-concrete.com.tw'
    }
  }],

  deploy : {
    production : {
      user : 'yiho-concrete',
      host : 'cp.cloudeasy.net',
      // ref  : 'origin/main',
      // repo : 'git@github.com:wl00215041/yiho-concrete.git',
      path : '/home/yiho-concrete/htdocs/yiho-concrete.cloudeasy.net',
      'pre-deploy-local': 'npx prisma generate && pnpm run build',
      // 'post-deploy' : 'PATH=/home/yiho-concrete/.nvm/versions/node/v20.19.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/snap/bin node ./server/index.mjs',
      'pre-setup': ''
    }
  }
};
