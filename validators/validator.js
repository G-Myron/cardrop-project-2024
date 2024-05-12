import { body, validationResult } from 'express-validator'


const validateLogin = [
  // No need for too many validations. If it's invalid it won't be found in the db.
  body("email").trim().escape().notEmpty(),
  body("password").exists(),
  handleValidityErrors
]

const validateSignup = [
  body("email").trim().escape().notEmpty()
    .isEmail().withMessage("This is not a valid email"),
  body("confirm-password").exists()
    .custom( (value, {req}) => {
      if (value === req.body.password) return true
      else throw new Error("Passwords don't match")
    }),
    handleValidityErrors
]


function handleValidityErrors(req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty())
    next()
  else {
    // TODO: Error handling
    throw new Error( errors.array()[0].msg )
    // next( JSON.stringify(errors.errors[0]) )
    // res.render("home", { message: errors.mapped() }) // Sintoris
  }
}


export { validateLogin, validateSignup }