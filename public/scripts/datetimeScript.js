const dateFromPicker = document.querySelector(" input#rentDateFrom")
const dateToPicker = document.querySelector(" input#rentDateTo")

const today = new Date(Date.now())

const tomorrow = new Date(today)
tomorrow.setDate( today.getDate() + 1 )


dateFromPicker?.setAttribute("value", today.toISOString().slice(0, 10))
dateFromPicker?.setAttribute("min", today.toISOString().slice(0, 10))

dateToPicker?.setAttribute("value", tomorrow.toISOString().slice(0, 10))
dateToPicker?.setAttribute("min", tomorrow.toISOString().slice(0, 10))

dateFromPicker?.addEventListener("change", () => {
  const dateFrom = new Date(dateFromPicker.value)
  dateFrom.setDate( dateFrom.getDate() + 1 )
  
  dateToPicker.setAttribute("min", dateFrom.toISOString().slice(0, 10))
  dateToPicker.setAttribute("value", dateFrom.toISOString().slice(0, 10))
})
