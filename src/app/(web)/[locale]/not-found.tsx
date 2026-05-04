import { CompassIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

interface IProps {}

const NotFound: FC<Readonly<IProps>> = async () => {
  const t = await getTranslations('notFound.generic')

  return (
    <div className='flex min-h-screen flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center'>
      <div className='bg-muted flex h-20 w-20 items-center justify-center rounded-full'>
        <CompassIcon className='text-muted-foreground h-10 w-10' />
      </div>

      <div className='space-y-2'>
        <p className='text-muted-foreground font-mono text-sm tracking-widest'>{t('code')}</p>

        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground max-w-md text-sm'>{t('description')}</p>
      </div>

      <Button asChild className='rounded-sm'>
        <Link href='/'>{t('backHome')}</Link>
      </Button>
    </div>
  )
}

export default NotFound
