const express = require('express');
const path = require('path');
var app = express()
app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/dist/index.html')));
const PORT=3088;


app.listen(PORT, () => {
  console.log("Server started at "+PORT+" PORT");
});
