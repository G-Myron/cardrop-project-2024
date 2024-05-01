import express, { text } from "express";
import exphbs from "express-handlebars";

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: './views/'
}));

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true })); // for POST req data


app.get('/', (req, res) =>
  res.render('user', {layout: 'user/index', text: 'I am the Teext!'})
)

app.get('/edit', (req, res) =>
  res.render('user', {layout: 'user/edit'})
)

app.get('/car/:carId', (req, res) =>
  res.send(req.params.carId)
)

app.get('/api', (req, res) =>
  res.json({"name":"car-rentals"})
)


app.listen(port, () => {
  console.log(`Express-Handlebars app listening on  http://localhost:${port}/`);
});
