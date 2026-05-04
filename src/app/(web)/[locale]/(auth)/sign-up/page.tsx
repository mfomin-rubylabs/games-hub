import { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

import { SignUpModule } from '@/app/modules/sign-up'

interface IProps {
  params: Promise<{ locale: string }>
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.register' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const Page: NextPage<Readonly<IProps>> = () => {
  return <SignUpModule />
}

export default Page
