const express = require('express');
const app = express();
const port = 8000;
const foodInfoRouter = require('./routers/foodInfoRouter');
const oauthRotuer = require('./routers/oauthRotuer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cors());
app.use(cookieParser());
app.use('/', foodInfoRouter);
app.use('/', oauthRotuer);

// for frontend url (after react build)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/', function (_req, res, next) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'), function (err) {
    next(err);
  });
});

// error handler should put as the last middleware
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
