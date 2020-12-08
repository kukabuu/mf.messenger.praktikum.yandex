import { isValidForm} from './validation.js';

type formFields = {
  [key: string]: any
}

export function collectFormData() {
  const $forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.js-form');
  if ($forms) {
    [...$forms].forEach(($form) => {
      $form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isValidForm()) {
          return;
        }
        const formFields:formFields = {};
        const formData = new FormData($form);
        for (const pair of formData.entries()) {
          formFields[pair[0]] = pair[1];
        }
        console.log(formFields);
      });
    });
  }
}
