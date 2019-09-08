const express = require('express');
var app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  // res.redirect('/');
  res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(3000, () => {
  console.log("listening on 3000");
});