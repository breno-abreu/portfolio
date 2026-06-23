import { useState } from 'react'
import { X } from 'lucide-react'
import { Galleria } from 'primereact/galleria'

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
  openGalleryLabel: string
  closeGalleryLabel: string
  items: HobbyItem[]
}

type HobbiesSectionProps = {
  content: HobbiesContent
}

const galleriaResponsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 3,
  },
]

export function HobbiesSection({ content }: HobbiesSectionProps) {
  const [activeHobbyIndex, setActiveHobbyIndex] = useState<number | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeHobby = activeHobbyIndex === null ? null : content.items[activeHobbyIndex]

  function openGallery(index: number) {
    setActiveHobbyIndex(index)
    setActiveImageIndex(0)
  }

  const imageTemplate = (image: HobbyImage) => (
    <img className="hobby-gallery-image" src={image.src} alt={image.alt} />
  )

  const thumbnailTemplate = (image: HobbyImage) => (
    <img className="hobby-gallery-thumbnail" src={image.src} alt="" aria-hidden="true" />
  )

  return (
    <section id="hobbies" className="page-section" aria-labelledby="hobbies-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="hobbies-title"
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {content.items.map((hobby, hobbyIndex) => (
            <article key={hobby.title} className="hobby-card">
              <button
                type="button"
                className="hobby-photo-stack"
                onClick={() => openGallery(hobbyIndex)}
                aria-label={`${content.openGalleryLabel}: ${hobby.title}`}
              >
                {hobby.images.slice(0, 3).map((image, index) => (
                  <img
                    key={image.src}
                    className="hobby-photo"
                    src={image.src}
                    alt={image.alt}
                    data-index={index}
                  />
                ))}
              </button>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-neutral-950">
                  {hobby.title}
                </h3>
                <p className="mt-4 leading-7 text-neutral-700">
                  {hobby.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeHobby ? (
        <div
          className="hobby-gallery-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={activeHobby.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveHobbyIndex(null)
            }
          }}
        >
          <div className="hobby-gallery-panel">
            <button
              type="button"
              className="hobby-gallery-close"
              onClick={() => setActiveHobbyIndex(null)}
              aria-label={content.closeGalleryLabel}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <Galleria
              value={activeHobby.images}
              activeIndex={activeImageIndex}
              onItemChange={(event) => setActiveImageIndex(event.index)}
              responsiveOptions={galleriaResponsiveOptions}
              numVisible={5}
              circular
              showItemNavigators
              item={imageTemplate}
              thumbnail={thumbnailTemplate}
              style={{ width: '100%', maxWidth: '760px' }}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
