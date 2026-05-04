import { type FC, type ReactNode } from 'react'

import { LayoutComponent } from '@/app/modules/layout'

interface IProps {
  children: ReactNode
}

const AuthLayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return <LayoutComponent type='public'>{children}</LayoutComponent>
}

export default AuthLayoutComponent
