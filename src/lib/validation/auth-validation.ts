import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(8, { message: 'Password minimum length 8 Character' })
    .nonempty({ message: 'Password is required' }),
});

export const getPasswordStrength = (password: string) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  Object.values(checks).forEach((check) => check && score++);

  return {
    score,
    checks,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
  };
};
