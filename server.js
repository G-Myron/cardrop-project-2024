import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'

import { router as userRouter } from './routes/userRoutes.js'
import { router as indexRouter } from './routes/indexRoutes.js'
import { router as apiRouter } from './routes/apiRoutes.js'
import { router as authRouter } from './routes/authRoutes.js'
import { authenticationMW, globalVariablesMW } from './config/globalMiddleware.js'

const app = express()
const port = process.env.PORT || 3000

// Handlebars
app.engine('hbs', engine({
  extname: ".hbs",
  helpers: {
    eq: (a, b) => a===b,
  }
}))
app.set("view engine", 'hbs')

// Static folder
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

// Middleware for reading json body from post requests
app.use(express.json())

// Session configuration
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "rentACar",
  cookie: {
      maxAge: 30 * 60e3 // 30mims
  }
}))

// Check Authentication and set global variables for all pages
app.use(authenticationMW, globalVariablesMW)

// Routers
app.use(indexRouter)
app.use("/user", userRouter)
app.use("/api", apiRouter)
app.use("/auth", authRouter)

// Redirect any other route
app.use((req, res) => {
  res.redirect("/")
})

// Error Handling / Handle all next(error)
app.use((err, req, res, next) => {
  console.error("Error:", err.message)
  res.render("error", {message: err.message})
})

app.listen(port, () => {
  console.log(`Express app listening on  http://localhost:${port}/`)
})
