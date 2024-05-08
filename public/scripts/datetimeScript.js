const dateFromPicker = document.querySelector(".index input#rentDateFrom")
const dateToPicker = document.querySelector(".index input#rentDateTo")

const timezone = new Date().getTimezoneOffset() * 60_000

const today = new Date(Date.now() - timezone)
today.setHours( today.getHours() + 1 )
today.setMinutes(0)

const tomorrow = new Date(today)
tomorrow.setDate( today.getDate() + 1 )


dateFromPicker?.setAttribute("value", today.toISOString().slice(0, 16))
dateFromPicker?.setAttribute("min", today.toISOString().slice(0, 16))

dateToPicker?.setAttribute("value", tomorrow.toISOString().slice(0, 16))
dateToPicker?.setAttribute("min", tomorrow.toISOString().slice(0, 16))

dateFromPicker?.addEventListener("change", () => {
  const dateFrom = new Date(dateFromPicker.value)
  dateFrom.setDate( dateFrom.getDate() + 1 )
  
  dateToPicker.setAttribute("min", dateFrom.toISOString().slice(0, 16))
})
