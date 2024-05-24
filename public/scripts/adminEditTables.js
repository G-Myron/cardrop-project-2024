
const rows = document.querySelectorAll(".admin-table tbody tr")

rows.forEach( row => {
  const inputs = row.querySelectorAll("td input.form-control")
  const editBtn = row.querySelector(".admin-edit")
  const saveBtn = row.querySelector(".admin-save")

  saveBtn.onclick = editBtn.onclick = () => {
    editBtn.classList.toggle("d-none")
    saveBtn.classList.toggle("d-none")

    inputs.forEach( inp => {
      inp.toggleAttribute("readonly")
    })
  }
})

