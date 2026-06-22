import { Timeline } from 'primereact/timeline'

export type JourneyItem = {
  period: string
  title: string
  description: string
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

  const oppositeTemplate = (item: JourneyItem) => (
    <span className="journey-date">{item.period}</span>
  )

  const contentTemplate = (item: JourneyItem) => (
    <article className="journey-card">
      <span className="journey-date journey-date-mobile">{item.period}</span>
      <h3 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
        {item.title}
      </h3>
      <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">
        {item.description}
      </p>
    </article>
  )

  return (
    <section id="journey" className="page-section" aria-labelledby="journey-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700 dark:text-violet-300">
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
