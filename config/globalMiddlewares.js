import fs from 'fs/promises'

const citiesList = JSON.parse(await fs.readFile(`data/citiesList.json`))

const authenticationMW = (req, res, next) => {
  if(req.session.user){
    res.locals.user = req.session.user
    next()
  }
  else res.redirect("/auth/login")
}

const adminMW = (req, res, next) => {
  if(req.session.user?.role === "admin")
    next()
  else res.redirect("/")
}

const notAdminMW = (req, res, next) => {
  if(req.session.user?.role !== "admin")
    next()
  else res.redirect("/admin")
}

const globalVariablesMW = async (req, res, next) => {
  res.locals.citiesList = citiesList
  next()
}

export { authenticationMW, adminMW, notAdminMW, globalVariablesMW }