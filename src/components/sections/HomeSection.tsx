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
  resumeUrl: string
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
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-800 bg-gradient-to-r from-green-700 to-green-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
            <MapPin className="size-4" aria-hidden="true" />
            {content.location}
          </p>

          <h1
            id="home-title"
            className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {content.name}
          </h1>
          <p className="mt-5 text-2xl font-medium text-green-700">
            {content.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
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
            <a
              className="hero-button hero-button-secondary"
              href={content.resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={content.resumeLabel}
            >
              <FileText className="size-5" aria-hidden="true" />
              {content.resumeLabel}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            <span>
              {content.emailLabel}:{' '}
              <span className="font-medium text-neutral-800">
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

        <div className="group relative mx-auto w-full max-w-md transition duration-500 hover:-translate-y-1 focus-within:-translate-y-1 lg:mr-0">
          <div className="absolute -inset-5 rounded-[2rem] bg-neutral-500/20 blur-3xl transition duration-500 group-hover:bg-neutral-500/25 group-hover:blur-[2.5rem]" />
          <img
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-neutral-950/25 ring-1 ring-neutral-950/10 transition duration-500 group-hover:scale-[1.015] group-hover:shadow-neutral-950/30"
            src="/images/home-profile.jpg"
            alt={content.photoAlt}
          />
        </div>
      </div>
    </section>
  )
}
