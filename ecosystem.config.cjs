module.exports = {
  apps : [{
    script: 'pnpm run dev',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'yiho-concrete',
      host : 'cp.cloudeasy.net',
      ref  : 'origin/main',
      repo : 'git@github.com:wl00215041/yiho-concrete.git',
      path : '/home/yiho-concrete/htdocs/yiho-concrete.cloudeasy.net',
      'pre-deploy-local': '',
      'post-deploy' : 'pnpm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
