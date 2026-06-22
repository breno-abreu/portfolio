import { useState } from 'react'
import { Check, Copy, FileText, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const EMAIL = 'breno2601@gmail.com'

export type HomeContent = {
  name: string
  role: string
  location: string
  intro: string
  photoAlt: string
  githubLabel: string
  linkedinLabel: string
  emailLabel: string
  copyEmailLabel: string
  copiedEmailLabel: string
  resumeLabel: string
  resumeUnavailableLabel: string
}

type HomeSectionProps = {
  content: HomeContent
}

export function HomeSection({ content }: HomeSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(EMAIL)
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 1800)
  }

  return (
    <section id="home" className="page-section home-section" aria-labelledby="home-title">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)]">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            <MapPin className="size-4" aria-hidden="true" />
            {content.location}
          </p>

          <h1
            id="home-title"
            className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {content.name}
          </h1>
          <p className="mt-5 text-2xl font-medium text-amber-700 dark:text-amber-200">
            {content.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              className="hero-icon-button hero-button-primary"
              href="https://github.com/breno-abreu"
              target="_blank"
              rel="noreferrer"
              aria-label={content.githubLabel}
              title={content.githubLabel}
            >
              <FaGithub className="size-5" aria-hidden="true" />
            </a>
            <a
              className="hero-icon-button hero-button-secondary"
              href="https://www.linkedin.com/in/breno-abreu-37b610126/"
              target="_blank"
              rel="noreferrer"
              aria-label={content.linkedinLabel}
              title={content.linkedinLabel}
            >
              <FaLinkedinIn className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="hero-button hero-button-secondary disabled:cursor-not-allowed disabled:opacity-55"
              disabled
              aria-label={content.resumeUnavailableLabel}
            >
              <FileText className="size-5" aria-hidden="true" />
              {content.resumeLabel}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {content.emailLabel}:{' '}
              <span className="font-medium text-neutral-800 dark:text-neutral-100">
                {EMAIL}
              </span>
            </span>
            <button
              type="button"
              className="email-copy-button"
              onClick={handleCopyEmail}
              aria-label={copiedEmail ? content.copiedEmailLabel : content.copyEmailLabel}
              title={copiedEmail ? content.copiedEmailLabel : content.copyEmailLabel}
            >
              {copiedEmail ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
            </button>
            <span className="sr-only" aria-live="polite">
              {copiedEmail ? content.copiedEmailLabel : ''}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mr-0">
          <div className="absolute -inset-4 rounded-[2rem] bg-amber-500/15 blur-2xl dark:bg-amber-300/10" />
          <img
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-neutral-950/15 ring-1 ring-neutral-950/10 dark:shadow-black/40 dark:ring-white/10"
            src="/images/home-profile.jpg"
            alt={content.photoAlt}
          />
        </div>
      </div>
    </section>
  )
}
