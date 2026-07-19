import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type HobbyImage = {
  src: string
  alt: string
}

export type HobbyItem = {
  title: string
  description: string
  images: HobbyImage[]
}

export type HobbiesContent = {
  title: string
  eyebrow: string
  previousImageLabel: string
  nextImageLabel: string
  items: HobbyItem[]
}

type HobbiesSectionProps = {
  content: HobbiesContent
}

const AUTO_ADVANCE_MS = 4500
const SWIPE_THRESHOLD_PX = 40

function HobbyCard({
  hobby,
  previousImageLabel,
  nextImageLabel,
}: {
  hobby: HobbyItem
  previousImageLabel: string
  nextImageLabel: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const imageCount = hobby.images.length

  useEffect(() => {
    if (imageCount <= 1 || isPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % imageCount)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [imageCount, isPaused])

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount)
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % imageCount)
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    setIsPaused(true)
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null || touchStartY.current === null || imageCount <= 1) {
      setIsPaused(false)
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    touchStartX.current = null
    touchStartY.current = null
    setIsPaused(false)

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < Math.abs(deltaY)) {
      return
    }

    if (deltaX < 0) {
      goToNext()
      return
    }

    goToPrevious()
  }

  return (
    <article
      className="hobby-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="hobby-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hobby-carousel-viewport">
          {hobby.images.map((image, index) => (
            <div
              key={image.src}
              className="hobby-carousel-slide"
              data-active={index === activeIndex}
            >
              <img
                className="hobby-carousel-image-blur"
                src={image.src}
                alt=""
                aria-hidden="true"
                draggable={false}
              />
              <img
                className="hobby-carousel-image"
                src={image.src}
                alt={image.alt}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {imageCount > 1 ? (
          <>
            <button
              type="button"
              className="hobby-carousel-nav hobby-carousel-nav-prev"
              onClick={goToPrevious}
              aria-label={previousImageLabel}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hobby-carousel-nav hobby-carousel-nav-next"
              onClick={goToNext}
              aria-label={nextImageLabel}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}

        <div className="hobby-card-overlay">
          {imageCount > 1 ? (
            <div className="hobby-carousel-dots" role="tablist" aria-label={hobby.title}>
              {hobby.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  className="hobby-carousel-dot"
                  aria-label={`${index + 1} / ${imageCount}`}
                  aria-selected={index === activeIndex}
                  data-active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          ) : null}

          <div className="hobby-card-body">
            <h3>{hobby.title}</h3>
            <p>{hobby.description}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function HobbiesSection({ content }: HobbiesSectionProps) {
  return (
    <section id="hobbies" className="page-section" aria-labelledby="hobbies-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="hobbies-title"
            className="section-title mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {content.items.map((hobby) => (
            <HobbyCard
              key={hobby.title}
              hobby={hobby}
              previousImageLabel={content.previousImageLabel}
              nextImageLabel={content.nextImageLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
