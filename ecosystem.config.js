module.exports = {
  apps: [
    {
      name: 'app1',
      script: 'dist/index.js',
      watch: true,
      autorestart: true,
      // instances: 4,
      args: '--port=8081',
    },
    {
      name: 'app2',
      script: 'dist/index.js',
      watch: true,
      autorestart: true,
      instances: 4,
      args: '--port=8082 --cluster=true',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],
};