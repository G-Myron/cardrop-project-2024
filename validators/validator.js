import { body, validationResult } from 'express-validator'


const validateLogin = [
  // No need for too many validations. If it's invalid it won't be found in the db.
  body("email").trim().escape().notEmpty(),
  body("password").exists(),
  (req, res, next) => handleValidityErrors(req, res, next, "user/login")
]

const validateSignup = [
  body("email").trim().escape().notEmpty()
    .isEmail().withMessage("This is not a valid email"),
  body("confirm-password").exists()
    .custom( (value, {req}) => {
      if (value === req.body.password) return true
      else throw new Error("Passwords don't match")
    }),
    (req, res, next) => handleValidityErrors(req, res, next, "user/create")
]


function handleValidityErrors(req, res, next, onErrorRender) {
  const errors = validationResult(req)
  if (errors.isEmpty())
    next()
  else {
    res.render(onErrorRender, {errorMsg: errors.array()[0].msg})
  }
}


export { validateLogin, validateSignup }