import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerAutogen from 'swagger-autogen'
import { engine } from 'express-handlebars'
import { router as userRouter } from './routes/userRoutes.js'
import { router as indexRouter } from './routes/indexRoutes.js'

const app = express();
const port = process.env.PORT || 3000;

// Handlebars
app.engine('hbs', engine({extname: ".hbs"}))
app.set("view engine", 'hbs')

// Static folder
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

// Swagger UI
const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: ['http://localhost:3000']
  },
  apis: []
}
// swaggerAutogen("swaggerTest.json", ["./routes/*.js"])
import swaggerTest from './swaggerTest.json' with {type:"json"}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerTest))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

// Routers
app.use(indexRouter)
app.use("/user", userRouter)

app.use((req, res) => {
  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Express app listening on  http://localhost:${port}/`);
});
