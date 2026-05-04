'use client'

import { useLocale } from 'next-intl'
import { type FC, useTransition } from 'react'

import { routing, usePathname, useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/pkg/theme/ui/dropdown-menu'

interface IProps {}

const LocaleSwitcherComponent: FC<Readonly<IProps>> = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-sm text-xs uppercase hover:cursor-pointer'
          disabled={isPending}
        >
          {locale}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-24 rounded-xs'>
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className='uppercase hover:cursor-pointer'
            disabled={l === locale}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleSwitcherComponent
