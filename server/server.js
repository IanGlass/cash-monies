const express = require('express');
var app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  // res.redirect('/');
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});