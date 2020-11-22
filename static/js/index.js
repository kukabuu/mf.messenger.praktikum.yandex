(function() {
  collectFormData();
  displayFileName();

  function collectFormData() {
    const $forms = document.querySelectorAll('.js-form');
    if ($forms) {
      [...$forms].forEach(($form) => {
        $form.addEventListener('submit', (e) => {
          const formFields = {};
          e.preventDefault();
          const formData = new FormData($form);
          for (const pair of formData.entries()) {
            formFields[pair[0]] = pair[1];
          }
          console.log(formFields);
        });
      });
    }
  }
  
  function displayFileName() {
    const $input = document.querySelector('.js-file-upload');
    const $label = document.querySelector('.js-file-upload--label');
    const $name = document.querySelector('.js-file-name');
    if ($input) {
      $input.onchange = () => {
        const name = $input.files[0]?.name;
        $name.textContent = name;
        $name.classList.remove('i-display-none')
        $label.classList.add('i-display-none');
      }
    }
  }
})()
