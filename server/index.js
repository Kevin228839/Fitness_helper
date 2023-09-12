const express = require('express');
const app = express();
const port = 8000;
const foodInfoRouter = require('./routers/foodInfoRouter');
const oauthRotuer = require('./routers/oauthRotuer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');

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

// https server
https.createServer({
  key: fs.readFileSync('../ssl/key.pem'),
  cert: fs.readFileSync('../ssl/certificate.pem')
}, app).listen(port, () => {
  console.log(`Server is listening at port:${port}`);
});
