import boom from '@hapi/boom';
const config = require('./../config/config');

function checkApiKey(req: any, res: any, next: any) {
  const apikey = req.headers['api'];
  if (apikey === config.config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req: any, res: any, next: any) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized())
  }
}

function checkRoles(...roles: String[]) {
  return (req: any, res: any, next: any) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }