'use client'

import { GamepadIcon, HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserPlusIcon } from 'lucide-react'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

interface IProps {}

const MobileMenuComponent: FC<Readonly<IProps>> = () => {
  const tNav = useTranslations('nav')
  const tUser = useTranslations('userMenu')
  const user = useSessionStore((s) => s.user)
  const clearSession = useSessionStore((s) => s.clearSession)
  const clearFavorites = useFavoritesStore((s) => s.setFavorites)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-sm'>
          <MenuIcon className='size-5' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{tNav('navigation')}</DropdownMenuLabel>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/'>
              <HomeIcon />
              {tNav('home')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/games'>
              <GamepadIcon />
              {tNav('allGames')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/games/favorites'>
              <HeartIcon />
              {tNav('favorites')}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{tUser('myAccount')}</DropdownMenuLabel>
          {user ? (
            <DropdownMenuItem
              onClick={() => {
                clearSession()
                clearFavorites([])
                signOut()
              }}
              className='cursor-pointer'
            >
              <LogOutIcon />
              {tUser('signOut')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/login'>
                  <LogInIcon />
                  {tUser('signIn')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/register'>
                  <UserPlusIcon />
                  {tUser('signUp')}
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenuComponent
