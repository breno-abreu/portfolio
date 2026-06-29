import { Rocket, Sparkles } from 'lucide-react'

export type ValueItem = {
  title: string
  description: string
}

export type ValuesContent = {
  title: string
  eyebrow: string
  items: ValueItem[]
}

type ValuesSectionProps = {
  content: ValuesContent
}

export function ValuesSection({ content }: ValuesSectionProps) {
  const icons = [Sparkles, Rocket]

  return (
    <section id="values" className="page-section" aria-labelledby="values-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="values-title"
            className="section-title mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {content.items.map((item, index) => {
            const Icon = icons[index] ?? Sparkles

            return (
              <article key={item.title} className="value-card">
                <div className="value-card-heading">
                  <span className="value-icon">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-justify text-lg leading-8 text-neutral-700">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
