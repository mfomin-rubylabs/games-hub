import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { LayoutComponent } from '@/app/modules/layout'

interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.games' })

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
  }
}

const GamesLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return <LayoutComponent type='public'>{children}</LayoutComponent>
}

export default GamesLayout
