import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { AboutSection } from './components/sections/AboutSection'
import type { AboutContent } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import type { ContactContent } from './components/sections/ContactSection'
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
import type { ValuesContent } from './components/sections/ValuesSection'
import { useSectionReveal } from './hooks/useSectionReveal'

export type Language = 'pt' | 'en'

const LANGUAGE_STORAGE_KEY = 'portfolio:language'
const EXPERIENCE_START_YEAR = 2023
const RESUME_URL =
  'https://docs.google.com/document/d/13Ed_C5Bt7cCY0BGdrTreZBnwmcIvmyz4ujherzII7Wc/edit?usp=sharing'
const RESUME_URL_EN =
  'https://docs.google.com/document/d/1jmhZ3GceMJlZW0NDBNETqXK1ncuUpKbQKz-6npvT01E/edit?usp=sharing'
const PAPER_URL =
  'https://drive.google.com/file/d/16jimJgUFG_yOOcCM7rDdCO5ru77rWtgX/view?usp=sharing'

const copy = {
  pt: {
    languageLabel: 'Idioma',
    switchToEnglish: 'English',
    switchToPortuguese: 'Português',
    skipToContent: 'Pular para o conteúdo',
    contactLabel: 'Contato',
  },
  en: {
    languageLabel: 'Language',
    switchToEnglish: 'English',
    switchToPortuguese: 'Português',
    skipToContent: 'Skip to content',
    contactLabel: 'Contact',
  },
} satisfies Record<Language, Record<string, string>>

const navItems = {
  pt: [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Trajetória', href: '#journey' },
    { label: 'Projetos', href: '#project' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Princípios', href: '#values' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contato', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#project' },
    { label: 'Skills', href: '#skills' },
    { label: 'Principles', href: '#values' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ],
} satisfies Record<Language, Array<{ label: string; href: string }>>

const homeContent = {
  pt: {
    name: 'Breno Abreu',
    role: 'Desenvolvedor Fullstack',
    location: 'Curitiba, PR, Brasil',
    intro:
      'Olá! Me chamo Breno e desenvolvo aplicações web completas, do frontend ao backend, focadas em simplicidade, usabilidade e experiência do usuário.',
    photoAlt: 'Imagem de perfil de Breno Abreu',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copiar email',
    copiedEmailLabel: 'Email copiado',
    resumeLabel: 'Currículo',
    resumeUrl: RESUME_URL,
  },
  en: {
    name: 'Breno Abreu',
    role: 'Fullstack Developer',
    location: 'Curitiba, PR, Brazil',
    intro:
      'Hi! My name is Breno and I build complete web applications, from frontend to backend, focused on simplicity, performance, and user experience.',
    photoAlt: 'Profile image of Breno Abreu',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copy email',
    copiedEmailLabel: 'Email copied',
    resumeLabel: 'Resume',
    resumeUrl: RESUME_URL_EN,
  },
} satisfies Record<Language, HomeContent>

function getExperienceYears() {
  return Math.max(new Date().getFullYear() - EXPERIENCE_START_YEAR, 0)
}

function getElapsedDurationFrom(startYear: number, startMonthIndex: number, language: Language) {
  const currentDate = new Date()
  const totalMonths = Math.max(
    (currentDate.getFullYear() - startYear) * 12 +
      currentDate.getMonth() -
      startMonthIndex +
      1,
    1,
  )
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []

  if (years > 0) {
    parts.push(
      language === 'pt'
        ? `${years} ${years === 1 ? 'ano' : 'anos'}`
        : `${years} ${years === 1 ? 'year' : 'years'}`,
    )
  }

  if (months > 0) {
    parts.push(
      language === 'pt'
        ? `${months} ${months === 1 ? 'mês' : 'meses'}`
        : `${months} ${months === 1 ? 'month' : 'months'}`,
    )
  }

  return parts.join(language === 'pt' ? ' e ' : ' and ')
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
          href: PAPER_URL,
          linkLabel:
            'Abrir artigo Detecção de Fraudes em Licitações Públicas: Uma Comparação de Modelos de Detecção de Anomalias no Google Drive',
        },
        'Tenho boa autonomia, gosto pelo aprendizado e vontade de resolver problemas onde eu possa ver o impacto direto das minhas soluções.',
        'Meus principais interesses estão no desenvolvimento de aplicações que melhorem a qualidade de vida e do trabalho dos clientes, procurando sempre criar a melhor experiência de usuário. Acredito em tomadas de decisão baseadas em dados mas também no poder da criatividade.',
        'Possuo inglês avançado e experiência colaborando com equipes globais.',
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
          href: PAPER_URL,
          linkLabel:
            'Open the paper Fraud Detection in Public Procurement: A Comparison of Anomaly Detection Models on Google Drive',
        },
        'I have strong autonomy, enjoy learning, and like solving problems where I can see the direct impact of my solutions.',
        'My main interests are in developing applications that improve clients’ quality of life and work, always aiming to create the best user experience. I believe in data-driven decision-making, but also in the power of creativity.',
        'I have advanced English skills and experience collaborating with global teams.',
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
        period: 'Mar 2018',
        title: 'Ingresso na UTFPR',
        description: 'Ingressei no curso de Bacharelado em Sistemas de Informação na UTFPR.',
        logoSrc: '/company-logos/utfpr.png',
        logoAlt: 'Logo da UTFPR',
      },
      {
        period: 'Dez 2020 - Fev 2021',
        duration: '3 meses',
        title: 'Criação de um Banco de Dados para a APRE',
        description:
          'Realizei a modelagem, o desenvolvimento e a instalação de um banco de dados para a Associação Paranaense de Empresas de Base Florestal (APRE), utilizando MySQL nos servidores da associação e LibreOffice Base como frontend. O projeto foi criado do zero em um contrato freelancer de prestação de serviços.',
        logoSrc: '/company-logos/apre.png',
        logoAlt: 'Logo da APRE',
      },
      {
        period: 'Dez 2021',
        duration: '1 ano e 7 meses',
        title: 'Estágio como Desenvolvedor de RPAs e Ferramentas de Análise de Dados na Solvay',
        description:
          'Atuei no desenvolvimento de Automações Robóticas de Processos (RPA) para o SAP ERP com VBA, criando substituições robóticas virtuais para atividades manuais e reduzindo consideravelmente o tempo de execução de operações. Também desenvolvi ferramentas de análise de dados e automação com Google Apps Script em uma equipe internacional durante o estágio.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Logo da Solvay',
      },
      {
        period: 'Jul 2022',
        title: 'Finalista no SBS Awards na categoria Deep Simplification na Solvay',
        description:
          'Fui finalista no SBS Awards na categoria Deep Simplification durante minha atuação na Solvay com uma aplicação de busca e análise de dados. A solução gerava gráficos e estatísticas a partir de dados extraídos do SAP por meio de RPAs.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Logo da Solvay',
      },
      {
        period: 'Out 2022',
        title: 'Certificado Lean Six Sigma Yellow Belt na Solvay',
        description:
          'Adquiri a certificação Lean Six Sigma Yellow Belt, fortalecendo minha base em melhoria contínua e análise de processos. Para obter a certificação, participei de um projeto de simplificação de um processo longo e manual de gestão de energia, criando um programa para extrair, organizar e servir os dados finais de forma rápida e padronizada.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Logo da Solvay',
      },
      {
        period: 'Jul 2023 - Dez 2023',
        duration: '6 meses',
        title: 'Estágio na equipe de Process Mining como Engenheiro de Dados na Solvay',
        description:
          'Participei da extração e transformação de dados do SAP ERP, além do desenvolvimento de automações e ferramentas de análise de dados na equipe de Process Mining. Trabalhei com a plataforma Celonis EMS em uma equipe internacional durante o estágio.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Logo da Solvay',
      },
      {
        period: 'Abr 2024',
        title: 'Ganhador do melhor artigo na categoria Pesquisa na ERBD 2024',
        description:
          'Recebi o prêmio de melhor artigo na categoria Pesquisa na ERBD 2024 com um trabalho sobre detecção de fraudes em licitações públicas.',
        linkHref: PAPER_URL,
        linkLabel: 'Ver artigo.',
        logoSrc: '/company-logos/erbd.png',
        logoAlt: 'Logo da ERBD 2024',
      },
      {
        period: 'Jul 2024',
        title: 'Formação no Bacharelado em Sistemas de Informação',
        description:
          'Concluí o Bacharelado em Sistemas de Informação pela Universidade Tecnológica Federal do Paraná.',
        logoSrc: '/company-logos/utfpr.png',
        logoAlt: 'Logo da UTFPR',
      },
      {
        period: 'Out 2024',
        title: 'Apresentação de artigo na SBBD 2024',
        description:
          'Apresentei meu artigo no SBBD 2024, principal evento em Ciência de Dados e Big Data da América Latina, compartilhando os resultados do estudo sobre detecção de fraudes em licitações públicas.',
        logoSrc: '/company-logos/sbbd.png',
        logoAlt: 'Logo da SBBD 2024',
      },
      {
        period: 'Set 2024 - Hoje',
        duration: getElapsedDurationFrom(2024, 8, 'pt'),
        title: 'Desenvolvedor Fullstack em Grupo Negócios Públicos',
        description:
          'Atualmente trabalho no desenvolvimento de aplicações SPA com ASP.NET, Vue.js e SQL Server para órgãos governamentais e para o próprio grupo. Atuo como desenvolvedor Fullstack no modelo de microsserviços e APIs REST, com experiência bem-sucedida na migração de aplicações monolíticas para microsserviços em um contrato de prestação de serviços em tempo integral.',
        logoSrc: '/company-logos/grupo-negocios-publicos.png',
        logoAlt: 'Logo do Grupo Negócios Públicos',
      },
    ],
  },
  en: {
    title: 'Journey',
    eyebrow: 'Timeline',
    items: [
      {
        period: 'Mar 2018',
        title: 'Started at UTFPR',
        description:
          "I started the Bachelor's degree in Information Systems at UTFPR.",
        logoSrc: '/company-logos/utfpr.png',
        logoAlt: 'UTFPR logo',
      },
      {
        period: 'Dec 2020 - Feb 2021',
        duration: '3 months',
        title: 'Creation of a Database for APRE',
        description:
          'I modeled, developed, and installed a database for the Paraná Association of Forest-Based Companies (APRE), using MySQL on the association servers and LibreOffice Base as the frontend. The project was built from scratch as a freelance services contract.',
        logoSrc: '/company-logos/apre.png',
        logoAlt: 'APRE logo',
      },
      {
        period: 'Dec 2021',
        duration: '1 year and 7 months',
        title: 'Internship as RPA and Data Analysis Tools Developer at Solvay',
        description:
          'I worked on Robotic Process Automation (RPA) development for SAP ERP with VBA, creating virtual robotic replacements for manual tasks and considerably reducing operation execution time. I also developed data analysis and automation tools with Google Apps Script in an international team during the internship.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Solvay logo',
      },
      {
        period: 'Jul 2022',
        title: 'Finalist at the SBS Awards in the Deep Simplification category at Solvay',
        description:
          'I was a finalist at the SBS Awards in the Deep Simplification category during my time at Solvay with a data search and analysis application. The solution generated charts and statistics from SAP data extracted through RPAs.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Solvay logo',
      },
      {
        period: 'Oct 2022',
        title: 'Lean Six Sigma Yellow Belt Certification at Solvay',
        description:
          'I earned the Lean Six Sigma Yellow Belt certification, strengthening my foundation in continuous improvement and process analysis. To obtain the certification, I participated in a project to simplify a long and manual energy management process, creating a program to extract, organize, and serve the final data quickly and consistently.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Solvay logo',
      },
      {
        period: 'Jul 2023 - Dec 2023',
        duration: '6 months',
        title: 'Internship in the Process Mining team as a Data Engineer at Solvay',
        description:
          'I took part in extracting and transforming SAP ERP data, while also developing automations and data analysis tools within the Process Mining team. I worked with the Celonis EMS platform in an international team during the internship.',
        logoSrc: '/company-logos/solvay.png',
        logoAlt: 'Solvay logo',
      },
      {
        period: 'Apr 2024',
        title: 'Best Paper Award in the Research category at ERBD 2024',
        description:
          'I received the best paper award in the Research category at ERBD 2024 for a study on fraud detection in public procurement.',
        linkHref: PAPER_URL,
        linkLabel: 'View paper.',
        logoSrc: '/company-logos/erbd.png',
        logoAlt: 'ERBD 2024 logo',
      },
      {
        period: 'Jul 2024',
        title: "Graduated with a Bachelor's degree in Information Systems",
        description:
          'I completed the Bachelor of Information Systems degree at the Federal University of Technology - Paraná.',
        logoSrc: '/company-logos/utfpr.png',
        logoAlt: 'UTFPR logo',
      },
      {
        period: 'Oct 2024',
        title: 'Presented my paper at SBBD 2024',
        description:
          'I presented my paper at SBBD 2024, the leading Data Science and Big Data event in Latin America, sharing the results of the study on fraud detection in public procurement.',
        logoSrc: '/company-logos/sbbd.png',
        logoAlt: 'SBBD 2024 logo',
      },
      {
        period: 'Sep 2024 - Present',
        duration: getElapsedDurationFrom(2024, 8, 'en'),
        title: 'Fullstack Developer at Grupo Negócios Públicos',
        description:
          'I currently develop SPA applications with ASP.NET, Vue.js, and SQL Server for government agencies and for the group itself. I work as a Fullstack Developer using microservices and REST APIs, with successful experience migrating monolithic applications to microservices in a full-time services contract.',
        logoSrc: '/company-logos/grupo-negocios-publicos.png',
        logoAlt: 'Grupo Negócios Públicos logo',
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
    demoComingSoonLabel: 'Demo (em breve)',
    privateLabel: 'Código fechado',
    openSourceLabel: 'Código aberto',
    technologiesLabel: 'Tecnologias',
    items: [
      {
        title: 'Sistema de Gerenciamento para Igrejas',
        description:
          'Aplicação para gerenciamento de igrejas criada para substituir o uso disperso de planilhas e múltiplas ferramentas. A proposta é centralizar agendamentos compartilhados entre ministérios, cronogramas de eventos com acompanhamento em tempo real, repertórios e escalas de louvor e outros ministérios em uma solução customizada e profissional. A solução completa conta com autenticação e um sistema de permissões por RBAC, backend ASP.NET utilizando um banco de dados PostgreSQL e é executada em produção em uma VPS, containerizada com Docker.',
        image: '/images/projects/church-management.png',
        imageAlt: 'Captura de tela do sistema BLESS com painel de análise de engajamento',
        technologies: ['Vue.js', 'TypeScript', 'PrimeVue', 'C#', 'ASP.NET', 'SQL', 'PostgreSQL', 'VPS', 'Docker'],
        demoComingSoon: true,
        isPrivate: true,
      },
      {
        title: 'Plataforma de Ensino de Piano',
        description:
          'Plataforma pensada para melhorar o gerenciamento de aulas de piano, oferecendo um ambiente consolidado para alunos. A aplicação permite reproduzir arquivos MIDI e visualizar as notas tocadas em diferentes andamentos, consultar dicionários de acordes com teclado virtual e realizar exercícios de forma interativa.',
        image: '/images/projects/piano-platform.png',
        imageAlt: 'Captura de tela da PianoApp com visualização de notas e teclado virtual',
        technologies: ['Vue.js', 'JavaScript'],
        githubUrl: 'https://github.com/breno-abreu/piano-app',
        demoUrl: 'https://breno-abreu.github.io/piano-app/',
      },
      {
        title: 'Portfólio Pessoal',
        description:
          'Esta própria aplicação de portfólio pessoal: uma frontend de página única criada para apresentar minha trajetória, projetos, habilidades e canais de contato em uma experiência bilíngue, moderna e organizada em seções componentizadas.',
        image: '/images/projects/portfolio-site.svg',
        imageAlt: 'Prévia estilizada da interface do portfólio pessoal',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/breno-abreu/portfolio',
      },
      {
        title: 'Artigo sobre Detecção de Fraudes em Licitações Utilizando IA',
        description:
          'Artigo desenvolvido sobre detecção de fraudes em licitações públicas utilizando Inteligência Artificial. O trabalho compara modelos de detecção de anomalias e aprendizado de máquina para apoiar a identificação de padrões suspeitos em dados públicos, sob orientação do professor doutor Luiz Celso Gomes Junior.',
        image: '/images/projects/fraud-paper-cover.png',
        imageAlt: 'Capa do artigo Detecção de Fraudes em Licitações Públicas',
        technologies: ['Python', 'Ciência de Dados', 'Inteligência Artificial'],
        githubUrl: 'https://github.com/breno-abreu/TCC_Abreu_Pereira',
        demoUrl: PAPER_URL,
        demoLabel: 'Artigo',
      },
    ],
  },
  en: {
    title: 'Projects',
    eyebrow: 'Featured work',
    githubLabel: 'GitHub',
    demoLabel: 'Demo',
    demoComingSoonLabel: 'Demo (coming soon)',
    privateLabel: 'Closed source',
    openSourceLabel: 'Open source',
    technologiesLabel: 'Technologies',
    items: [
      {
        title: 'Church Management System',
        description:
          'Church management application designed to replace scattered spreadsheets and multiple disconnected tools. The goal is to centralize shared scheduling across ministries, event timelines with real-time tracking, worship repertoires, and ministry rosters in a customized and professional solution. The full solution includes authentication and an RBAC permission system, an ASP.NET backend with a PostgreSQL database, and runs in production on a VPS, containerized with Docker.',
        image: '/images/projects/church-management.png',
        imageAlt: 'Screenshot of the BLESS system engagement analytics dashboard',
        technologies: ['Vue.js', 'TypeScript', 'PrimeVue', 'C#', 'ASP.NET', 'SQL', 'PostgreSQL', 'VPS', 'Docker'],
        demoComingSoon: true,
        isPrivate: true,
      },
      {
        title: 'Piano Learning Platform',
        description:
          'Platform designed to improve the management of piano lessons by offering a consolidated environment for students. The application allows MIDI file playback with note visualization at different tempos, chord dictionary exploration with a virtual keyboard, and interactive exercises.',
        image: '/images/projects/piano-platform.png',
        imageAlt: 'Screenshot of PianoApp with note visualization and virtual keyboard',
        technologies: ['Vue.js', 'JavaScript'],
        githubUrl: 'https://github.com/breno-abreu/piano-app',
        demoUrl: 'https://breno-abreu.github.io/piano-app/',
      },
      {
        title: 'Personal Portfolio',
        description:
          'This personal portfolio application itself: a single-page frontend created to present my journey, projects, skills, and contact channels through a bilingual, modern experience organized into componentized sections.',
        image: '/images/projects/portfolio-site.svg',
        imageAlt: 'Stylized preview of the personal portfolio interface',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/breno-abreu/portfolio',
      },
      {
        title: 'Paper on Fraud Detection in Public Procurement Using AI',
        description:
          'Paper developed on fraud detection in public procurement using Artificial Intelligence. The work compares anomaly detection and machine learning models to support the identification of suspicious patterns in public data, under the supervision of Professor Dr. Luiz Celso Gomes Junior.',
        image: '/images/projects/fraud-paper-cover.png',
        imageAlt: 'Cover of the paper on fraud detection in public procurement',
        technologies: ['Python', 'Data Science', 'Artificial Intelligence'],
        githubUrl: 'https://github.com/breno-abreu/TCC_Abreu_Pereira',
        demoUrl: PAPER_URL,
        demoLabel: 'Paper',
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
          'Conhecimento em Sistemas de Informação, Programação Web Full Stack com Microsserviços e APIs REST, Automação Robótica de Processos (RPA), Ciência e Engenharia de Dados.',
        icon: 'knowledge',
        keywords: [
          'Sistemas de Informação',
          'Full Stack',
          'REST APIs',
          'RPA',
          'Engenharia de Dados',
          'Ciência de Dados',
        ],
      },
      {
        title: 'Linguagens de Programação',
        description:
          'Experiência com C# (ASP.NET), JavaScript (Vue.js e React), SQL, Python, VBA, Apps Script, HTML e CSS para criação de interfaces web semânticas e responsivas.',
        icon: 'programming',
        keywords: ['C#', 'ASP.NET', 'JavaScript', 'Vue.js', 'React', 'Python', 'SQL', 'HTML', 'CSS'],
      },
      {
        title: 'Bancos de Dados',
        description:
          'Experiência com MySQL e SQL Server em projetos profissionais, além de PostgreSQL em projetos pessoais.',
        icon: 'database',
        keywords: ['MySQL', 'SQL Server', 'PostgreSQL', 'SQL', 'Modelagem', 'Consultas'],
      },
      {
        title: 'Metodologias Ágeis',
        description: 'Experiência com Metodologias Ágeis (Agile) em ambientes colaborativos.',
        icon: 'agile',
        keywords: ['Agile', 'Scrum', 'Kanban', 'Colaboração', 'Sprints'],
      },
      {
        title: 'Certificações',
        description: 'Certificado Lean Six Sigma no nível Yellow Belt.',
        icon: 'certificate',
        keywords: ['Lean Six Sigma', 'Yellow Belt', 'Melhoria Contínua'],
      },
      {
        title: 'Idiomas',
        description:
          'Português nativo e inglês avançado, com experiência colaborando com equipes internacionais.',
        icon: 'languages',
        keywords: ['Português', 'Inglês', 'Equipes Globais'],
      },
      {
        title: 'Plataformas',
        description:
          'Experiência com Celonis EMS para Process Mining e Engenharia de Dados, além de conhecimento básico em SAP ERP voltado para automações.',
        icon: 'platforms',
        keywords: ['Celonis EMS', 'Process Mining', 'SAP ERP', 'ETL', 'Análise de Processos'],
      },
      {
        title: 'Deploy e Infraestrutura',
        description:
          'Experiência com Docker, Caddy e VPS para deploy de aplicações pessoais, incluindo projetos citados neste portfólio.',
        icon: 'deploy',
        keywords: ['Docker', 'Caddy', 'VPS', 'Deploy', 'Linux'],
      },
      {
        title: 'Assistentes de Programação com IA',
        description:
          'Experiência utilizando Cursor e ChatGPT como auxiliares de programação, pesquisa, revisão e aceleração de desenvolvimento.',
        icon: 'aiTools',
        keywords: ['Cursor', 'ChatGPT', 'Code Review', 'Pesquisa', 'Produtividade'],
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
          'Knowledge in Information Systems, Full Stack Web Programming with Microservices and REST APIs, Robotic Process Automation (RPA), Data Science, and Data Engineering.',
        icon: 'knowledge',
        keywords: ['Information Systems', 'Full Stack', 'REST APIs', 'RPA', 'Data Engineering', 'Data Science'],
      },
      {
        title: 'Programming Languages',
        description:
          'Experience with C# (ASP.NET), JavaScript (Vue.js and React), SQL, Python, VBA, Apps Script, HTML, and CSS for semantic and responsive web interfaces.',
        icon: 'programming',
        keywords: ['C#', 'ASP.NET', 'JavaScript', 'Vue.js', 'React', 'Python', 'SQL', 'HTML', 'CSS'],
      },
      {
        title: 'Databases',
        description:
          'Experience with MySQL and SQL Server in professional projects, plus PostgreSQL in personal projects.',
        icon: 'database',
        keywords: ['MySQL', 'SQL Server', 'PostgreSQL', 'SQL', 'Data Modeling', 'Queries'],
      },
      {
        title: 'Agile Methodologies',
        description: 'Experience with Agile methodologies in collaborative environments.',
        icon: 'agile',
        keywords: ['Agile', 'Scrum', 'Kanban', 'Collaboration', 'Sprints'],
      },
      {
        title: 'Certifications',
        description: 'Lean Six Sigma certification at Yellow Belt level.',
        icon: 'certificate',
        keywords: ['Lean Six Sigma', 'Yellow Belt', 'Continuous Improvement'],
      },
      {
        title: 'Languages',
        description:
          'Native Portuguese and advanced English, with experience collaborating with international teams.',
        icon: 'languages',
        keywords: ['Portuguese', 'English', 'Global Teams'],
      },
      {
        title: 'Platforms',
        description:
          'Experience with Celonis EMS for Process Mining and Data Engineering, plus basic SAP ERP knowledge focused on automation scenarios.',
        icon: 'platforms',
        keywords: ['Celonis EMS', 'Process Mining', 'SAP ERP', 'ETL', 'Process Analysis'],
      },
      {
        title: 'Deployment and Infrastructure',
        description:
          'Experience with Docker, Caddy, and VPS environments for deploying personal applications, including projects featured in this portfolio.',
        icon: 'deploy',
        keywords: ['Docker', 'Caddy', 'VPS', 'Deploy', 'Linux'],
      },
      {
        title: 'AI Programming Assistants',
        description:
          'Experience using Cursor and ChatGPT as programming assistants for research, review, and faster development workflows.',
        icon: 'aiTools',
        keywords: ['Cursor', 'ChatGPT', 'Code Review', 'Research', 'Productivity'],
      },
    ],
  },
} satisfies Record<Language, SkillsContent>

const hobbiesContent = {
  pt: {
    title: 'Hobbies',
    eyebrow: 'Além do código',
    previousImageLabel: 'Foto anterior',
    nextImageLabel: 'Próxima foto',
    items: [
      {
        title: 'Fotografia',
        description:
          'Sempre tive vontade de aprender a fotografar e finalmente comprei minha primeira câmera profissional há alguns anos atrás. Gosto de lidar com aspectos como composição e edição, tentando sempre deixar as fotos com a melhor qualidade possível. Gosto especialmente de fotografias de paisagens e retratos, e também contribuo voluntariamente com fotografias de eventos locais quando tenho oportunidade.',
        images: [
          {
            src: '/images/hobbies/photography/photo-1.png',
            alt: 'Foto de pôr do sol sobre o mar',
          },
          {
            src: '/images/hobbies/photography/photo-2.png',
            alt: 'Foto em preto e branco de uma pessoa em uma caverna',
          },
          {
            src: '/images/hobbies/photography/photo-3.png',
            alt: 'Foto macro de trevos com gotas de água',
          },
        ],
      },
      {
        title: 'Música e Piano',
        description:
          'A música faz parte da minha vida desde cedo. Estudo piano desde criança e também arrisco um pouco de violão e guitarra. Tenho paixão em fazer música e tocar ao vivo. Toco semanalmente em público e ajudo a coordenar e organizar apresentações musicais.',
        images: [
          {
            src: '/images/hobbies/music/music-4.png',
            alt: 'Foto tocando teclado em uma apresentação musical',
          },
          {
            src: '/images/hobbies/music/music-5.png',
            alt: 'Foto de partituras sobre um piano',
          },
          {
            src: '/images/hobbies/music/music-6.png',
            alt: 'Foto tocando teclado e cantando em uma apresentação',
          },
        ],
      },
      {
        title: 'Bicicleta',
        description:
          'Andar de bicicleta é minha forma preferida de fazer exercícios. Gosto da sensação de liberdade e do contato com a natureza. Tenho especial apreço em andar em zonas rurais e cidades pequenas, principalmente em lugares onde ainda não tenho tanta familiaridade.',
        images: [
          {
            src: '/images/hobbies/cycling/cycling-4.png',
            alt: 'Foto de ciclista descansando ao lado de um lago',
          },
          {
            src: '/images/hobbies/cycling/cycling-5.png',
            alt: 'Foto de bicicletas em uma ponte sobre um rio',
          },
          {
            src: '/images/hobbies/cycling/cycling-6.png',
            alt: 'Foto de passeio de bicicleta em uma área rural',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Hobbies',
    eyebrow: 'Beyond code',
    previousImageLabel: 'Previous photo',
    nextImageLabel: 'Next photo',
    items: [
      {
        title: 'Photography',
        description:
          'I had always wanted to learn photography and finally bought my first professional camera in 2023. I enjoy working with composition and editing, always trying to make photos reach the best quality possible. I especially enjoy landscape and portrait photography, and I also volunteer as a photographer for local events whenever I have the opportunity.',
        images: [
          {
            src: '/images/hobbies/photography/photo-1.png',
            alt: 'Photo of a sunset over the sea',
          },
          {
            src: '/images/hobbies/photography/photo-2.png',
            alt: 'Black and white photo of a person in a cave',
          },
          {
            src: '/images/hobbies/photography/photo-3.png',
            alt: 'Macro photo of clovers with water droplets',
          },
        ],
      },
      {
        title: 'Music and Piano',
        description:
          'Music has been part of my life from an early age. I started studying piano in 2004 and also play a bit of acoustic and electric guitar. I am passionate about making music and performing live. Most Saturdays of the year, I play publicly at church and help coordinate and organize musical presentations.',
        images: [
          {
            src: '/images/hobbies/music/music-4.png',
            alt: 'Photo playing keyboard in a musical performance',
          },
          {
            src: '/images/hobbies/music/music-5.png',
            alt: 'Photo of sheet music on a piano',
          },
          {
            src: '/images/hobbies/music/music-6.png',
            alt: 'Photo playing keyboard and singing in a performance',
          },
        ],
      },
      {
        title: 'Cycling',
        description:
          'Cycling is my favorite way to exercise. I enjoy the sense of freedom and contact with nature. I have a special appreciation for riding through rural areas and small towns, especially places I am not yet very familiar with.',
        images: [
          {
            src: '/images/hobbies/cycling/cycling-4.png',
            alt: 'Photo of a cyclist resting beside a lake',
          },
          {
            src: '/images/hobbies/cycling/cycling-5.png',
            alt: 'Photo of bicycles on a bridge over a river',
          },
          {
            src: '/images/hobbies/cycling/cycling-6.png',
            alt: 'Photo of a bike ride through a rural area',
          },
        ],
      },
    ],
  },
} satisfies Record<Language, HobbiesContent>

const valuesContent = {
  pt: {
    title: 'Princípios Profissionais e Futuro',
    eyebrow: 'Direção',
    items: [
      {
        title: 'Princípios profissionais',
        description:
          'Meus princípios profissionais estão em criar aplicações que resolvam problemas reais, melhorem a qualidade de vida e de trabalho dos usuários e tornem processos mais rápidos e simples de executar. Procuro sempre construir soluções úteis, confiáveis e fáceis de usar, com criatividade e atenção especial à experiência, às necessidades e ao contexto de quem realmente vai utilizá-las.',
      },
      {
        title: 'Planos para o futuro',
        description:
          'Para o futuro, tenho interesse em aprofundar minha formação com especializações em UX Engineering e Engenharia de Software. Também quero me desenvolver cada vez mais na área de Inteligência Artificial, especialmente em como aplicar IA de forma prática, responsável e integrada às aplicações que desenvolvo.',
      },
    ],
  },
  en: {
    title: 'Professional Principles and Future',
    eyebrow: 'Direction',
    items: [
      {
        title: 'Professional principles',
        description:
          'My professional principles are centered on building applications that solve real problems, improve users’ quality of life and work, and make processes faster and easier to execute. I always aim to create useful, reliable, and easy-to-use solutions, combining creativity with strong attention to the experience, needs, and context of the people who will actually use them.',
      },
      {
        title: 'Future plans',
        description:
          'For the future, I am interested in deepening my education through specializations in UX Engineering and Software Engineering. I also want to keep growing in the area of Artificial Intelligence, especially in how to apply AI in practical, responsible ways integrated into the applications I build.',
      },
    ],
  },
} satisfies Record<Language, ValuesContent>

const contactContent = {
  pt: {
    title: 'Contato',
    eyebrow: 'Vamos conversar',
    description:
      'Se quiser trocar uma ideia, conhecer melhor meu trabalho ou falar sobre oportunidades, estes são os melhores canais para entrar em contato comigo.',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copiar email',
    copiedEmailLabel: 'Email copiado',
    resumeLabel: 'Currículo',
    resumeUrl: RESUME_URL,
  },
  en: {
    title: 'Contact',
    eyebrow: "Let's talk",
    description:
      'If you want to connect, learn more about my work, or talk about opportunities, these are the best channels to reach me.',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    copyEmailLabel: 'Copy email',
    copiedEmailLabel: 'Email copied',
    resumeLabel: 'Resume',
    resumeUrl: RESUME_URL_EN,
  },
} satisfies Record<Language, ContactContent>

const footerContent = {
  pt: {
    copyright: '© 2026 Breno Abreu. Conteúdo, design e fotografias autorais.',
    development:
      'Desenvolvido com React, TypeScript, Vite e Tailwind CSS. O código deste portfólio está disponível no GitHub.',
    photos:
      'Todas as fotos exibidas neste portfólio são fotografias reais e não foram geradas por IA.',
    ai:
      'Ferramentas de IA foram utilizadas como apoio no processo de desenvolvimento.',
    githubLabel: 'Ver projeto no GitHub',
  },
  en: {
    copyright: '© 2026 Breno Abreu. Original content, design, and photography.',
    development:
      'Built with React, TypeScript, Vite, and Tailwind CSS. The source code for this portfolio is available on GitHub.',
    photos:
      'All photos displayed in this portfolio are real photographs and were not generated by AI.',
    ai:
      'AI tools were used as support during the development process.',
    githubLabel: 'View project on GitHub',
  },
} satisfies Record<
  Language,
  {
    copyright: string
    development: string
    photos: string
    ai: string
    githubLabel: string
  }
>

function getStoredLanguage(): Language {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'pt'
}

function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage)
  const [activeSection, setActiveSection] = useState('home')
  const text = copy[language]
  const aboutContent = getAboutContent(getExperienceYears())

  useSectionReveal()

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    const sectionIds = navItems[language].map((item) => item.href.replace('#', ''))
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) {
      return
    }

    let frameId = 0

    const updateActiveSection = () => {
      frameId = 0

      // Anchor just below the sticky navbar — the last section that crossed it wins.
      const anchorY = Math.min(120, window.innerHeight * 0.22)
      let currentSectionId = sections[0].id

      for (const section of sections) {
        const top = section.getBoundingClientRect().top

        if (top <= anchorY) {
          currentSectionId = section.id
        }
      }

      setActiveSection((previous) =>
        previous === currentSectionId ? previous : currentSectionId,
      )
    }

    const handleScroll = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [language])

  return (
    <div className="min-h-dvh bg-[#fbf7ef] text-neutral-950 transition-colors duration-300">
      <a className="skip-link" href="#main-content">
        {text.skipToContent}
      </a>
      <Navbar
        language={language}
        text={text}
        navItems={navItems[language]}
        activeSection={activeSection}
        onLanguageChange={setLanguage}
        onNavItemClick={setActiveSection}
      />
      {activeSection !== 'contact' ? (
        <a
          className="navbar-contact-button contact-floating-button"
          href="#contact"
          onClick={() => setActiveSection('contact')}
        >
          <Mail className="size-4" aria-hidden="true" />
          <span>{text.contactLabel}</span>
        </a>
      ) : null}
      <main id="main-content" className="pb-16">
        <HomeSection content={homeContent[language]} />
        <AboutSection content={aboutContent[language]} />
        <JourneySection content={journeyContent[language]} />
        <ProjectSection content={projectContent[language]} />
        <SkillsSection content={skillsContent[language]} />
        <ValuesSection content={valuesContent[language]} />
        <HobbiesSection content={hobbiesContent[language]} />
        <ContactSection content={contactContent[language]} />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-info">
            <p className="site-footer-development">
              {footerContent[language].development}{' '}
              <a
                className="footer-link"
                href="https://github.com/breno-abreu/portfolio"
                target="_blank"
                rel="noreferrer"
              >
                {footerContent[language].githubLabel}
              </a>
            </p>

            <div className="site-footer-notes">
              <p>
                {footerContent[language].photos}{' '}
                {footerContent[language].ai}
              </p>
            </div>
          </div>

          <p className="site-footer-copyright">
            {footerContent[language].copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
