import { Timeline } from 'primereact/timeline'

export type JourneyItem = {
  period: string
  duration?: string
  title: string
  description: string
  linkHref?: string
  linkLabel?: string
  logoSrc?: string
  logoAlt?: string
}

export type JourneyContent = {
  title: string
  eyebrow: string
  items: JourneyItem[]
}

type JourneySectionProps = {
  content: JourneyContent
}

export function JourneySection({ content }: JourneySectionProps) {
  const markerTemplate = () => <span className="journey-marker" aria-hidden="true" />

  const dateTemplate = (item: JourneyItem, isMobile = false) => (
    <span className={isMobile ? 'journey-date-group journey-date-mobile' : 'journey-date-group'}>
      <span className="journey-date">{item.period}</span>
      {item.duration ? <span className="journey-duration">{item.duration}</span> : null}
    </span>
  )

  const oppositeTemplate = (item: JourneyItem) => dateTemplate(item)

  const contentTemplate = (item: JourneyItem) => (
    <article className="journey-card">
      {dateTemplate(item, true)}
      <div className="journey-card-header">
        {item.logoSrc ? (
          <span className="journey-logo-wrap">
            <img src={item.logoSrc} alt={item.logoAlt ?? ''} className="journey-logo" />
          </span>
        ) : null}
        <h3 className="text-xl font-semibold text-neutral-950">
          {item.title}
        </h3>
      </div>
      <p className="mt-3 leading-7 text-neutral-700">
        {item.description}
        {item.linkHref && item.linkLabel ? (
          <>
            {' '}
            <a className="journey-link" href={item.linkHref} target="_blank" rel="noreferrer">
              {item.linkLabel}
            </a>
          </>
        ) : null}
      </p>
    </article>
  )

  return (
    <section id="journey" className="page-section" aria-labelledby="journey-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="journey-title"
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <Timeline
          value={content.items}
          align="alternate"
          className="journey-prime-timeline"
          marker={markerTemplate}
          opposite={oppositeTemplate}
          content={contentTemplate}
        />
      </div>
    </section>
  )
}
