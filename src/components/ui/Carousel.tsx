'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type CarouselProps = {
    images: { src: string; alt: string }[]
    type?: 'preview' | 'edit'
    onDelete?: (src: string) => Promise<void>
}

const Carousel = ({ images, type = 'preview', onDelete }: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }) // Changed to false for edit mode
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    return (
        <div className="relative w-full group">
            <div className="overflow-hidden rounded-xl border border-border bg-surface" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {images.map((image, index) => (
                        <div key={index} className="relative flex-[0_0_100%] min-w-0">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority={index === 0}
                                />
                            </div>

                            {type === 'edit' && onDelete && (
                                <button
                                    type="button"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        await onDelete(image.src)
                                    }}
                                    className="absolute right-3 top-3 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-danger hover:text-white cursor-pointer"
                                    aria-label="Remove image"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                type='button'
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-text-muted opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:text-accent border border-border cursor-pointer hidden sm:flex z-30"
                aria-label="Previous slide"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                type='button'
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-text-muted opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:text-accent border border-border cursor-pointer hidden sm:flex z-30"
                aria-label="Next slide"
            >
                <ChevronRight size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                {images.map((_, index) => (
                    <button
                        type='button'
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${index === selectedIndex
                            ? 'bg-accent w-4'
                            : 'bg-black/50 hover:bg-accent/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel