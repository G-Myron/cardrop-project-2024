
const rows = document.querySelectorAll(".admin-table tbody tr")
const newRow = document.querySelector(".admin-table tbody tr#new-row")

rows?.forEach( row => {
  const inputs = row.querySelectorAll("td input.form-control, td select.form-select")
  const editBtn = row.querySelector(".admin-edit")
  const saveBtn = row.querySelector(".admin-save")
  const deleteBtn = row.querySelector(".admin-delete")

  editBtn.onclick = () => {
    editBtn.classList.toggle("d-none")
    saveBtn.classList.toggle("d-none")

    inputs.forEach( inp => inp.removeAttribute("disabled"))
    deleteBtn.removeAttribute("disabled")
  }
})

const addDocumentBtn = document.querySelector(".admin-table .admin-add")
addDocumentBtn?.addEventListener("click", () => {
  newRow.classList.toggle("d-none")
  newRow.querySelector(".admin-edit").click()
})
