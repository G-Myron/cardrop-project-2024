const forms = document.querySelectorAll("form")
const links = document.querySelectorAll("[href]")
const spinLoader = document.querySelector("#spinLoader")

forms.forEach( form => form.onsubmit = showSpinner)
links.forEach( link => link.onclick = showSpinner)

async function showSpinner() {
  setTimeout(() => {
    spinLoader.classList.remove("d-none")
    spinLoader.classList.add("d-flex")
  }, 100)
}
