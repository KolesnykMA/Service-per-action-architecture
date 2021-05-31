const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const jwtConfig = require('../../../config/userJwtConfig');

const User = require('../../../domain/models/users/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

passport.use('userJwt', new JwtStrategy(options, async ({id}, done) => {
  try {
    const user = await User.getByPk$(id);

    const userTokenData = {
      userId: user.userId,
      userType: user.userType,
    };

    return done(null, userTokenData);
  } catch (error) {
    return done({status: 500, code: 'TOKEN_INVALID'}, null);
  }
}));

const userJwtMiddleware = (req, res, next) => {
  passport.authenticate('userJwt', {session: false}, (error, user, _) => {
    if (error || !user) {
      return res.status(400).send({
        error: {
          code: 'NOT_AUTHORIZED',
        },
      });
    }

    req.user = user;

    return next();
  })(req, res, next);
};

module.exports = {
  userJwtMiddleware,
};
