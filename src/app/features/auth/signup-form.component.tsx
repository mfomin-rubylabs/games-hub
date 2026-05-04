'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { signUp } from '@/app/features/auth'
import { useSessionStore } from '@/app/shared/store'
import { Spinner } from '@/app/shared/ui/spinner'
import { useRouter } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { toastService } from '@/pkg/theme/services/toast.service'
import { Button } from '@/pkg/theme/ui/button'
import { Checkbox } from '@/pkg/theme/ui/checkbox'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'

import { createSignUpSchema, SignUpFormData } from './auth.schema'

interface IProps {}

const SignUpFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('register')
  const tValidation = useTranslations('validation')
  const tAuthErrors = useTranslations('authErrors')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const router = useRouter()
  const { setSession } = useSessionStore()

  const schema = useMemo(() => createSignUpSchema(tValidation), [tValidation])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    const response = await signUp(data)

    if (response.success) {
      setSession(response.data.accessToken, response.data.user)
      router.push('/games')
      return
    }

    toastService.error(tAuthErrors(response.code))
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='username'>
          {t('usernameLabel')}
        </Label>

        <Input
          type='text'
          id='username'
          placeholder={t('usernamePlaceholder')}
          className='rounded-sm'
          {...register('username')}
        />

        {errors.username && <p className='text-destructive text-sm'>{errors.username.message}</p>}
      </div>

      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='userEmail'>
          {t('emailLabel')}
        </Label>

        <Input
          type='email'
          id='userEmail'
          placeholder={t('emailPlaceholder')}
          {...register('email')}
          className='rounded-sm'
        />

        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='password'>
          {t('passwordLabel')}
        </Label>

        <div className='relative'>
          <Input
            id='password'
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={t('passwordPlaceholder')}
            className='rounded-sm pr-9'
            {...register('password')}
          />

          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}

            <span className='sr-only'>{isPasswordVisible ? t('hidePassword') : t('showPassword')}</span>
          </Button>
        </div>

        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='confirmPassword'>
          {t('confirmPasswordLabel')}
        </Label>

        <div className='relative'>
          <Input
            id='confirmPassword'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder={t('confirmPasswordPlaceholder')}
            className='rounded-sm pr-9'
            {...register('confirmPassword')}
          />

          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}

            <span className='sr-only'>{isConfirmPasswordVisible ? t('hidePassword') : t('showPassword')}</span>
          </Button>
        </div>

        {errors.confirmPassword && <p className='text-destructive text-sm'>{errors.confirmPassword.message}</p>}
      </div>

      <div className='flex items-center gap-3'>
        <Controller
          name='agreeToTerms'
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} className='rounded-sm' />
          )}
        />

        <Label htmlFor='rememberMe'>
          <span className='text-muted-foreground'>{t('agreeToTerms')}</span>
        </Label>
      </div>

      {errors.agreeToTerms && <p className='text-destructive text-sm'>{errors.agreeToTerms.message}</p>}

      <Button
        className={cn('w-full rounded-sm', isSubmitting ? 'opacity-50' : 'opacity-100')}
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner />}
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}

export default SignUpFormComponent
