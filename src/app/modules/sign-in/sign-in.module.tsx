import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { SignInFormComponent } from '@/app/features/auth'
import { Card } from '@/pkg/theme/ui/card'

interface IProps {}

const SignInModule: FC<Readonly<IProps>> = async () => {
  const t = await getTranslations('login')

  return (
    <div className='relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-60'
        style={{
          background:
            'radial-gradient(55% 55% at 50% 0%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)',
        }}
      />

      <Card className='bg-card w-full max-w-md rounded-sm border p-8 shadow-lg sm:p-10'>
        {/* Header */}
        <div className='mb-8 space-y-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-foreground h-px w-6' />
            <span className='text-muted-foreground text-[11px] font-medium tracking-[0.25em] uppercase'>
              {t('kicker')}
            </span>
          </div>

          <h1 className='font-heading text-2xl font-semibold tracking-tight sm:text-3xl'>{t('heading')}</h1>

          <p className='text-muted-foreground text-sm'>{t('subheading')}</p>
        </div>

        {/* Form */}
        <SignInFormComponent />
      </Card>
    </div>
  )
}

export default SignInModule
