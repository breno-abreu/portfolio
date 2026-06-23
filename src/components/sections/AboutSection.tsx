type ArticleParagraph = {
  before: string
  title: string
  after: string
  href: string
  linkLabel: string
}

export type AboutContent = {
  title: string
  eyebrow: string
  paragraphs: Array<string | ArticleParagraph>
}

type AboutSectionProps = {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="page-section" aria-labelledby="about-title">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.42fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2 id="about-title" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="about-card">
          {content.paragraphs.map((paragraph) => (
            <p
              key={typeof paragraph === 'string' ? paragraph : paragraph.title}
              className="text-lg leading-8 text-neutral-700 not-first:mt-5"
            >
              {typeof paragraph === 'string' ? (
                paragraph
              ) : (
                <>
                  {paragraph.before}
                  <a
                    className="font-medium text-green-700 underline decoration-green-300 underline-offset-4 transition-colors hover:text-green-900"
                    href={paragraph.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={paragraph.linkLabel}
                  >
                    {paragraph.title}
                  </a>
                  {paragraph.after}
                </>
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
