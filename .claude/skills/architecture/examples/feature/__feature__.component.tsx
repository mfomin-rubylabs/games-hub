// @ts-nocheck — template file; path aliases and types are illustrative only
'use client'

// example feature — scoped, single-concern client component
// features sit below widgets in FSD; they may be used by modules and widgets
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useSessionStore } from '@/app/shared/store/session.store'
import { useRouter } from '@/pkg/locale'
import { toastService } from '@/pkg/theme/services/toast.service'
import { Button } from '@/pkg/theme/ui/button'

interface IProps {
  itemId: number
  label: string
}

const ExampleFeatureComponent: FC<Readonly<IProps>> = (props) => {
  const { itemId, label } = props
  const t = useTranslations('feature')
  const router = useRouter()
  const user = useSessionStore((s) => s.user)

  const handleAction = async () => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    try {
      // call server action or mutation here
      console.log('action on', itemId)
      toastService.success(t('actionSuccess'))
    } catch {
      toastService.error(t('actionError'))
    }
  }

  return (
    <Button variant='outline' onClick={handleAction}>
      {label}
    </Button>
  )
}

export default ExampleFeatureComponent
