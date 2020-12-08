export function displayFileName() {
  const $input: HTMLInputElement | null = document.querySelector('.js-file-upload');
  const $label = document.querySelector('.js-file-upload--label');
  const $name = document.querySelector('.js-file-name');

  if ($input === null || $label === null || $name === null) {
    return;
  }

  $input.addEventListener('change', () => {
    if (!$input.files) {
      return
    }

    const name = $input.files[0]?.name;
    $name.textContent = name;
    $name.classList.remove('i-display-none')
    $label.classList.add('i-display-none');
  })
}
