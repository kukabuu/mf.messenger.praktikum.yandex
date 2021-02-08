export function displayFileName($input: HTMLInputElement): void {
  const $label = document.querySelector('.js-file-upload--label');
  const $name = document.querySelector('.js-file-name');

  if (!$input?.files || $label === null || $name === null) {
    return;
  }

  $name!.textContent = $input?.files[0]?.name;
  $name?.classList.remove('i-display-none');
  $label?.classList.add('i-display-none');
}
