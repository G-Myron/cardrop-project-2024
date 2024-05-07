import express from 'express'
import { engine, create } from 'express-handlebars'

import { router as userRouter } from './routes/userRoutes.js'
import { router as indexRouter } from './routes/indexRoutes.js'
import { router as apiRouter } from './routes/apiRoutes.js'

const app = express();
const port = process.env.PORT || 3000;

// Handlebars
app.engine('hbs', engine({
  extname: ".hbs",
  helpers: {
    eq: (a, b) => a===b
  }
}))
app.set("view engine", 'hbs')

// Static folder
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

// Middleware for reading json body from post requests
app.use(express.json())

// Routers
app.use(indexRouter)
app.use("/user", userRouter)
app.use("/api", apiRouter)

app.use((req, res) => {
  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Express app listening on  http://localhost:${port}/`);
});
