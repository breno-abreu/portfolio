import { useState } from 'react'
import { Check, Copy, FileText, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const EMAIL = 'breno2601@gmail.com'

export type ContactContent = {
  title: string
  eyebrow: string
  description: string
  githubLabel: string
  linkedinLabel: string
  emailLabel: string
  copyEmailLabel: string
  copiedEmailLabel: string
  resumeLabel: string
  resumeUrl: string
}

type ContactSectionProps = {
  content: ContactContent
}

export function ContactSection({ content }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(EMAIL)
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 1800)
  }

  return (
    <section id="contact" className="page-section" aria-labelledby="contact-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="contact-card">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
              {content.eyebrow}
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              {content.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
            <Mail className="size-4 text-green-700" aria-hidden="true" />
            <span>
              {content.emailLabel}:{' '}
              <span className="font-medium text-neutral-900">
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
      </div>
    </section>
  )
}
