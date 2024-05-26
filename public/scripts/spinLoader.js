const forms = document.querySelectorAll("form")
const links = document.querySelectorAll("a[href]:not([target=_blank])")
const spinLoader = document.querySelector("#spinLoader")

const LOADER_DELAY = 100 //ms

forms?.forEach( form => {
  form.addEventListener("submit", async (ev) => {
    if (!form.classList.contains("needs-validation"))
      showSpinner()
  })
})
links?.forEach( link => link.addEventListener("click", showSpinner))

async function showSpinner() {
  setTimeout(() => {
    spinLoader.classList.remove("d-none")
    spinLoader.classList.add("d-flex")
  }, LOADER_DELAY)
}

window.addEventListener("pageshow", ()=> {
  setTimeout(() => {
    spinLoader.classList.remove("d-flex")
    spinLoader.classList.add("d-none")
  }, 1) // or SPINLOADER_DELAY
})
