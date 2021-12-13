
import express from 'express';
import passport from 'passport';

const app = express();
const port = 8080;

const routes = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
//const { checkApiKey } = require('./middlewares/auth.handler')


app.use(express.json());

app.use(passport.initialize())

require('./utils/auth/')
routes(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`localhost:${port}`)
});


