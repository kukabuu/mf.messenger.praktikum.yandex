import { isValidForm} from './validate.js';

type formFields = {
  [key: string]: string | File
}

export function collectFormData($form: HTMLFormElement) {
  if (!$form || !isValidForm()) {
    return;
  }

  const formFields: formFields = {};
  const formData = new FormData($form);
  console.log(JSON.stringify(Object.fromEntries(formData)));
  for (const pair of formData.entries()) {
    formFields[pair[0]] = pair[1];
  }

  return formFields;
}
