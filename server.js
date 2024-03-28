const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user', 'index.hbs'));
});

app.get("/test", (req, res) => {
    res.send("This is just a test get controller.");
});


app.listen(PORT, () => {
  console.log(`Express app listening on  http://localhost:${PORT}/`);
});
