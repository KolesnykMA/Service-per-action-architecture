module.exports = {
  development: {
    secret: process.env.JWT_DEV_SECRET,
    expiresIn: process.env.JWT_DEV_EXPIRES,
  },
  stage: {
    secret: process.env.JWT_STAGE_SECRET,
    expiresIn: process.env.JWT_STAGE_EXPIRES,
  },
}[process.env.NODE_ENV];
