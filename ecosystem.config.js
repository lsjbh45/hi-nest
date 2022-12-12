module.exports = {
  apps: [
    {
      name: 'hi-nest',
      script: './dist/main.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
