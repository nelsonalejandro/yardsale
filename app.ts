
import express from 'express';

const app = express();
const port = 8080;

const routes = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

app.use(express.json());

routes(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`localhost:${port}`)
});


