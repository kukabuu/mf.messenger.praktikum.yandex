import { isValidForm } from './validate';

type formFields = {
  [key: string]: string | File;
}

export function collectFormData($form: HTMLFormElement): formFields | undefined {
  if (!$form || !isValidForm()) {
    return;
  }

  const formFields: formFields = {};
  const formData = new FormData($form);
  for (const pair of formData.entries()) {
    formFields[pair[0]] = pair[1];
  }

  return formFields;
}
