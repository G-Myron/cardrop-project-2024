const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
    res.send("This is just a test get controller.");
});


app.listen(port, () => {
  console.log(`Express app listening on  http://localhost:${port}/`);
});
