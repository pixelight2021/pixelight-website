module.exports = {
    apps: [
      {
        name: 'pixelight-website',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }