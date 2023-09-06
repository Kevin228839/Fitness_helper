const express = require('express');
const app = express();
const port = 8000;
const foodInfoRouter = require('./routers/foodInfoRouter');
const cors = require('cors');

app.use(cors());
app.use('/', foodInfoRouter);

// error handler should put as the last middleware
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
