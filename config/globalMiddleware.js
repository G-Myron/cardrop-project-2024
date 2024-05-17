
const authWhiteList = ["/auth/login", "/auth/signup"]
const citiesList = ["Athens","Thessaloniki","Patras","Larissa","Heraklion","Volos","Ioannina"]

const authenticationMW = (req, res, next) => {
  if(req.session.username || authWhiteList.includes(req._parsedUrl.pathname)){
    res.locals.username = req.session.username
    next()
  }
  else res.redirect(authWhiteList[0])
}

const globalVariablesMW = async (req, res, next) => {
  res.locals.citiesList = citiesList
  next()
}

export { authenticationMW, globalVariablesMW }