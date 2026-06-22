import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { AboutSection } from './components/sections/AboutSection'
import type { AboutContent } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HobbiesSection } from './components/sections/HobbiesSection'
import type { HobbiesContent } from './components/sections/HobbiesSection'
import { HomeSection } from './components/sections/HomeSection'
import type { HomeContent } from './components/sections/HomeSection'
import { JourneySection } from './components/sections/JourneySection'
import type { JourneyContent } from './components/sections/JourneySection'
import { ProjectSection } from './components/sections/ProjectSection'
import type { ProjectContent } from './components/sections/ProjectSection'
import { SkillsSection } from './components/sections/SkillsSection'
import type { SkillsContent } from './components/sections/SkillsSection'
import { ValuesSection } from './components/sections/ValuesSection'

export type Language = 'pt' | 'en'
export type Theme = 'light' | 'dark'

const LANGUAGE_STORAGE_KEY = 'portfolio:language'
const THEME_STORAGE_KEY = 'portfolio:theme'
const EXPERIENCE_START_YEAR = 2023

const copy = {
  pt: {
    languageLabel: 'Idioma',
    themeLabel: 'Tema',
    switchToEnglish: 'English',
    switchToPortuguese: 'Português',
    switchToDark: 'Modo escuro',
    switchToLight: 'Modo claro',
    skipToContent: 'Pular para o conteúdo',
  },
  en: {
    languageLabel: 'Language',
    themeLabel: 'Theme',
    switchToEnglish: 'English',
    switchToPortuguese: 'Português',
    switchToDark: 'Dark mode',
    switchToLight: 'Light mode',
    skipToContent: 'Skip to content',
  },
} satisfies Record<Language, Record<string, string>>

const navItems = {
  pt: [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Trajetória', href: '#journey' },
    { label: 'Projetos', href: '#project' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Valores', href: '#values' },
    { label: 'Contato', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Project', href: '#project' },
    { label: 'Skills', href: '#skills' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Values', href: '#values' },
    { label: 'Contact', href: '#contact' },
  ],
} satisfies Record<Language, Array<{ label: string; href: string }>>

const homeContent = {
  pt: {
    name: 'Breno Abreu',
    role: 'Desenvolvedor Fullstack',
    location: 'Curitiba, PR, Brasil',
    intro:
      'Olá! Me chamo Breno e desenvolvo aplicações web completas, do frontend ao backend, focadas em simplicidade, performance e experiência do usuário.',
    photoAlt: 'Foto genérica de perfil que será substituída pela foto de Breno Abreu',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copiar email',
    copiedEmailLabel: 'Email copiado',
    resumeLabel: 'Currículo',
    resumeUnavailableLabel: 'Currículo ainda indisponível',
  },
  en: {
    name: 'Breno Abreu',
    role: 'Fullstack Developer',
    location: 'Curitiba, PR, Brazil',
    intro:
      'Hi! My name is Breno and I build complete web applications, from frontend to backend, focused on simplicity, performance, and user experience.',
    photoAlt: "Generic profile photo that will be replaced by Breno Abreu's photo",
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copy email',
    copiedEmailLabel: 'Email copied',
    resumeLabel: 'Resume',
    resumeUnavailableLabel: 'Resume is not available yet',
  },
} satisfies Record<Language, HomeContent>

function getExperienceYears() {
  return Math.max(new Date().getFullYear() - EXPERIENCE_START_YEAR, 0)
}

function getAboutContent(experienceYears: number): Record<Language, AboutContent> {
  const yearsPt =
    experienceYears === 1 ? '1 ano' : `${experienceYears} anos`
  const yearsEn =
    experienceYears === 1 ? '1 year' : `${experienceYears} years`

  return {
    pt: {
      title: 'Sobre',
      eyebrow: 'Quem sou',
      paragraphs: [
        `Sou formado em Bacharelado em Sistemas de Informação pela UTFPR. Tenho mais de ${yearsPt} de experiência profissional em desenvolvimento Web Full Stack, Automação Robótica de Processos (RPA), e Engenharia de Dados utilizando as linguagens C# com ASP.NET, Javascript com Vue.js, SQL e VBA e a plataforma Celonis EMS; além de ter utilizado a linguagem Python em projetos de Ciência de Dados.`,
        {
          before:
            'Em 2024 ganhei o prêmio de melhor artigo na categoria Pesquisa na ERBD 2024 com o trabalho “',
          title:
            'Detecção de Fraudes em Licitações Públicas: Uma Comparação de Modelos de Detecção de Anomalias',
          after:
            '”. O trabalho foi apresentado no 39º SBBD, o principal evento em Ciência de Dados e Big Data da América Latina.',
          href: '/documents/deteccao-fraudes-licitacoes-publicas.pdf',
          downloadLabel:
            'Baixar PDF do artigo Detecção de Fraudes em Licitações Públicas: Uma Comparação de Modelos de Detecção de Anomalias',
        },
        'Tenho boa autonomia e gosto pelo aprendizado. Possuo inglês avançado e experiência colaborando com equipes globais.',
      ],
    },
    en: {
      title: 'About',
      eyebrow: 'Who I am',
      paragraphs: [
        `I hold a Bachelor's degree in Information Systems from UTFPR. I have over ${yearsEn} of professional experience in Full Stack Web development, Robotic Process Automation (RPA), and Data Engineering using C# with ASP.NET, JavaScript with Vue.js, SQL, VBA, and the Celonis EMS platform; I have also used Python in Data Science projects.`,
        {
          before:
            'In 2024, I won the best paper award in the Research category at ERBD 2024 with the work “',
          title:
            'Fraud Detection in Public Procurement: A Comparison of Anomaly Detection Models',
          after:
            '”. The work was presented at the 39th SBBD, the leading Data Science and Big Data event in Latin America.',
          href: '/documents/deteccao-fraudes-licitacoes-publicas.pdf',
          downloadLabel:
            'Download PDF of the paper Fraud Detection in Public Procurement: A Comparison of Anomaly Detection Models',
        },
        'I have strong autonomy and enjoy learning. I have advanced English skills and experience collaborating with global teams.',
      ],
    },
  }
}

const journeyContent = {
  pt: {
    title: 'Trajetória',
    eyebrow: 'Linha do tempo',
    items: [
      {
        period: 'Janeiro 2018',
        title: 'Ingresso na UTFPR',
        description: 'Ingressei no curso de Bacharelado em Sistemas de Informação na UTFPR.',
      },
      {
        period: 'Dezembro 2020 - Fevereiro 2021',
        title: 'Banco de dados para a APRE',
        description: 'Desenvolvi um banco de dados para a APRE.',
      },
      {
        period: 'Dezembro 2021',
        title: 'Estágio na Rhodia Brasil',
        description:
          'Comecei a trabalhar como estagiário na Rhodia Brasil (Grupo Solvay), atuando como desenvolvedor de RPAs.',
      },
      {
        period: 'Julho 2023',
        title: 'Process Mining e Engenharia de Dados',
        description:
          'Ainda na Rhodia Brasil e como estagiário, comecei a trabalhar na equipe de Process Mining como engenheiro de dados utilizando a plataforma Celonis EMS.',
      },
      {
        period: 'Setembro 2024 - Hoje',
        title: 'Desenvolvedor Fullstack na Govtech',
        description:
          'Trabalho como desenvolvedor Fullstack na Govtech (Grupo Negócios Públicos).',
      },
    ],
  },
  en: {
    title: 'Journey',
    eyebrow: 'Timeline',
    items: [
      {
        period: 'January 2018',
        title: 'Started at UTFPR',
        description:
          "I started the Bachelor's degree in Information Systems at UTFPR.",
      },
      {
        period: 'December 2020 - February 2021',
        title: 'Database for APRE',
        description: 'I developed a database for APRE.',
      },
      {
        period: 'December 2021',
        title: 'Internship at Rhodia Brazil',
        description:
          'I started working as an intern at Rhodia Brazil (Solvay Group), acting as an RPA developer.',
      },
      {
        period: 'July 2023',
        title: 'Process Mining and Data Engineering',
        description:
          'Still at Rhodia Brazil and as an intern, I started working with the Process Mining team as a data engineer using the Celonis EMS platform.',
      },
      {
        period: 'September 2024 - Present',
        title: 'Fullstack Developer at Govtech',
        description:
          'I work as a Fullstack Developer at Govtech (Grupo Negócios Públicos).',
      },
    ],
  },
} satisfies Record<Language, JourneyContent>

const projectContent = {
  pt: {
    title: 'Projetos',
    eyebrow: 'Trabalhos em destaque',
    githubLabel: 'GitHub',
    demoLabel: 'Demo',
    technologiesLabel: 'Tecnologias',
    items: [
      {
        title: 'Plataforma de Ensino de Piano',
        description:
          'Projeto dummy para uma plataforma de aprendizado musical que organiza aulas, exercícios e progresso dos alunos em um fluxo simples. A ideia é resolver a dificuldade de acompanhar evolução prática e teoria em um único ambiente.',
        image: '/images/projects/piano-platform.jpg',
        imageAlt: 'Imagem genérica representando uma plataforma de ensino de piano',
        technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
      {
        title: 'Sistema de Gerenciamento para Igrejas',
        description:
          'Projeto dummy para centralizar membros, eventos, grupos e rotinas administrativas de uma igreja. A proposta é reduzir controles manuais e facilitar a organização de informações importantes para a comunidade.',
        image: '/images/projects/church-management.jpg',
        imageAlt: 'Imagem genérica representando gestão e organização para igrejas',
        technologies: ['Vue.js', 'C#', 'ASP.NET', 'SQL'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
      {
        title: 'Paper sobre Fraudes em Licitações',
        description:
          'Projeto dummy baseado no artigo sobre detecção de fraudes em licitações públicas. O trabalho compara modelos de detecção de anomalias para apoiar a identificação de padrões suspeitos em dados públicos.',
        image: '/images/projects/fraud-paper.jpg',
        imageAlt: 'Imagem genérica representando análise de dados e pesquisa sobre fraudes',
        technologies: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
    ],
  },
  en: {
    title: 'Projects',
    eyebrow: 'Featured work',
    githubLabel: 'GitHub',
    demoLabel: 'Demo',
    technologiesLabel: 'Technologies',
    items: [
      {
        title: 'Piano Learning Platform',
        description:
          'Dummy project for a music learning platform that organizes lessons, exercises, and student progress in a simple flow. The idea is to solve the difficulty of tracking practice and theory in a single environment.',
        image: '/images/projects/piano-platform.jpg',
        imageAlt: 'Generic image representing a piano learning platform',
        technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
      {
        title: 'Church Management System',
        description:
          'Dummy project designed to centralize members, events, groups, and administrative routines for a church. The goal is to reduce manual controls and make important community information easier to organize.',
        image: '/images/projects/church-management.jpg',
        imageAlt: 'Generic image representing management and organization for churches',
        technologies: ['Vue.js', 'C#', 'ASP.NET', 'SQL'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
      {
        title: 'Public Procurement Fraud Paper',
        description:
          'Dummy project based on the paper about fraud detection in public procurement. The work compares anomaly detection models to support the identification of suspicious patterns in public data.',
        image: '/images/projects/fraud-paper.jpg',
        imageAlt: 'Generic image representing data analysis and fraud research',
        technologies: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
        githubUrl: 'https://github.com/breno-abreu',
        demoUrl: '#',
      },
    ],
  },
} satisfies Record<Language, ProjectContent>

const skillsContent = {
  pt: {
    title: 'Habilidades',
    eyebrow: 'Competências',
    items: [
      {
        title: 'Base Técnica Multidisciplinar',
        description:
          'Conhecimento em Sistemas de Informação, Ciência e Engenharia de Dados, Automação Robótica de Processos (RPA) e Programação Web Full Stack com Microsserviços e APIs REST.',
        icon: 'knowledge',
      },
      {
        title: 'Linguagens de Programação',
        description:
          'Experiência com C# (ASP.NET), JavaScript (Vue.js), SQL, Python, VBA e Apps Script.',
        icon: 'programming',
      },
      {
        title: 'HTML e CSS',
        description:
          'Experiência com criação de interfaces web, estruturação semântica e estilização responsiva.',
        icon: 'web',
      },
      {
        title: 'Bancos de Dados',
        description: 'Experiência com bancos de dados MySQL e SQL Server.',
        icon: 'database',
      },
      {
        title: 'Celonis EMS',
        description:
          'Experiência com a plataforma Celonis EMS para Process Mining e Engenharia de Dados.',
        icon: 'celonis',
      },
      {
        title: 'Metodologias Ágeis',
        description: 'Experiência com Metodologias Ágeis (Agile) em ambientes colaborativos.',
        icon: 'agile',
      },
      {
        title: 'SAP ERP',
        description: 'Conhecimento básico em SAP ERP, voltado para automações.',
        icon: 'sap',
      },
      {
        title: 'Lean Six Sigma',
        description: 'Certificado Lean Six Sigma no nível Yellow Belt.',
        icon: 'certificate',
      },
      {
        title: 'Português',
        description: 'Português nativo.',
        icon: 'portuguese',
      },
      {
        title: 'Inglês',
        description: 'Inglês avançado, com experiência colaborando com equipes internacionais.',
        icon: 'english',
      },
      {
        title: 'Deploy e Infraestrutura',
        description: 'Experiência com Docker, Caddy e VPS para deploy de aplicações.',
        icon: 'deploy',
      },
      {
        title: 'Assistentes de Programação com IA',
        description:
          'Experiência utilizando Cursor e ChatGPT como auxiliares de programação, pesquisa, revisão e aceleração de desenvolvimento.',
        icon: 'aiTools',
      },
    ],
  },
  en: {
    title: 'Skills',
    eyebrow: 'Capabilities',
    items: [
      {
        title: 'Multidisciplinary Technical Foundation',
        description:
          'Knowledge in Information Systems, Data Science and Data Engineering, Robotic Process Automation (RPA), and Full Stack Web Programming with Microservices and REST APIs.',
        icon: 'knowledge',
      },
      {
        title: 'Programming Languages',
        description:
          'Experience with C# (ASP.NET), JavaScript (Vue.js), SQL, Python, VBA, and Apps Script.',
        icon: 'programming',
      },
      {
        title: 'HTML and CSS',
        description:
          'Experience building web interfaces, semantic structure, and responsive styling.',
        icon: 'web',
      },
      {
        title: 'Databases',
        description: 'Experience with MySQL and SQL Server databases.',
        icon: 'database',
      },
      {
        title: 'Celonis EMS',
        description:
          'Experience with the Celonis EMS platform for Process Mining and Data Engineering.',
        icon: 'celonis',
      },
      {
        title: 'Agile Methodologies',
        description: 'Experience with Agile methodologies in collaborative environments.',
        icon: 'agile',
      },
      {
        title: 'SAP ERP',
        description: 'Basic SAP ERP knowledge focused on automation scenarios.',
        icon: 'sap',
      },
      {
        title: 'Lean Six Sigma',
        description: 'Lean Six Sigma certification at Yellow Belt level.',
        icon: 'certificate',
      },
      {
        title: 'Portuguese',
        description: 'Native Portuguese speaker.',
        icon: 'portuguese',
      },
      {
        title: 'English',
        description: 'Advanced English, with experience collaborating with international teams.',
        icon: 'english',
      },
      {
        title: 'Deployment and Infrastructure',
        description: 'Experience with Docker, Caddy, and VPS environments for application deploys.',
        icon: 'deploy',
      },
      {
        title: 'AI Programming Assistants',
        description:
          'Experience using Cursor and ChatGPT as programming assistants for research, review, and faster development workflows.',
        icon: 'aiTools',
      },
    ],
  },
} satisfies Record<Language, SkillsContent>

const hobbiesContent = {
  pt: {
    title: 'Hobbies',
    eyebrow: 'Além do código',
    items: [
      {
        title: 'Música e Piano',
        description:
          'A música faz parte da minha vida desde cedo. Toco piano desde 2004, também arrisco um pouco de violão e guitarra, e tenho uma paixão especial por apresentações ao vivo. Na maior parte dos sábados do ano, toco em público na igreja e ajudo a coordenar e organizar apresentações musicais.',
        images: [
          {
            src: '/images/hobbies/music/music-1.jpg',
            alt: 'Foto dummy de partitura musical',
          },
          {
            src: '/images/hobbies/music/music-2.jpg',
            alt: 'Foto dummy de piano',
          },
          {
            src: '/images/hobbies/music/music-3.jpg',
            alt: 'Foto dummy de apresentação musical',
          },
        ],
      },
      {
        title: 'Fotografia',
        description:
          'Fotografia é um hobby que une criatividade, atenção a detalhes e vontade de registrar bons momentos. Gosto especialmente de fotografias de paisagens e retratos, e também contribuo gratuitamente com fotografias de eventos locais quando tenho oportunidade.',
        images: [
          {
            src: '/images/hobbies/photography/photo-1.jpg',
            alt: 'Foto dummy de câmera fotográfica',
          },
          {
            src: '/images/hobbies/photography/photo-2.jpg',
            alt: 'Foto dummy de pessoa fotografando',
          },
          {
            src: '/images/hobbies/photography/photo-3.jpg',
            alt: 'Foto dummy de paisagem',
          },
        ],
      },
      {
        title: 'Bicicleta',
        description:
          'Andar de bicicleta é minha forma preferida de fazer exercícios. Além do movimento físico, gosto da sensação de liberdade, do contato com o ambiente e da possibilidade de transformar atividade física em um momento leve e prazeroso.',
        images: [
          {
            src: '/images/hobbies/cycling/cycling-1.jpg',
            alt: 'Foto dummy de ciclista',
          },
          {
            src: '/images/hobbies/cycling/cycling-2.jpg',
            alt: 'Foto dummy de trilha de bicicleta',
          },
          {
            src: '/images/hobbies/cycling/cycling-3.jpg',
            alt: 'Foto dummy de bicicleta',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Hobbies',
    eyebrow: 'Beyond code',
    items: [
      {
        title: 'Music and Piano',
        description:
          'Music has been part of my life from an early age. I have played piano since 2004, also play a bit of acoustic and electric guitar, and have a special passion for live performances. Most Saturdays of the year, I play publicly at church and help coordinate and organize musical presentations.',
        images: [
          {
            src: '/images/hobbies/music/music-1.jpg',
            alt: 'Dummy photo of sheet music',
          },
          {
            src: '/images/hobbies/music/music-2.jpg',
            alt: 'Dummy photo of a piano',
          },
          {
            src: '/images/hobbies/music/music-3.jpg',
            alt: 'Dummy photo of a musical performance',
          },
        ],
      },
      {
        title: 'Photography',
        description:
          'Photography is a hobby that combines creativity, attention to detail, and the desire to capture meaningful moments. I especially enjoy landscape and portrait photography, and I also contribute free photography for local events whenever I can.',
        images: [
          {
            src: '/images/hobbies/photography/photo-1.jpg',
            alt: 'Dummy photo of a camera',
          },
          {
            src: '/images/hobbies/photography/photo-2.jpg',
            alt: 'Dummy photo of someone taking pictures',
          },
          {
            src: '/images/hobbies/photography/photo-3.jpg',
            alt: 'Dummy landscape photo',
          },
        ],
      },
      {
        title: 'Cycling',
        description:
          'Cycling is my favorite way to exercise. Beyond the physical movement, I enjoy the sense of freedom, the contact with the environment, and the possibility of turning exercise into a light and enjoyable moment.',
        images: [
          {
            src: '/images/hobbies/cycling/cycling-1.jpg',
            alt: 'Dummy photo of a cyclist',
          },
          {
            src: '/images/hobbies/cycling/cycling-2.jpg',
            alt: 'Dummy photo of a bike trail',
          },
          {
            src: '/images/hobbies/cycling/cycling-3.jpg',
            alt: 'Dummy photo of a bicycle',
          },
        ],
      },
    ],
  },
} satisfies Record<Language, HobbiesContent>

function getStoredLanguage(): Language {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'pt'
}

function getStoredTheme(): Theme {
  return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage)
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const text = copy[language]
  const aboutContent = getAboutContent(getExperienceYears())

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return (
    <div className="min-h-dvh bg-[#fbf7ef] text-neutral-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-50">
      <a className="skip-link" href="#main-content">
        {text.skipToContent}
      </a>
      <Navbar
        language={language}
        theme={theme}
        text={text}
        navItems={navItems[language]}
        onLanguageChange={setLanguage}
        onThemeChange={setTheme}
      />
      <main id="main-content">
        <HomeSection content={homeContent[language]} />
        <AboutSection content={aboutContent[language]} />
        <JourneySection content={journeyContent[language]} />
        <ProjectSection content={projectContent[language]} />
        <SkillsSection content={skillsContent[language]} />
        <HobbiesSection content={hobbiesContent[language]} />
        <ValuesSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
