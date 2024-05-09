// Disable form submissions if there are invalid fields
(window.onload = () => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  forms.forEach(form => {
    form.addEventListener('submit', event => {

      form.querySelectorAll(":required").forEach( required => {
        if (!required.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        required.parentElement.classList.add('was-validated')
      })

    }, false)
  })
})()