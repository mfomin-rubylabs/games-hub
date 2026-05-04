'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button } from '@/pkg/theme/ui/button'

interface IProps {
  message: string | undefined
  onRetry: () => void
}

const ErrorState: FC<Readonly<IProps>> = (props) => {
  const { message, onRetry } = props
  const t = useTranslations('state')

  return (
    <div className='py-10 text-center'>
      <p className='text-destructive'>
        {message === undefined ? t('errorGeneric') : t('errorWithMessage', { message })}
      </p>
      <Button className='rounded-sm' onClick={onRetry}>
        {t('retry')}
      </Button>
    </div>
  )
}

export default ErrorState
