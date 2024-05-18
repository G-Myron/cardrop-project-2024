const dateFromPicker = document.querySelector(" input#rentDateFrom")
const dateToPicker = document.querySelector(" input#rentDateTo")

const today = new Date(Date.now())

const tomorrow = new Date(today)
tomorrow.setDate( today.getDate() + 1 )


dateFromPicker?.setAttribute("min", today.toISOString().slice(0, 10))
if ( !dateFromPicker?.value )
  dateFromPicker?.setAttribute("value", today.toISOString().slice(0, 10))

if ( !dateToPicker?.value )
  dateToPicker?.setAttribute("value", tomorrow.toISOString().slice(0, 10))
dateToPicker?.setAttribute("min", dateFromPicker.value)

dateFromPicker?.addEventListener("change", () => {
  const dateFromValue = dateFromPicker.value
  const dateToValue = dateToPicker.value

  const dateFrom = new Date(dateFromValue)
  const dateTo = new Date(dateToValue)
  dateFrom.setDate( dateFrom.getDate() + 1 )
  
  dateToPicker.setAttribute("min", dateFrom.toISOString().slice(0, 10))
  if (dateFrom > dateTo)
    dateToPicker.value = dateFrom.toISOString().slice(0, 10)
})
