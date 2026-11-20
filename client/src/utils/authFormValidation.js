// formValidation.js
export const validateForm = (formData) => {
    console.log(formData);
    const errors = {};
    if (formData.username && formData.username.length < 4) {
        errors.username = 'Username must be at least 4 characters';
    }
    if (formData.password && formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    if (
        formData.password &&
        formData.confirmPassword &&
        formData.password.length >= 8 &&
        formData.password != formData.confirmPassword
    ) {
        errors.confirmPassword =
            'Confirm password should be the same as password';
    }

    if (Object.keys(errors).length == 0) {
        return false;
    }

    return errors;
};
