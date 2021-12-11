import passport from 'passport';

const LocalStrategy = require('./statregy/local.strategy');
const JwtStrategy = require('./statregy/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);