import {
  FaCertificate,
  FaDatabase,
  FaDocker,
  FaGraduationCap,
  FaLanguage,
  FaUsers,
} from 'react-icons/fa'
import { SiJavascript, SiSap } from 'react-icons/si'
import type { IconType } from 'react-icons'

export type SkillIcon =
  | 'knowledge'
  | 'programming'
  | 'database'
  | 'agile'
  | 'certificate'
  | 'languages'
  | 'platforms'
  | 'deploy'
  | 'aiTools'

export type SkillItem = {
  title: string
  description: string
  icon: SkillIcon
  keywords: string[]
}

export type SkillsContent = {
  title: string
  eyebrow: string
  items: SkillItem[]
}

type SkillsSectionProps = {
  content: SkillsContent
}

const skillIcons: Partial<Record<SkillIcon, IconType>> = {
  knowledge: FaGraduationCap,
  programming: SiJavascript,
  database: FaDatabase,
  agile: FaUsers,
  certificate: FaCertificate,
  languages: FaLanguage,
  platforms: SiSap,
  deploy: FaDocker,
}

const brandIconSources: Partial<Record<SkillIcon, string>> = {
  aiTools: '/brand-icons/cursor.svg',
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className="page-section" aria-labelledby="skills-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="skills-title"
            className="section-title mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((skill) => {
            const Icon = skillIcons[skill.icon]
            const brandIcon = brandIconSources[skill.icon]

            return (
              <article key={skill.title} className="skill-card">
                <span className="skill-icon" data-skill-icon={skill.icon}>
                  {brandIcon ? (
                    <img className="skill-brand-icon" src={brandIcon} alt="" aria-hidden="true" />
                  ) : (
                    Icon && <Icon aria-hidden="true" />
                  )}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                  {skill.title}
                </h3>
                <p className="mt-3 leading-7 text-neutral-700">
                  {skill.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {skill.keywords.map((keyword) => (
                    <li key={keyword} className="skill-keyword">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
