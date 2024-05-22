const forms = document.querySelectorAll("form")
const links = document.querySelectorAll("[href]")
const spinLoader = document.querySelector("#spinLoader")

forms.forEach( form => {
  form.addEventListener("submit", async (ev) => {
    if (!ev.target.classList.contains("needs-validation"))
      showSpinner()
  })
})
links.forEach( link => link.addEventListener("click", showSpinner))

async function showSpinner() {
  setTimeout(() => {
    spinLoader.classList.remove("d-none")
    spinLoader.classList.add("d-flex")
  }, 100)
}
