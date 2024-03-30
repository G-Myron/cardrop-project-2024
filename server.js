const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: __dirname + '/views/'
}));

app.use(express.static('public'));


app.get('/', (req, res) =>
  res.render('user', {layout: 'user/index'})
);

app.get('/edit', (req, res) =>
  res.render('user', {layout: 'user/edit'})
);


app.listen(port, () => {
  console.log(`Express-Handlebars app listening on  http://localhost:${port}/`);
});
