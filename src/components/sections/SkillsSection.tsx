import {
  FaCertificate,
  FaDatabase,
  FaDocker,
  FaGlobeAmericas,
  FaGraduationCap,
  FaLanguage,
  FaUsers,
} from 'react-icons/fa'
import { SiHtml5, SiJavascript, SiSap } from 'react-icons/si'
import type { IconType } from 'react-icons'

export type SkillIcon =
  | 'knowledge'
  | 'programming'
  | 'web'
  | 'database'
  | 'celonis'
  | 'agile'
  | 'sap'
  | 'certificate'
  | 'portuguese'
  | 'english'
  | 'deploy'
  | 'aiTools'

export type SkillItem = {
  title: string
  description: string
  icon: SkillIcon
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
  web: SiHtml5,
  database: FaDatabase,
  agile: FaUsers,
  sap: SiSap,
  certificate: FaCertificate,
  portuguese: FaGlobeAmericas,
  english: FaLanguage,
  deploy: FaDocker,
}

const brandIconSources: Partial<Record<SkillIcon, string>> = {
  celonis: '/brand-icons/celonis.svg',
  aiTools: '/brand-icons/cursor.svg',
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className="page-section" aria-labelledby="skills-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
            {content.eyebrow}
          </p>
          <h2
            id="skills-title"
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
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
                <span className="skill-icon">
                  {brandIcon ? (
                    <img className="skill-brand-icon" src={brandIcon} alt="" aria-hidden="true" />
                  ) : (
                    Icon && <Icon aria-hidden="true" />
                  )}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                  {skill.title}
                </h3>
                <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">
                  {skill.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
