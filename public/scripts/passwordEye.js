const passwordEye = document.querySelector("input~#passShow")

passwordEye?.addEventListener( "click", () => {
  const passwordInput = passwordEye.previousElementSibling.previousElementSibling
  passwordInput.type = passwordInput.type === "text"? "password" : "text"

  passwordEye.classList.toggle("bi-eye")
  passwordEye.classList.toggle("bi-eye-slash")
})

