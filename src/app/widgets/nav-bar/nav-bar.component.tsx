'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Link } from '@/pkg/locale'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/pkg/theme/ui/navigation-menu'

import { LocaleSwitcherComponent, MobileMenuComponent, UserButtonComponent } from './elements'

interface IProps {}

const NavBarComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('nav')

  return (
    <div className='bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6'>
        {/* Brand */}
        <Link href='/' className='group flex items-center gap-2 rounded-sm'>
          <span className='font-heading text-sm font-semibold tracking-[0.18em] uppercase'>{t('brand')}</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList className='flex items-center justify-start gap-1'>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/' className='rounded-sm'>
                  {t('home')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/games' className='rounded-sm'>
                  {t('allGames')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link data-testid='nav-favorites-link' href='/games/favorites' className='rounded-sm'>
                  {t('favorites')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Controls */}
        <div className='hidden items-center gap-1 md:flex'>
          <LocaleSwitcherComponent />
          <UserButtonComponent />
        </div>

        {/* Mobile Menu */}
        <div className='flex items-center gap-1 md:hidden'>
          <LocaleSwitcherComponent />
          <MobileMenuComponent />
        </div>
      </div>
    </div>
  )
}

export default NavBarComponent
