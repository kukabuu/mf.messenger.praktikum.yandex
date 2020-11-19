(function() {
  collectFormData();
  displayFileName();
})()

function collectFormData() {
  const $forms = document.querySelectorAll('.js-form');
  if ($forms) {
    [...$forms].forEach(($form) => {
      $form.addEventListener('submit', (e) => {
        const formFields = {};
        e.preventDefault();
        const formData = new FormData($form);
        for (let pair of formData.entries()) {
          formFields[pair[0]] = pair[1];
        }
        console.log(formFields);
      });
    });
  }
}

function displayFileName() {
  const $fileInput = document.querySelector('.js-file-upload');
  const $fileLabel = document.querySelector('.js-file-upload--label');
  const $nameFile = document.querySelector('.js-file-name');
  if ($fileInput) {
    $fileInput.onchange = () => {
      const name = $fileInput.files[0]?.name;
      $nameFile.textContent = name;
      $nameFile.classList.remove('i-display-none')
      $fileLabel.classList.add('i-display-none');
    }
  }
}
