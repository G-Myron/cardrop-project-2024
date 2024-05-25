const passwordEye = document.querySelector(".input-group #passShow")

passwordEye?.addEventListener( "click", () => {
  const passwordInput = passwordEye.parentElement.querySelector("input")
  passwordInput.type = passwordInput.type === "text"? "password" : "text"

  passwordEye.classList.toggle("bi-eye")
  passwordEye.classList.toggle("bi-eye-slash")
})

