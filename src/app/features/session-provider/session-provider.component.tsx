'use client'

import { type FC, type ReactNode, useEffect } from 'react'

import { refreshSession } from '@/app/entities/api/session'
import { useSessionStore } from '@/app/shared/store/session.store'
import { SESSION_HINT_COOKIE } from '@/pkg/jwt'

interface IProps {
  children: ReactNode
}

const hasSessionHint = () =>
  typeof document !== 'undefined' && document.cookie.split('; ').some((c) => c.startsWith(`${SESSION_HINT_COOKIE}=`))

const SessionProviderComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  const { setSession, setInitialised } = useSessionStore()

  useEffect(() => {
    if (!hasSessionHint()) {
      setInitialised()
      return
    }

    refreshSession().then((result) => {
      if (result.success) {
        setSession(result.accessToken, result.user)
      }
      setInitialised()
    })
  }, [setSession, setInitialised])

  return <>{children}</>
}

export default SessionProviderComponent
