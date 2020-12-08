export function collectFormData() {
    const $forms = document.querySelectorAll('.js-form');
    if ($forms) {
        [...$forms].forEach(($form) => {
            $form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formFields = {};
                const formData = new FormData($form);
                for (const pair of formData.entries()) {
                    formFields[pair[0]] = pair[1];
                }
                console.log(formFields);
            });
        });
    }
}
//# sourceMappingURL=collectFormData.js.map