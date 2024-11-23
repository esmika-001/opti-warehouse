import * as z from 'zod';

export const useSignupSchema = () => {
  return z.object({
    name: z
      .string()
      .min(1, { message: 'First Name is required' })
      .regex(/^[A-Za-z]*$/, { message: 'Only alphabetic characters are allowed' })
      .max(50, { message: 'First Name must be less than 50 characters' }),

    last_name: z
      .string()
      .min(1, { message: 'Last Name is required' })
      .regex(/^[A-Za-z]*$/, { message: 'Only alphabetic characters are allowed' })
      .max(50, { message: 'Last Name must be less than 50 characters' }),

    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid Email' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/, { message: 'Password must include letters, numbers, and special characters' })
      .max(50, { message: 'Password must be less than 50 characters' }),

    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/, { message: 'Password must include letters, numbers, and special characters' })
      .max(50, { message: 'Confirm Password must be less than 50 characters' }),
    //   .refine(({value, ctx}:any) => {
    //     if (value !== ctx.parent.password) {
    //       return false;
    //     }
    //     return true;
    //   }, { message: "Password and Confirm Password didn't match" }),
    // .refine(({value, ctx}:any) => {
    //     // Access the parent value directly by using `ctx.parent`
    //     const { password } = ctx.parent as any;
    //     return value === password;
    //   }, { message: "Password and Confirm Password didn't match" }),

    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .regex(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]*$/, { message: 'No spaces allowed. Only letters, numbers, and special characters are allowed.' })
      .min(6, { message: 'Username must be at least 6 characters long' })
      .max(50, { message: 'Username must be less than 50 characters' }),

    tnc: z.boolean().refine(value => value === true, {
      message: 'You must accept the Terms and Conditions',
    }),
  });
};

export type SignupSchema = z.infer<ReturnType<typeof useSignupSchema>>;
