// @ts-nocheck — template file; path aliases and types are illustrative only
// example module — server component; copy, rename files and exports to match your feature
// based on sign.component.tsx from the supervisor template (apps/client)
import { type FC } from 'react'
import { getTranslations } from 'next-intl/server'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

import { ExampleElementComponent } from './elements/__element__.component'

// props declared as interface — never inline, never type alias
interface IProps {
  variant: 'type-a' | 'type-b'
}

// server component — no 'use client' unless strictly needed
const ExampleModule: FC<Readonly<IProps>> = async (props) => {
  const { variant } = props
  const t = await getTranslations('example')

  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md rounded-sm shadow-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='font-heading text-2xl'>
            {variant === 'type-a' ? t('titleA') : t('titleB')}
          </CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <ExampleElementComponent variant={variant} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ExampleModule
