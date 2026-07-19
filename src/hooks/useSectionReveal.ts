import { useEffect } from 'react'

export function useSectionReveal() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.page-section:not(.home-section)'),
    )

    if (sections.length === 0) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add('is-revealed'))
      return
    }

    const reveal = (section: Element) => {
      section.classList.add('is-revealed')
    }

    // Tall sections (Projects, Journey) can never reach a high intersection
    // ratio on mobile, so we reveal as soon as any part enters the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          reveal(entry.target)
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0

      if (alreadyVisible) {
        reveal(section)
        return
      }

      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])
}
