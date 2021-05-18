const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const jwtConfig = require('../../config/userJwtConfig');

const User = require('../../domain/models/users/User');

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

passport.use('adminJwt', new JwtStrategy(options, async ({id}, done) => {
  try {
    const admin = await Admin.getByPk$(id);

    const adminTokenData = {
      adminId: admin.adminId,
      adminType: admin.adminType,
    };

    return done(null, adminTokenData);
  } catch (error) {
    return done({status: 400, code: 'TOKEN_INVALID'}, null);
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

const adminJwtMiddleware = (req, res, next) => {
  passport.authenticate('adminJwt', {session: false}, (error, admin, _) => {
    if (error || !admin) {
      return res.status(400).send({
        error: {
          code: 'NOT_AUTHORIZED',
        },
      });
    }

    req.admin = admin;

    return next();
  })(req, res, next);
};

const superAdminMiddleware = (req, res, next) => {
  const {adminType} = req.admin;

  adminType === 'super' ? next() : next(new Error('ACCESS_DENIED'));
};

const provinceAdminMiddleware = (req, res, next) => {
  const {adminType} = req.admin;

  adminType === 'province' ?
    next() :
    next(new Error('ACCESS_DENIED'));
};

const customerMiddleware = (req, res, next) => {
  const {userType} = req.user;

  userType === 'customer' ?
    next() :
    next(new Error('ACCESS_DENIED'));
};

const sellerMiddleware = (req, res, next) => {
  const {userType} = req.user;

  userType === 'seller' ?
    next() :
    next(new Error('ACCESS_DENIED'));
};

module.exports = {
  passportMiddleware: passport.initialize(),

  userJwtMiddleware,
  adminJwtMiddleware,

  superAdminMiddleware,
  provinceAdminMiddleware,

  customerMiddleware,
  sellerMiddleware,
};
