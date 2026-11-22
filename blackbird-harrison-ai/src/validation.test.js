import { validateEmail, validatePassword, validateForm } from './validation';

describe('validateEmail', () => {
  test('accepts a valid standard email', () => {
    expect(validateEmail('user@example.com')).toEqual({ isValid: true, error: '' });
  });

  test('accepts a valid email with subdomain and plus tag', () => {
    expect(validateEmail('first.last+tag@sub.domain.org')).toEqual({ isValid: true, error: '' });
  });

  test('rejects an empty email', () => {
    const result = validateEmail('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email is required.');
  });

  test('rejects a whitespace-only email', () => {
    const result = validateEmail('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email is required.');
  });

  test('rejects an email missing @ symbol', () => {
    const result = validateEmail('userexample.com');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Please enter a valid email address.');
  });

  test('rejects an email missing domain', () => {
    const result = validateEmail('user@');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Please enter a valid email address.');
  });

  test('rejects non-string input', () => {
    const result = validateEmail(null);
    expect(result.isValid).toBe(false);
  });
});

describe('validatePassword', () => {
  test('accepts a valid password meeting all requirements', () => {
    expect(validatePassword('StrongP@ss1')).toEqual({ isValid: true, error: '' });
  });

  test('accepts an exact 8-character valid password', () => {
    expect(validatePassword('Abcdef1!')).toEqual({ isValid: true, error: '' });
  });

  test('rejects an empty password', () => {
    const result = validatePassword('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password is required.');
  });

  test('rejects a password shorter than 8 characters', () => {
    const result = validatePassword('Ab1!xyz');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 8 characters');
  });

  test('rejects a password without an uppercase letter', () => {
    const result = validatePassword('abcdef1!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('both uppercase and lowercase letters');
  });

  test('rejects a password without a lowercase letter', () => {
    const result = validatePassword('ABCDEF1!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('both uppercase and lowercase letters');
  });

  test('rejects a password without a numerical digit', () => {
    const result = validatePassword('Abcdefg!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 1 number (0-9)');
  });

  test('rejects a password without a special character', () => {
    const result = validatePassword('Abcdefg1');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 1 special character');
  });

  test('rejects non-string input', () => {
    const result = validatePassword(undefined);
    expect(result.isValid).toBe(false);
  });
});

describe('validateForm', () => {
  test('returns valid when both email and password pass', () => {
    expect(validateForm('user@example.com', 'ValidP@ss1')).toEqual({
      isValid: true,
      emailError: '',
      passwordError: '',
    });
  });

  test('returns invalid with both errors when both fields fail', () => {
    const result = validateForm('invalid-email', 'weak');
    expect(result.isValid).toBe(false);
    expect(result.emailError).not.toBe('');
    expect(result.passwordError).not.toBe('');
  });

  test('returns invalid when only email fails', () => {
    const result = validateForm('bad-email', 'ValidP@ss1');
    expect(result.isValid).toBe(false);
    expect(result.emailError).not.toBe('');
    expect(result.passwordError).toBe('');
  });

  test('returns invalid when only password fails', () => {
    const result = validateForm('user@example.com', 'weakpass');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('');
    expect(result.passwordError).not.toBe('');
  });
});
