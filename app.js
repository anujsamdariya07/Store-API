require('dotenv').config();

// async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const router = require('./routes/products');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', router)

// Products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {console.log(`Server listening at port: ${port}...`)});
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
};
start();
