'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toastService } from '@/pkg/theme/services/toast.service'

import { zodResolver } from '@hookform/resolvers/zod'

import { useSessionStore } from '@/app/shared/store'
import { Spinner } from '@/app/shared/ui/spinner'
import { useRouter } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button } from '@/pkg/theme/ui/button'
import { Checkbox } from '@/pkg/theme/ui/checkbox'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'

import { createSignInSchema, SignInFormData } from './auth.schema'
import { signIn } from './auth.service'

interface IProps {}

const SignInFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('login')
  const tValidation = useTranslations('validation')
  const tAuthErrors = useTranslations('authErrors')

  const router = useRouter()
  const { setSession } = useSessionStore()
  const [isVisible, setIsVisible] = useState(false)

  const schema = useMemo(() => createSignInSchema(tValidation), [tValidation])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: SignInFormData) => {
    const response = await signIn(data)

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
        <Label htmlFor='userEmail' className='leading-5'>
          {t('emailLabel')}
        </Label>

        <Input
          type='email'
          id='userEmail'
          placeholder={t('emailPlaceholder')}
          className='rounded-sm'
          {...register('email')}
        />

        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='w-full space-y-1'>
        <Label htmlFor='password' className='leading-5'>
          {t('passwordLabel')}
        </Label>

        <div className='relative'>
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder={t('passwordPlaceholder')}
            className='rounded-sm pr-9'
            {...register('password')}
          />

          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible((prevState) => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}

            <span className='sr-only'>{isVisible ? t('hidePassword') : t('showPassword')}</span>
          </Button>
        </div>

        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      <div className='flex items-center justify-between gap-y-2'>
        <div className='flex items-center gap-3'>
          <Checkbox id='rememberMe' className='size-6 rounded-sm' />

          <Label htmlFor='rememberMe' className='text-muted-foreground'>
            {t('rememberMe')}
          </Label>
        </div>

        <a href='#' className='hover:underline'>
          {t('forgotPassword')}
        </a>
      </div>

      <Button className={cn('w-full rounded-sm', isSubmitting && 'opacity-50')} type='submit' disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}

export default SignInFormComponent
