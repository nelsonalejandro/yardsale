const express: any = require('express');
const routes: any = require('./routes');
const cors: any = require('cors');
const app: any = express();
const port: number = 3000;
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));


routes(app);
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)
app.listen(port, () => {
  console.log('puerto: ', port)
});


