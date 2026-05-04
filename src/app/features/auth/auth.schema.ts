import z from 'zod'

type Translator = (key: string) => string

export const createSignUpSchema = (t: Translator) =>
  z
    .object({
      username: z
        .string()
        .min(3, t('usernameMin'))
        .max(20, t('usernameMax'))
        .regex(/^[a-zA-Z0-9_]+$/, t('usernameChars')),

      email: z
        .string()
        .min(1, t('emailRequired'))
        .pipe(z.email(t('emailInvalid'))),

      password: z
        .string()
        .min(8, t('passwordMin'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/[0-9]/, t('passwordNumber')),

      confirmPassword: z.string().min(1, t('confirmRequired')),

      agreeToTerms: z.boolean().refine((value) => value === true, {
        message: t('termsRequired'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    })

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>

export const createSignInSchema = (t: Translator) =>
  z.object({
    email: z
      .string()
      .min(1, t('emailRequired'))
      .pipe(z.email(t('emailInvalid'))),
    password: z.string().min(8, t('passwordMin')),
  })

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>
