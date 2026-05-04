'use client'

import { UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { signOut } from '@/app/features/auth'
import { useFavoritesStore, useSessionStore } from '@/app/shared/store'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

interface IProps {}

const UserButtonComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('userMenu')
  const user = useSessionStore((s) => s.user)
  const clearSession = useSessionStore((s) => s.clearSession)
  const clearFavorites = useFavoritesStore((s) => s.setFavorites)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='rounded-sm hover:cursor-pointer'>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40 rounded-xs'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>

          {user ? (
            <DropdownMenuItem
              onClick={() => {
                clearSession()
                clearFavorites([])
                signOut()
              }}
              className='hover:cursor-pointer'
            >
              {t('signOut')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link href='/sign-in'>{t('signIn')}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link href='/sign-up'>{t('signUp')}</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButtonComponent
