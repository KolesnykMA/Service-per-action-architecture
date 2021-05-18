module.exports = {
  development: {
    port: process.env.APP_DEV_PORT,
  },
  stage: {
    port: process.env.APP_STAGE_PORT,
  },
}[process.env.NODE_ENV];
