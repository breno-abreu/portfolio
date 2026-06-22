type ArticleParagraph = {
  before: string
  title: string
  after: string
  href: string
  downloadLabel: string
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
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
            {content.eyebrow}
          </p>
          <h2 id="about-title" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="rounded-[2rem] border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          {content.paragraphs.map((paragraph) => (
            <p
              key={typeof paragraph === 'string' ? paragraph : paragraph.title}
              className="text-lg leading-8 text-neutral-700 not-first:mt-5 dark:text-neutral-300"
            >
              {typeof paragraph === 'string' ? (
                paragraph
              ) : (
                <>
                  {paragraph.before}
                  <a
                    className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-4 transition-colors hover:text-amber-900 dark:text-amber-300 dark:decoration-amber-500 dark:hover:text-amber-100"
                    href={paragraph.href}
                    download
                    aria-label={paragraph.downloadLabel}
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
