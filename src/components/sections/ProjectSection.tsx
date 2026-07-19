import { ExternalLink, Lock, Unlock } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { assetUrl } from '../../lib/assetUrl'

export type ProjectItem = {
  title: string
  description: string
  image: string
  imageAlt: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  demoLabel?: string
  isPrivate?: boolean
}

export type ProjectContent = {
  title: string
  eyebrow: string
  githubLabel: string
  demoLabel: string
  privateLabel: string
  openSourceLabel: string
  technologiesLabel: string
  items: ProjectItem[]
}

type ProjectSectionProps = {
  content: ProjectContent
}

export function ProjectSection({ content }: ProjectSectionProps) {
  return (
    <section id="project" className="page-section" aria-labelledby="project-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            {content.eyebrow}
          </p>
          <h2
            id="project-title"
            className="section-title mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 space-y-12">
          {content.items.map((project, index) => (
            <article
              key={project.title}
              className="project-card"
              data-reversed={index % 2 === 1}
            >
              <div className="project-image-wrap">
                <img className="project-image" src={assetUrl(project.image)} alt={project.imageAlt} />
              </div>

              <div className="project-content">
                <h3 className="text-2xl font-semibold text-neutral-950">
                  {project.title}
                </h3>
                {project.isPrivate ? (
                  <span className="project-private-badge mt-3">
                    <Lock className="size-3.5" aria-hidden="true" />
                    {content.privateLabel}
                  </span>
                ) : (
                  <span className="project-open-badge mt-3">
                    <Unlock className="size-3.5" aria-hidden="true" />
                    {content.openSourceLabel}
                  </span>
                )}
                <p className="mt-4 leading-7 text-neutral-700">
                  {project.description}
                </p>

                <div className="mt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                    {content.technologiesLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li key={technology} className="project-tech">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.githubUrl || project.demoUrl ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.githubUrl ? (
                      <a
                        className="hero-button hero-button-primary"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub className="size-5" aria-hidden="true" />
                        {content.githubLabel}
                      </a>
                    ) : null}
                    {project.demoUrl ? (
                      <a
                        className="hero-button hero-button-secondary"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="size-5" aria-hidden="true" />
                        {project.demoLabel ?? content.demoLabel}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
