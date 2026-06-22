import { Moon, Sun } from 'lucide-react'
import type { Language, Theme } from '../App'

type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  language: Language
  theme: Theme
  text: Record<string, string>
  navItems: NavItem[]
  activeSection: string
  onLanguageChange: (language: Language) => void
  onThemeChange: (theme: Theme) => void
}

export function Navbar({
  language,
  theme,
  text,
  navItems,
  activeSection,
  onLanguageChange,
  onThemeChange,
}: NavbarProps) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const nextThemeText = nextTheme === 'dark' ? text.switchToDark : text.switchToLight
  const ThemeIcon = nextTheme === 'dark' ? Moon : Sun
  const languageOptions = [
    { code: 'pt' as const, label: text.switchToPortuguese },
    { code: 'en' as const, label: text.switchToEnglish },
  ]

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <a className="brand-link" href="#home" aria-label="Breno Abreu">
            Breno Abreu
          </a>

          <nav className="min-w-0 flex-1" aria-label="Navegacao principal">
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
          <button
            type="button"
            className="control-button"
            onClick={() => onThemeChange(nextTheme)}
            aria-label={`${text.themeLabel}: ${nextThemeText}`}
          >
            <ThemeIcon className="control-icon" size={18} strokeWidth={2} aria-hidden="true" />
            {nextThemeText}
          </button>
        </div>
      </div>
    </header>
  )
}
