import { body, validationResult } from 'express-validator'


const validateLogin = [
  // No need for too many validations. If it's invalid it won't be found in the db.
  body("email").trim().escape().notEmpty(),
  body("password").exists(),
  (req, res, next) => handleValidityErrors(req, res, next, "user/login")
]

const validateSignup = [
  body("name").trim().escape().notEmpty().withMessage("Please give a valid name"),
  body("surname").trim().escape().notEmpty().withMessage("Please give a valid surname"),
  body("tel").trim().escape().notEmpty()
    .isMobilePhone().withMessage("Please provide a valid phone number"),
  body("email").trim().escape().notEmpty()
    .isEmail().withMessage("Please provide a valid email"),
  body("confirm-password").exists()
    .custom( (value, {req}) => {
      if (value === req.body.password) return true
      else throw new Error("Passwords don't match")
    }),
    (req, res, next) => handleValidityErrors(req, res, next, "user"+req.route.path)
]

const validateSearch = [
  body("city").exists().withMessage("Please choose a city from the list"),
  body("rentDateFrom").custom( (value) => {
    const today = new Date()
    today.setTime(0)
    if ( new Date(value) >= today ) return true
    else throw new Error("The reservation date cannot be before today")
  }),
  body("rentDateTo").custom( (value, {req}) => {
    if ( new Date(value) > new Date(req.body.rentDateFrom) ) return true
    else throw new Error("The reservation dates are not valid")
  }),
  async (req, res, next) => handleValidityErrors(req, res, next, "index", {home: 1})
]


function handleValidityErrors(req, res, next, onErrorRender, options={}) {
  const errors = validationResult(req)
  if (errors.isEmpty())
    next()
  else {
    options.errorMsg = errors.array()[0].msg
    res.render(onErrorRender, options)
  }
}


export { validateLogin, validateSignup, validateSearch }