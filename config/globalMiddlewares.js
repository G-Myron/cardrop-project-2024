import fs from 'fs/promises'

const authWhiteList = ["/auth/login", "/auth/signup"]
const citiesList = JSON.parse(await fs.readFile(`data/citiesList.json`))

const authenticationMW = (req, res, next) => {
  if(req.session.user || authWhiteList.includes(req._parsedUrl.pathname)){
    res.locals.user = req.session.user
    next()
  }
  else res.redirect(authWhiteList[0])
}

const globalVariablesMW = async (req, res, next) => {
  res.locals.citiesList = citiesList
  next()
}

export { authenticationMW, globalVariablesMW }