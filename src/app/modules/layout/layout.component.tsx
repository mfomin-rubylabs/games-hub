import { type FC, type ReactNode } from 'react'

import { NavBarComponent } from '@/app/widgets/nav-bar'

// interface
interface IProps {
  children: ReactNode
  type: 'public' | 'protected'
}

// component
const LayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children, type } = props

  // render
  return (
    <div className='relative z-0'>
      {type === 'public' && <NavBarComponent />}

      {children}
    </div>
  )
}

export default LayoutComponent
