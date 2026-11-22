import EmailValidator from 'email-validator';

export function validateEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required.',
    };
  }

  const trimmed = email.trim();
  if (!EmailValidator.validate(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address.',
    };
  }

  return {
    isValid: true,
    error: '',
  };
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  const errors = [];

  if (password.length < 8) {
    errors.push('at least 8 characters');
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    errors.push('both uppercase and lowercase letters');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('at least 1 number (0-9)');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('at least 1 special character (!@#$%^&*)');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      error: `Password must contain ${errors.join(', ')}.`,
    };
  }

  return {
    isValid: true,
    error: '',
  };
}

export function validateForm(email, password) {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);

  return {
    isValid: emailResult.isValid && passwordResult.isValid,
    emailError: emailResult.error,
    passwordError: passwordResult.error,
  };
}
