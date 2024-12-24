const express = require('express');
const path = require('path');
const compression = require('compression');
var app = express()
app.use(compression());

// app.use(express.static(__dirname + '/dist/frontend'));

const staticFilesDirectory = path.join(__dirname, 'dist', 'frontend');

app.use(express.static(staticFilesDirectory, {
  maxAge: '1y'
}));


const cacheBustingMiddleware = (req, res, next) => {
  req.url += '?v=' + Date.now();
  next();
};

app.use(cacheBustingMiddleware);

// app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/dist/frontend/index.html')));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesDirectory, 'index.html'));
});

let PORT= 3001;

app.listen(PORT, () => {
  console.log("Server started at "+PORT+" PORT");
});
