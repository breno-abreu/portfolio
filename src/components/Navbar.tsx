import {
  BriefcaseBusiness,
  Code2,
  Compass,
  Heart,
  Home,
  Mail,
  Menu,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Language } from '../App'

type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  language: Language
  text: Record<string, string>
  navItems: NavItem[]
  activeSection: string
  onLanguageChange: (language: Language) => void
  onNavItemClick: (sectionId: string) => void
}

const mobileNavIcons: Record<string, LucideIcon> = {
  '#home': Home,
  '#about': UserRound,
  '#journey': Compass,
  '#project': BriefcaseBusiness,
  '#skills': Code2,
  '#hobbies': Heart,
  '#values': Sparkles,
  '#contact': Mail,
}

export function Navbar({
  language,
  text,
  navItems,
  activeSection,
  onLanguageChange,
  onNavItemClick,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const languageOptions = [
    { code: 'pt' as const, label: text.switchToPortuguese },
    { code: 'en' as const, label: text.switchToEnglish },
  ]

  function handleNavClick(sectionId: string) {
    onNavItemClick(sectionId)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        mobileMenuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return
      }

      setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isMenuOpen])

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <a
            className="brand-link"
            href="#home"
            aria-label="Breno Abreu"
            onClick={() => handleNavClick('home')}
          >
            Breno Abreu
          </a>

          <nav className="desktop-nav" aria-label="Navegacao principal">
            <ul className="nav-list">
              {navItems.map((item) => {
                const isActive = item.href === `#${activeSection}`

                return (
                  <li key={item.href}>
                    <a
                      className="nav-link"
                      href={item.href}
                      data-active={isActive}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => handleNavClick(item.href.replace('#', ''))}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="navbar-actions" aria-label="Preferencias da pagina">
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>

          <div className="language-switcher" aria-label={text.languageLabel}>
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className="language-button"
                data-active={language === option.code}
                onClick={() => onLanguageChange(option.code)}
                aria-label={`${text.languageLabel}: ${option.label}`}
                aria-pressed={language === option.code}
              >
                <img
                  src={`/flags/${option.code}.svg`}
                  className="language-flag"
                  width="28"
                  height="20"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          ref={mobileMenuRef}
          id="mobile-navigation"
          className="mobile-nav-panel"
          aria-label="Navegacao mobile"
        >
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const isActive = item.href === `#${activeSection}`
              const Icon = mobileNavIcons[item.href] ?? Compass

              return (
                <li key={item.href}>
                  <a
                    className="mobile-nav-link"
                    href={item.href}
                    data-active={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleNavClick(item.href.replace('#', ''))}
                  >
                    <Icon className="mobile-nav-icon" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
