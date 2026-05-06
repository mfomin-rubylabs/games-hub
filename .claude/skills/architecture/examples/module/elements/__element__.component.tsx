// @ts-nocheck — template file; path aliases and types are illustrative only
'use client'

// example element — client sub-component used only within this module
// based on sign-in-form.component.tsx from the supervisor template (apps/client)
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useRouter } from '@/pkg/locale'
import { toastService } from '@/pkg/theme/services/toast.service'
import { Button } from '@/pkg/theme/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/pkg/theme/ui/form'
import { Input } from '@/pkg/theme/ui/input'

// props declared as interface — always IProps, always Readonly on FC
interface IProps {
  variant: 'type-a' | 'type-b'
}

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

const ExampleElementComponent: FC<Readonly<IProps>> = (props) => {
  const { variant } = props
  const t = useTranslations('example')
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // call a server action or API here
      console.log(data, variant)
      router.push('/games')
    } catch {
      toastService.error(t('unexpectedError'))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
          {t('submit')}
        </Button>
      </form>
    </Form>
  )
}

export default ExampleElementComponent
