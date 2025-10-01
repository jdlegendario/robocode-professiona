import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './i18n'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Code, 
  Users, 
  Briefcase, 
  Envelope, 
  GithubLogo, 
  LinkedinLogo, 
  ArrowRight,
  CheckCircle,
  X,
  List,
  Globe,
  Article,
  Calendar,
  Eye,
  MapPin,
  Gear,
  ArrowSquareOut,
  Clock,
  ChartLineUp,
  Quotes
} from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { AuthProvider } from '@/contexts/AuthContext'
import AdminPanel from '@/admin'
import { contactAPI } from '@/api'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image?: string
  tags: string[]
}

interface ContactForm {
  name: string
  email: string
  message: string
}

type LocaleKey = 'en' | 'es'

interface SkillBar {
  name: string
  level: number
}

interface TeamMember {
  name: string
  role: string
  years: number
  focus: Record<LocaleKey, string>
  summary: Record<LocaleKey, string>
  experiences: Record<LocaleKey, string[]>
  skills: string[]
  skillBars: SkillBar[]
  certifications: Record<LocaleKey, string[]>
  languages: Record<LocaleKey, string[]>
  linkedin: string
  github: string
  avatar: string
}

type ProjectId = 'odooSuite' | 'integrationLayer' | 'salesforceSri' | 'automationBilling' | 'biInsights'
type ProjectCategory = 'odoo' | 'integrations' | 'automation' | 'bi'

interface Project {
  id: ProjectId
  category: ProjectCategory
  technologies: string[]
  link?: string
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Juan Diego Salazar Vivas",
    role: "Odoo Developer & Full Stack",
    years: 4,
    focus: {
      en: "Secure Odoo 16 customisations with zero-trust finance workflows",
      es: "Personalizaciones Odoo 16 seguras con flujos financieros zero-trust"
    },
    summary: {
      en: "Designs Odoo modules covering zero trust access, Ecuadorian tax compliance, and responsive UIs while coaching business users.",
      es: "Diseña módulos Odoo con zero trust, retenciones ecuatorianas y UIs responsive mientras capacita a los usuarios de negocio."
    },
    experiences: {
      en: [
        "Odoo Developer (2023–2025): Zero Trust Access Management module, Ecuador withholding flows, and view validations.",
        "Full Stack Developer (2021–2023): Responsive React apps, API integrations, and React Native apps published on GitHub."
      ],
      es: [
        "Odoo Developer (2023–2025): módulo de Zero Trust Access Management, retenciones del SRI y validaciones de vistas.",
        "Full Stack Developer (2021–2023): apps React responsive, integraciones API y apps React Native publicadas en GitHub."
      ]
    },
    skills: ["Odoo 16", "Zero Trust access", "React Native"],
    skillBars: [
      { name: "Python / Odoo", level: 90 },
      { name: "JavaScript (React, Node, React Native)", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "Git / GitHub", level: 88 },
      { name: "HTML / CSS / Responsive", level: 84 },
      { name: "User enablement & training", level: 87 }
    ],
    certifications: {
      en: ["Full Stack Developer (JavaScript & React)", "Responsive Web Design"],
      es: ["Full Stack Developer (JavaScript & React)", "Responsive Web Design"]
    },
    languages: {
      en: ["Spanish (Native)", "English (B2 • Upper-intermediate)"],
      es: ["Español (Nativo)", "Inglés (B2 • Intermedio alto)"]
    },
    linkedin: "https://linkedin.com/in/juan-salazar",
    github: "https://github.com/juan-salazar",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Angelo Iván Alejandro Vera",
    role: "Senior Odoo & Integration Lead",
    years: 9,
    focus: {
      en: "Enterprise Odoo and GeneXus integrations with fluent English delivery",
      es: "Integraciones enterprise Odoo y GeneXus con inglés fluido"
    },
    summary: {
      en: "Leads manufacturing, finance, and logistics rollouts, hardening CI/CD and multilingual deployments.",
      es: "Lidera despliegues de manufactura, finanzas y logística endureciendo CI/CD y entregas multilingües."
    },
    experiences: {
      en: [
        "Odoo Tech Lead (2016–2025): 9 years orchestrating manufacturing, finance, and logistics modules across LATAM.",
        "Integration Specialist: Deep Java/GeneXus automations, API gateways, and CI/CD governance with fluent English client delivery."
      ],
      es: [
        "Odoo Tech Lead (2016–2025): 9 años orquestando módulos de manufactura, finanzas y logística en LATAM.",
        "Integration Specialist: automatizaciones Java/GeneXus, API gateways y gobierno CI/CD con entrega fluida en inglés."
      ]
    },
    skills: ["Odoo architecture", "GeneXus", "CI/CD governance"],
    skillBars: [
      { name: "Python / Odoo", level: 96 },
      { name: "Java / GeneXus", level: 92 },
      { name: "JavaScript & Integrations", level: 88 },
      { name: "PostgreSQL", level: 89 },
      { name: "Git / DevOps", level: 90 },
      { name: "Solution mentorship", level: 85 }
    ],
    certifications: {
      en: ["GeneXus Advanced Developer", "Odoo Enterprise Specialist (internal)"],
      es: ["GeneXus Advanced Developer", "Especialista Odoo Enterprise (interno)"]
    },
    languages: {
      en: ["Spanish (Native)", "English (C1 • Fluent)"],
      es: ["Español (Nativo)", "Inglés (C1 • Fluido)"]
    },
    linkedin: "https://linkedin.com/in/angelo-vera",
    github: "https://github.com/angelo-vera",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Angelo Haro",
    role: "Salesforce Integration Developer",
    years: 3,
    focus: {
      en: "CRM automations bridging Salesforce and Odoo",
      es: "Automatizaciones CRM que conectan Salesforce y Odoo"
    },
    summary: {
      en: "Builds mid-market CRM flows, integrates APIs, and supports customer enablement with pragmatic documentation.",
      es: "Construye flujos CRM mid-market, integra APIs y apoya la capacitación de clientes con documentación pragmática."
    },
    experiences: {
      en: [
        "Salesforce Developer (2022–present): Lightning components, Apex services, and SOQL automation.",
        "Integration Analyst: Syncs Salesforce with Odoo inventory and billing signals for regional teams."
      ],
      es: [
        "Salesforce Developer (2022–actualidad): componentes Lightning, servicios Apex y automatización SOQL.",
        "Integration Analyst: sincroniza Salesforce con señales de inventario y facturación de Odoo para equipos regionales."
      ]
    },
    skills: ["Salesforce", "API integrations", "Trailhead"],
    skillBars: [
      { name: "Salesforce (Apex & Flow)", level: 72 },
      { name: "API Integration", level: 70 },
      { name: "Odoo Connector", level: 65 },
      { name: "JavaScript", level: 68 },
      { name: "Documentation", level: 74 }
    ],
    certifications: {
      en: ["Salesforce Trailhead Admin Journey"],
      es: ["Salesforce Trailhead Admin Journey"]
    },
    languages: {
      en: ["Spanish (Native)", "English (B1 • Conversational)"],
      es: ["Español (Nativo)", "Inglés (B1 • Conversacional)"]
    },
    linkedin: "https://linkedin.com/in/angelo-haro",
    github: "https://github.com/angelo-haro",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Alex Fabricio Rosero",
    role: "Frontend Developer",
    years: 2,
    focus: {
      en: "Accessible front-ends with component libraries",
      es: "Front-ends accesibles con librerías de componentes"
    },
    summary: {
      en: "Delivers responsive layouts, Tailwind-based design systems, and QA support for product launches.",
      es: "Entrega maquetas responsive, sistemas de diseño con Tailwind y soporte QA para lanzamientos de producto."
    },
    experiences: {
      en: [
        "Frontend Developer (2023–present): React + TypeScript dashboards and marketing sites.",
        "UI Support: Implements reusable components and accessibility fixes for internal squads."
      ],
      es: [
        "Frontend Developer (2023–actualidad): dashboards y sitios marketing con React + TypeScript.",
        "UI Support: implementa componentes reutilizables y ajustes de accesibilidad para squads internos."
      ]
    },
    skills: ["React", "TypeScript", "Tailwind"],
    skillBars: [
      { name: "React & TypeScript", level: 70 },
      { name: "Tailwind / CSS", level: 72 },
      { name: "Design Systems", level: 65 },
      { name: "Testing & QA", level: 60 },
      { name: "Accessibility", level: 58 }
    ],
    certifications: {
      en: ["Internal UI Components Playbook"],
      es: ["Playbook interno de componentes UI"]
    },
    languages: {
      en: ["Spanish (Native)", "English (A2 • Basic)"],
      es: ["Español (Nativo)", "Inglés (A2 • Básico)"]
    },
    linkedin: "https://linkedin.com/in/alex-rosero",
    github: "https://github.com/alex-rosero",
    avatar: "/api/placeholder/300/300"
  }
]

const projects: Project[] = [
  {
    id: 'odooSuite',
    category: 'odoo',
    technologies: ['Odoo Manufacturing', 'PostgreSQL', 'Docker', 'CI/CD'],
    image: '/api/placeholder/600/400',
    link: 'https://github.com/robocode-team/odoo-manufacturing'
  },
  {
    id: 'integrationLayer',
    category: 'integrations',
    technologies: ['Odoo API', 'MuleSoft', 'Azure Service Bus', 'PostgreSQL'],
    image: '/api/placeholder/600/400',
    link: 'https://github.com/robocode-team/odoo-integrations'
  },
  {
    id: 'salesforceSri',
    category: 'integrations',
    technologies: ['Salesforce Apex', 'Salesforce Flow', 'SRI API', 'AWS Lambda'],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'automationBilling',
    category: 'automation',
    technologies: ['Odoo Accounting', 'Celery', 'Redis', 'Stripe'],
    image: '/api/placeholder/600/400',
    link: 'https://github.com/robocode-team/odoo-automation'
  },
  {
    id: 'biInsights',
    category: 'bi',
    technologies: ['Odoo Data Lake', 'Power BI', 'Python', 'dbt'],
    image: '/api/placeholder/600/400',
    link: 'https://github.com/robocode-team/odoo-bi-insights'
  }
]

const blogPosts: BlogPost[] = [
  {
    id: "odoo-integration-blueprint",
    title: "Modernizando Odoo con integraciones críticas",
    excerpt: "Cómo diseñamos una arquitectura modular para conectar Odoo con servicios de logística, finanzas y BI sin detener la operación.",
    content: "Compartimos nuestro enfoque para extender Odoo más allá de sus capacidades estándar. Hablamos de colas de mensajes para procesos asíncronos, pruebas automáticas para cada integración y patrones de observabilidad que permiten detectar incidencias antes de que impacten al negocio.",
    author: "Equipo Robocode",
    date: "2024-02-18",
    tags: ["Odoo", "Integraciones", "Arquitectura"]
  },
  {
    id: "salesforce-automation-playbook",
    title: "Automatización avanzada en Salesforce",
    excerpt: "Lecciones aprendidas construyendo flujos complejos con Apex, Lightning y orquestaciones que aceleran el ciclo comercial.",
    content: "Exploramos cómo modelar reglas de negocio en Salesforce sin sacrificar mantenibilidad. Cubrimos el uso de Apex para servicios críticos, la gobernanza de datos en integraciones externas y las métricas que seguimos para medir el impacto en ventas.",
    author: "Robocode Labs",
    date: "2024-03-05",
    tags: ["Salesforce", "Automatización", "CRM"]
  },
  {
    id: "frontend-enterprise-experience",
    title: "Experiencias front-end que impulsan adopción",
    excerpt: "Buenas prácticas que aplicamos en portales empresariales para lograr interfaces rápidas, accesibles y fáciles de usar.",
    content: "Detallamos nuestra guía para crear front-ends empresariales: sistemas de diseño consistentes, microinteracciones que comunican estado y estrategias de performance que mantienen la fluidez incluso con datos complejos.",
    author: "Angelo Vera",
    date: "2024-04-10",
    tags: ["Frontend", "UX", "Performance"]
  }
]

function App(): React.JSX.Element {
  const { t, i18n } = useTranslation()
  
  // Initialize state with proper error handling
  const [activeSection, setActiveSection] = useState<string>('home')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language)
  const [showAdmin, setShowAdmin] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  
  // Initialize contact form with useKV hook
  const [contactForm, setContactForm] = useKV<ContactForm>('contact-form', {
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {   
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight - 100 // Hero section height minus navbar
      setScrolled(scrollPosition > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check for admin route
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/admin' || path.startsWith('/admin/')) {
      setShowAdmin(true)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
    setCurrentLanguage(newLang)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm?.name || !contactForm?.email || !contactForm?.message) {
      toast.error(t('messages.error'))
      return
    }

    try {
      await contactAPI.send({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message
      })
      
      toast.success(t('messages.success'))
      setContactForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('There was an error sending your message. Please try again.')
    }
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const categories: Array<ProjectCategory | 'all'> = ['all', ...Array.from(new Set(projects.map(p => p.category)))]
  const heroStats = ['implementation', 'savings', 'nps'] as const
  const trustLogos = t('trust.logos', { returnObjects: true }) as string[]
  const trustTestimonial = t('trust.testimonial', { returnObjects: true }) as {
    quote: string
    author: string
    role: string
    cta: string
  }
  const locale: LocaleKey = currentLanguage.startsWith('es') ? 'es' : 'en'

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'portfolio', label: t('nav.portfolio') },
    { key: 'blog', label: t('nav.blog') },
    { key: 'contact', label: t('nav.contact') }
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category: ProjectCategory | 'all') =>
    category === 'all' ? t('portfolio.all') : t(`portfolio.categories.${category}`)

  const getProjectCopy = (projectId: ProjectId) => {
    const baseKey = `portfolio.projects.${projectId}` as const
    const features = t(`${baseKey}.features`, { returnObjects: true }) as string[]
    const meta = t(`${baseKey}.meta`, { returnObjects: true }) as {
      stack: string[]
      duration: string
      impact: string
    }

    return {
      title: t(`${baseKey}.title`),
      description: t(`${baseKey}.description`),
      fullDescription: t(`${baseKey}.fullDescription`),
      client: t(`${baseKey}.client`),
      features,
      meta
    }
  }

  return (
    <AuthProvider>
      {showAdmin ? (
        <AdminPanel />
      ) : (
        <div className="min-h-screen bg-background">
          <Toaster position="top-right" richColors />
          {/* Navigation */}
          <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              scrolled
                ? 'bg-[#040b1f]/95 border-b border-white/10 backdrop-blur-xl shadow-lg'
                : 'bg-transparent backdrop-blur-md'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 ${
                      scrolled
                        ? 'bg-gradient-to-br from-[#7ad7ff] via-[#8fd4ff] to-[#c39bff] shadow-[0_18px_40px_-22px_rgba(128,200,255,0.7)]'
                        : 'border border-[#e4d6c5] bg-white/80 backdrop-blur-md'
                    }`}
                  >
                    <Code className={`h-5 w-5 ${scrolled ? 'text-white' : 'text-[#1f2a44]'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                        scrolled ? 'text-white' : 'text-[#1f2a44]'
                      }`}
                    >
                      Robocode
                    </span>
                    <span
                      className={`text-xs font-medium transition-colors duration-300 ${
                        scrolled ? 'text-[#a5b4e1]' : 'text-[#6d768d]'
                      }`}
                    >
                      Professional Development
                    </span>
                  </div>
                </motion.div>

                <div className="hidden items-center gap-1 lg:flex">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.key
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => scrollToSection(item.key)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? scrolled
                              ? 'bg-white/15 text-white shadow-[0_10px_30px_-18px_rgba(122,215,255,0.7)] border border-white/20 backdrop-blur-md'
                              : 'bg-white text-[#1f2a44] shadow-[0_10px_30px_-18px_rgba(155,131,105,0.45)] border border-[#ddcdbd]'
                            : scrolled
                              ? 'text-white/70 hover:text-white hover:bg-white/10'
                              : 'text-[#38425c]/80 hover:text-[#111b30] hover:bg-white/70'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                    className={`items-center gap-2 rounded-full border bg-transparent transition-all duration-300 ${
                      scrolled
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-[#e2d6c6] text-[#1f2a44] hover:bg-white hover:text-[#0f172a]'
                    }`}
                  >
                    <Globe size={16} />
                    <span>{currentLanguage.toUpperCase()}</span>
                  </Button>
                  <Button
                    onClick={() => scrollToSection('contact')}
                    size="sm"
                    className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7ad7ff] via-[#8fd4ff] to-[#c39bff] px-6 text-sm font-semibold text-[#041021] shadow-[0_18px_40px_-20px_rgba(128,200,255,0.6)] hover:opacity-90"
                  >
                    {t('nav.quoteProject')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.location.pathname = '/admin'
                      setShowAdmin(true)
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      scrolled
                        ? 'text-[#a5b4e1] hover:text-white hover:bg-white/10'
                        : 'text-[#4f5a76] hover:text-[#1f2a44] hover:bg-white/70'
                    }`}
                  >
                    <Gear className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    className={`rounded-full ${
                      scrolled
                        ? 'text-[#a5b4e1] hover:text-white hover:bg-white/10'
                        : 'text-[#4f5a76] hover:text-[#1f2a44] hover:bg-white/70'
                    }`}
                  >
                    <Globe size={16} />
                  </Button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className={`rounded-full p-2 transition-all duration-300 ${
                      mobileMenuOpen
                        ? 'bg-white/80 text-[#1f2a44]'
                        : 'text-[#4f5a76] hover:text-[#1f2a44] hover:bg-white/70'
                    }`}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t border-white/10 bg-[#040b1f]/95 backdrop-blur-xl"
                >
                  <div className="space-y-1 px-4 py-4">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.key
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => scrollToSection(item.key)}
                          className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-white/10 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-white/70 hover:text-white"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        window.location.pathname = '/admin'
                        setShowAdmin(true)
                      }}
                    >
                      <Gear className="h-4 w-4" />
                      Admin Panel
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-white/70 hover:text-white"
                      onClick={() => {
                        toggleLanguage()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <Globe size={16} />
                      Language: {currentLanguage.toUpperCase()}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Hero Section */}
          <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f8ff] to-[#eef7ff] pt-32 pb-24">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-20 left-10 w-32 h-32 border border-[#e6d5c2] rounded-full animate-pulse"></div>
              <div className="absolute top-40 right-20 w-20 h-20 border border-[#e6d5c2] rounded-lg rotate-45 animate-pulse delay-300"></div>
              <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-[#e6d5c2] rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-[#e6d5c2] rounded-lg rotate-12 animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-[#e4d6c5]">
                    <Code className="w-12 h-12 text-[#1f2a44]" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-[#1f2a44] mb-6 leading-tight">
                    {t('home.heroTitle')} <br />
                    <span className="bg-gradient-to-r from-[#5cb4bf] via-[#6ea4f8] to-[#8d72ff] bg-clip-text text-transparent">
                      {t('home.heroHighlight')}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-[#4d5b75] mb-4 max-w-4xl mx-auto">
                    {t('home.heroDescription')}
                  </p>
                  <p className="text-base md:text-lg text-[#6f7b91] mb-10 max-w-3xl mx-auto">
                    {t('home.motto')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {heroStats.map((stat) => (
                      <div key={stat} className="text-center bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-8 shadow-[0_18px_40px_-28px_rgba(76,115,173,0.6)] border border-[#dfe7f7]">
                        <div className="text-3xl md:text-4xl font-bold text-[#1f3b5d] mb-3">
                          {t(`home.stats.${stat}.value`)}
                        </div>
                        <div className="text-sm text-[#4f5a76] font-medium uppercase tracking-wide">
                          {t(`home.stats.${stat}.label`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-10"
                >
                  <p className="text-sm text-[#6f7b91] uppercase tracking-wide mb-4">{t('home.specializedIn')}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-[#e3d5c3] text-[#1f2a44] hover:bg-white">
                      {t('home.technologies.odooErp')}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-[#e3d5c3] text-[#1f2a44] hover:bg-white">
                      {t('home.technologies.salesforceCrm')}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-[#e3d5c3] text-[#1f2a44] hover:bg-white">
                      {t('home.technologies.reactNode')}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-[#e3d5c3] text-[#1f2a44] hover:bg-white">
                      {t('home.technologies.integrationsApi')}
                    </Badge>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={() => scrollToSection('portfolio')}
                    className="bg-[#1f2a44] text-white hover:bg-[#142037] px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    {t('home.viewWork')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 text-lg font-medium border-2 border-[#e0d2c1] text-[#1f2a44] hover:bg-white hover:border-[#d4c4b1] transition-all backdrop-blur-sm"
                    size="lg"
                  >
                    {t('home.getQuote')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

      {/* Trust & Credibility Section - PHASE 2 */}
  <section className="py-20 bg-gradient-to-b from-[#efe1cf] via-[#edf2ff] to-[#dff0ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1f2a44] mb-6">
              {t('trust.title')} <span className="text-[#365d9c]">{t('trust.subtitle')}</span>
            </h2>
            <p className="text-xl text-[#4f5a76] max-w-3xl mx-auto">
              {t('trust.description')}
            </p>
          </motion.div>

          {/* Enhanced Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { key: "projects", icon: CheckCircle },
              { key: "satisfaction", icon: Users },
              { key: "support", icon: Gear },
              { key: "experience", icon: Calendar }
            ].map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-2">
                      {t(`trust.stats.${stat.key}.number`)}
                    </h3>
                    <p className="text-sm md:text-base text-[#4f5a76] font-medium">
                      {t(`trust.stats.${stat.key}.label`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-[#d4c4b1]/60 shadow-sm"
            >
              <h3 className="text-center text-lg font-semibold text-[#4f5a76] mb-8 uppercase tracking-wide">
                {t('trust.clients')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
                {trustLogos.map((client) => (
                  <div
                    key={client}
                    className="h-14 rounded-xl border border-[#d4c4b1]/40 bg-gradient-to-br from-white to-[#f5f9ff] flex items-center justify-center text-center px-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="text-sm md:text-base font-semibold text-[#1f2a44] tracking-wide">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-[#101d3b] text-white shadow-2xl">
                <CardContent className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <Quotes className="w-10 h-10 text-[#7ad7ff]" weight="fill" />
                    <p className="mt-6 text-xl leading-relaxed text-white/90">
                      “{trustTestimonial.quote}”
                    </p>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-semibold">{trustTestimonial.author}</p>
                    <p className="text-sm text-white/70">{trustTestimonial.role}</p>
                    <Button
                      variant="secondary"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#101d3b] hover:bg-[#dbeafe]"
                      onClick={() => scrollToSection('portfolio')}
                    >
                      {trustTestimonial.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
  <section id="about" className="py-20 bg-gradient-to-b from-[#dff0ff] via-[#e9f7f4] to-[#f6fdf7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-[#4f5a76] max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-[#e3d8c9] bg-white/85 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f2ebe0] shadow-inner">
                      <Users className="w-10 h-10 text-[#6c7a97]" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-[#1f2a44] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#365d9c] font-medium">
                        {member.role}
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8891a6] mt-2">
                        {locale === 'es' ? `${member.years}+ años de experiencia` : `${member.years}+ years of experience`}
                      </p>
                    </div>

                    <p className="mt-4 text-sm text-[#365d9c] font-semibold text-center">
                      {member.focus[locale]}
                    </p>
                    <p className="mt-2 text-sm text-[#4f5a76] text-center">
                      {member.summary[locale]}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {member.skills.map((skill) => (
                        <Badge
                          key={`${member.name}-${skill}`}
                          variant="secondary"
                          className="text-xs border-0 bg-[#e9f0ff] text-[#1f2a44] shadow-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3 text-left">
                      <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide">
                        {locale === 'es' ? 'Experiencia' : 'Experience'}
                      </h4>
                      <div className="space-y-2">
                        {member.experiences[locale].map((item) => (
                          <div key={`${member.name}-${item}`} className="flex items-start gap-2 text-xs text-[#4f5a76]">
                            <Briefcase className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-left">
                      <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide">
                        Skills
                      </h4>
                      <div className="space-y-3">
                        {member.skillBars.map((skill) => (
                          <div key={`${member.name}-${skill.name}`}>
                            <div className="flex items-center justify-between text-[11px] text-[#4f5a76] mb-1">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="bg-[#e9f0ff]" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid gap-4 text-left text-xs text-[#4f5a76]">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide mb-2">
                          {locale === 'es' ? 'Certificados' : 'Certificates'}
                        </h4>
                        <div className="space-y-1">
                          {member.certifications[locale].map((cert) => (
                            <div key={`${member.name}-${cert}`} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide mb-2">
                          {locale === 'es' ? 'Idiomas' : 'Languages'}
                        </h4>
                        <div className="space-y-1">
                          {member.languages[locale].map((lang) => (
                            <div key={`${member.name}-${lang}`} className="flex items-start gap-2">
                              <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{lang}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-center space-x-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#4f5a76] hover:text-[#365d9c] transition-colors"
                      >
                        <LinkedinLogo size={20} />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#4f5a76] hover:text-[#365d9c] transition-colors"
                      >
                        <GithubLogo size={20} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section - Sora Inspired */}
  <section className="py-20 bg-gradient-to-b from-[#f6fdf7] via-[#fdf4ec] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('services.title')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('services.subtitle')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                key: 'odooErp',
                icon: Gear,
                gradient: "from-green-400 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50",
                technologies: ["Python", "PostgreSQL", "JavaScript", "XML"]
              },
              {
                key: 'salesforce',
                icon: Briefcase,
                gradient: "from-blue-400 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
                technologies: ["Apex", "SOQL", "Lightning", "Visualforce"]
              },
              {
                key: 'webDev',
                icon: Code,
                gradient: "from-purple-400 to-indigo-500",
                bgGradient: "from-purple-50 to-indigo-50",
                technologies: ["React", "Node.js", "TypeScript", "AWS"]
              },
              {
                key: 'consulting',
                icon: Users,
                gradient: "from-orange-400 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                technologies: ["DevOps", "Docker", "CI/CD", "Analytics"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden group-hover:-translate-y-2">
                  {/* Mock Screenshot Header */}
                  <div className={`h-40 bg-gradient-to-br ${service.bgGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Simulated dashboard interface */}
                      <div className="w-full h-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg mx-4 mt-4 mb-2 flex flex-col">
                        <div className="h-6 bg-white/30 rounded-t-lg flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1 p-3 space-y-2">
                          <div className="h-3 bg-white/40 rounded w-3/4"></div>
                          <div className="h-3 bg-white/30 rounded w-1/2"></div>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="h-12 bg-white/40 rounded"></div>
                            <div className="h-12 bg-white/30 rounded"></div>
                          </div>
                          <div className="flex space-x-1 mt-2">
                            <div className="h-2 bg-white/30 rounded flex-1"></div>
                            <div className="h-2 bg-white/20 rounded flex-1"></div>
                            <div className="h-2 bg-white/25 rounded flex-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Icon */}
                    <div className={`absolute -bottom-6 left-6 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform z-10`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <CardHeader className="pt-10 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t(`services.items.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(`services.items.${service.key}.description`)}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-6">
                    <div className="space-y-4">
                      {/* Features List */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t('services.mainFeatures')}</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.keys(t(`services.items.${service.key}.features`, { returnObjects: true }) as object).map((featureKey) => (
                            <div key={featureKey} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {t(`services.items.${service.key}.features.${featureKey}`)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Technology Badges */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t('services.techStack')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <Badge 
                              key={tech} 
                              className={`text-xs px-3 py-1 bg-gradient-to-r ${service.gradient} text-white border-0 hover:shadow-md transition-shadow`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 group-hover:shadow-lg transition-all bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white border-0" 
                        size="sm"
                      >
                        {t('services.learnMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-4">
                {t('process.title')} <span className="text-[#365d9c]">{t('process.subtitle')}</span>
              </h3>
              <p className="text-lg text-[#4f5a76] max-w-2xl mx-auto">
                {t('process.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  key: "strategy"
                },
                {
                  step: "02", 
                  key: "design"
                },
                {
                  step: "03",
                  key: "development"
                }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-bold text-[#1f2a44] mb-2">
                    {t(`process.steps.${process.key}.title`)}
                  </h4>
                  <p className="text-[#4f5a76]">
                    {t(`process.steps.${process.key}.description`)}
                  </p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-8 h-px bg-primary/30 transform translate-x-4"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
  <section id="portfolio" className="py-20 bg-gradient-to-b from-white via-[#f7f2ff] to-[#efe9ff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-4">
              {t('portfolio.title')}
            </h2>
            <p className="text-lg text-[#4f5a76] max-w-2xl mx-auto mb-8">
              {t('portfolio.subtitle')}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const projectCopy = getProjectCopy(project.id)

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    layout
                  >
                    <Card
                      className="h-full cursor-pointer border border-[#dcd0ef] bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7ad7ff] to-[#c39bff] flex items-center justify-center mb-4 shadow-md">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1f2a44] mb-2">
                          {projectCopy.title}
                        </h3>
                        <Badge className="mb-4 border-0 bg-[#efe1ff] text-[#4f3c7f]">
                          {getCategoryLabel(project.category)}
                        </Badge>
                        <p className="text-[#4f5a76] mb-4">
                          {projectCopy.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {projectCopy.meta.stack.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs border-0 bg-[#ecf4ff] text-[#1f2a44]">
                              {item}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
                          <div className="flex items-center gap-2 text-[#365d9c]">
                            <Clock className="w-4 h-4" />
                            {projectCopy.meta.duration}
                          </div>
                          <div className="flex items-center gap-2 text-emerald-600">
                            <ChartLineUp className="w-4 h-4" />
                            {projectCopy.meta.impact}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#4f5a76] mb-6 text-lg max-w-2xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#1f2a44] text-white hover:bg-[#142037] px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {t('portfolio.ctaFullCase')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            (() => {
              const projectCopy = getProjectCopy(selectedProject.id)

              return (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {projectCopy.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image */}
                {selectedProject.image && (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={selectedProject.image} 
                      alt={projectCopy.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('portfolio.modal.clientLabel')}</h3>
                    <p className="text-muted-foreground mb-4">{projectCopy.client || t('portfolio.modal.confidential')}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">{t('portfolio.modal.categoryLabel')}</h3>
                    <Badge variant="outline" className="mb-4">{getCategoryLabel(selectedProject.category)}</Badge>
                    
                    <h3 className="text-lg font-semibold mb-2">{t('portfolio.modal.technologiesLabel')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('portfolio.modal.descriptionLabel')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {projectCopy.fullDescription || projectCopy.description}
                    </p>
                    
                    {selectedProject.link && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(selectedProject.link, '_blank')}
                      >
                        <ArrowSquareOut size={16} className="mr-2" />
                        {t('portfolio.modal.viewProject')}
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Project Features */}
                {projectCopy.features && projectCopy.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('portfolio.modal.featuresLabel')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {projectCopy.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg border border-[#e3d8c9] bg-white/70 p-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide mb-2">{t('portfolio.metaLabels.duration')}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#365d9c]" />
                      {projectCopy.meta.duration}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1f2a44] uppercase tracking-wide mb-2">{t('portfolio.metaLabels.impact')}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChartLineUp className="w-4 h-4 text-emerald-600" />
                      {projectCopy.meta.impact}
                    </p>
                  </div>
                </div>
              </div>
            </>
              )
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* Blog Section */}
  <section id="blog" className="py-20 bg-gradient-to-b from-[#efe9ff] via-[#f9f7fd] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-[#4f5a76] max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          {selectedBlogPost ? (
            /* Blog Post Detail View */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setSelectedBlogPost(null)}
                  className="mb-6"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t('blog.backToBlog')}
                </Button>
                
                <Card className="border border-[#d8d3e8] bg-white/90 backdrop-blur-sm shadow-sm">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-full h-64 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#f9f5ff]">
                        <Article className="w-16 h-16 text-[#6c7a97]" />
                      </div>
                      <h1 className="text-3xl font-bold text-[#1f2a44] mb-4">
                        {selectedBlogPost.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-[#6f7b91] mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {selectedBlogPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedBlogPost.date)}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedBlogPost.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="border-0 bg-[#e9f0ff] text-[#1f2a44]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-[#1f2a44]">
                      <p className="text-lg leading-relaxed text-[#4f5a76]">
                        {selectedBlogPost.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            /* Blog Posts Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full cursor-pointer border border-[#d8d3e8] bg-white/85 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <CardContent className="p-0">
                      <div className="w-full h-48 rounded-t-lg flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#f6f0ff]">
                        <Article className="w-12 h-12 text-[#6c7a97]" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-[#6f7b91] mb-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </div>
                        <h3 className="text-xl font-semibold text-[#1f2a44] mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#4f5a76] mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs border-0 bg-[#e9f0ff] text-[#1f2a44]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#365d9c] hover:text-[#1f2a44]"
                            onClick={() => setSelectedBlogPost(post)}
                          >
                            {t('blog.readMore')}
                            <Eye className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
  <section id="contact" className="py-20 bg-gradient-to-b from-white via-[#f4f7fb] to-[#eaf1f9]">{/* Changed from bg-muted/50 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a44] mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-[#4f5a76] max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder={t('contact.form.name')}
                        value={contactForm?.name || ''}
                        onChange={(e) => setContactForm((prev: ContactForm | undefined) => ({ 
                          name: e.target.value,
                          email: prev?.email || '',
                          message: prev?.message || ''
                        }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder={t('contact.form.email')}
                        value={contactForm?.email || ''}
                        onChange={(e) => setContactForm((prev: ContactForm | undefined) => ({ 
                          name: prev?.name || '',
                          email: e.target.value,
                          message: prev?.message || ''
                        }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder={t('contact.form.message')}
                        value={contactForm?.message || ''}
                        onChange={(e) => setContactForm((prev: ContactForm | undefined) => ({ 
                          name: prev?.name || '',
                          email: prev?.email || '',
                          message: e.target.value
                        }))}
                        className="w-full min-h-32"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      {t('contact.form.send')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#1f2a44] mb-4">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Envelope className="w-5 h-5 text-primary" />
                    <span className="text-[#4f5a76]">{t('contact.info.email')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-[#4f5a76]">{t('contact.info.location')}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-[#1f2a44] mb-4">
                  {t('contact.expertise.title')}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-[#4f5a76]">{t('contact.expertise.items.odoo')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-[#4f5a76]">{t('contact.expertise.items.salesforce')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-[#4f5a76]">{t('contact.expertise.items.web')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-[#4f5a76]">{t('contact.expertise.items.enterprise')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold">Robocode</span>
            </div>
            <p className="text-background/70 mb-6">
              {t('footer.subtitle')}
            </p>
            <p className="text-background/60 text-sm mb-8">
              {t('footer.credit')}
            </p>
            <div className="flex justify-center space-x-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex space-x-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    <LinkedinLogo size={20} />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    <GithubLogo size={20} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
        </div>
      )}
    </AuthProvider>
  )
}

export default App