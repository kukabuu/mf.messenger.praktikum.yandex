import { isValidForm } from './validate.js';
export function collectFormData($form) {
    if (!$form || !isValidForm()) {
        return;
    }
    const formFields = {};
    const formData = new FormData($form);
    console.log(JSON.stringify(Object.fromEntries(formData)));
    for (const pair of formData.entries()) {
        formFields[pair[0]] = pair[1];
    }
    return formFields;
}
//# sourceMappingURL=collectFormData.js.map