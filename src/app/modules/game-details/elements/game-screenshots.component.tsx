'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { type FC, useCallback, useEffect, useState } from 'react'

import { Button } from '@/pkg/theme/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/pkg/theme/ui/carousel'
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from '@/pkg/theme/ui/dialog'

interface IProps {
  screenshots: string[]
}

const GameScreenshotsComponent: FC<Readonly<IProps>> = (props) => {
  const { screenshots } = props
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : i === 0 ? screenshots.length - 1 : i - 1)),
    [screenshots.length],
  )

  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : i === screenshots.length - 1 ? 0 : i + 1)),
    [screenshots.length],
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prev, next])

  return (
    <>
      <Carousel
        opts={{ loop: true, duration: 18 }}
        className='animate-in fade-in-0 slide-in-from-bottom-2 overflow-hidden rounded-sm border shadow-md duration-300'
      >
        <CarouselContent className='ml-0'>
          {screenshots.map((src, i) => (
            <CarouselItem key={i} className='cursor-zoom-in pl-0' onClick={() => setLightboxIndex(i)}>
              <div className='relative aspect-video w-full'>
                <div className='bg-muted absolute inset-0 animate-pulse' />
                <Image src={src} alt={`Screenshot ${i + 1}`} fill loading='eager' className='object-cover' />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='left-4 -mt-5 size-10 translate-y-0 rounded-sm border border-white/20 bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 hover:text-white disabled:opacity-0' />
        <CarouselNext className='right-4 -mt-5 size-10 translate-y-0 rounded-sm border border-white/20 bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 hover:text-white disabled:opacity-0' />
      </Carousel>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogPortal>
          <DialogOverlay className='bg-black/95' />

          <DialogContent
            showCloseButton={false}
            aria-describedby={undefined}
            className='flex h-full max-w-none flex-col items-center justify-center gap-0 rounded-none border-none bg-transparent p-4 ring-0 sm:max-w-none md:p-8'
            onClick={() => setLightboxIndex(null)}
          >
            <DialogTitle className='sr-only'>Screenshot viewer</DialogTitle>
            {lightboxIndex !== null && (
              <div className='flex w-full max-w-5xl flex-col gap-4' onClick={(e) => e.stopPropagation()}>
                {/* Top bar */}
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-white/50 tabular-nums'>
                    {lightboxIndex + 1} / {screenshots.length}
                  </span>
                  <DialogClose asChild>
                    <button className='cursor-pointer rounded-sm p-1 text-white/60 transition-colors hover:text-white'>
                      <X className='h-5 w-5' />
                    </button>
                  </DialogClose>
                </div>

                {/* Image */}
                <div className='relative aspect-video w-full overflow-hidden rounded-sm'>
                  <Image
                    src={screenshots[lightboxIndex]}
                    alt={`Screenshot ${lightboxIndex + 1}`}
                    fill
                    priority
                    className='object-contain'
                  />

                  <Button
                    onClick={prev}
                    size='icon'
                    className='absolute top-1/2 left-3 -mt-5 size-10 cursor-pointer rounded-sm border border-white/20 bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 hover:text-white'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </Button>

                  <Button
                    onClick={next}
                    size='icon'
                    className='absolute top-1/2 right-3 -mt-5 size-10 cursor-pointer rounded-sm border border-white/20 bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 hover:text-white'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default GameScreenshotsComponent
