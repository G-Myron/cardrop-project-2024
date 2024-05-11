import { body, validationResult } from 'express-validator'


const validateLogin = [
  body("email").trim().escape().notEmpty()
    .isEmail().withMessage("This is not a valid email"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty())
      next()
    else {
      console.log(errors.mapped());
      next()
      // res.render("home", { message: errors.mapped() }) // Sintoris
    }
  }
]

const validateSignup = [
  body("email").trim().escape().notEmpty()
    .isEmail().withMessage("This is not a valid email"),
  body("confirm-password").trim().escape().notEmpty()
]


export { validateLogin, validateSignup }