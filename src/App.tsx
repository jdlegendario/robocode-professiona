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
  ArrowSquareOut
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

interface TeamMember {
  name: string
  role: string
  skills: string[]
  experience: string
  linkedin: string
  github: string
  avatar: string
}

interface Project {
  title: string
  category: string
  description: string
  technologies: string[]
  link?: string
  image?: string
  fullDescription?: string
  features?: string[]
  client?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Angelo Iván Alejandro Vera",
    role: "Senior Full Stack Developer",
    skills: ["Odoo", "Python", "JavaScript", "PostgreSQL", "Docker"],
    experience: "enterprise solutions and ERP customization",
    linkedin: "https://linkedin.com/in/angelo-vera",
    github: "https://github.com/angelo-vera",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Angelo Haro", 
    role: "Salesforce Developer",
    skills: ["Apex", "Lightning", "Salesforce", "SOQL", "Integration"],
    experience: "Salesforce ecosystem and CRM solutions",
    linkedin: "https://linkedin.com/in/angelo-haro",
    github: "https://github.com/angelo-haro",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Alex Fabricio Rosero",
    role: "Frontend Developer", 
    skills: ["React", "TypeScript", "Tailwind", "Next.js", "UI/UX"],
    experience: "modern web applications and user interfaces",
    linkedin: "https://linkedin.com/in/alex-rosero",
    github: "https://github.com/alex-rosero",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Juan Diego Salazar Vivas",
    role: "Backend Developer",
    skills: ["Node.js", "API Design", "Database", "Cloud", "DevOps"],
    experience: "scalable backend systems and infrastructure",
    linkedin: "https://linkedin.com/in/juan-salazar",
    github: "https://github.com/juan-salazar",
    avatar: "/api/placeholder/300/300"
  }
]

const projects: Project[] = [
  {
    title: "Enterprise ERP Customization",
    category: "Odoo",
    description: "Complete Odoo implementation for manufacturing company with custom modules for inventory management and production planning.",
    fullDescription: "We developed a comprehensive ERP solution for a manufacturing company with over 200 employees. The project included custom modules for advanced inventory management, production planning, and quality control. We also integrated third-party logistics systems and implemented automated reporting dashboards.",
    technologies: ["Odoo", "Python", "PostgreSQL", "Docker"],
    image: "/api/placeholder/600/400",
    client: "Manufacturing Corp",
    features: [
      "Custom inventory management module",
      "Production planning and scheduling",
      "Quality control workflows",
      "Third-party logistics integration", 
      "Automated reporting dashboards",
      "Multi-location warehouse management"
    ],
    link: "https://github.com/robocode-team/odoo-manufacturing"
  },
  {
    title: "Sales Force Automation", 
    category: "Salesforce",
    description: "Custom Salesforce solution with Apex triggers, Lightning components, and third-party integrations for lead management.",
    fullDescription: "Built a complete sales automation platform using Salesforce with custom Lightning components, complex Apex triggers, and seamless third-party integrations. The solution increased lead conversion rates by 40% and reduced sales cycle time by 25%.",
    technologies: ["Apex", "Lightning", "SOQL", "REST API"],
    image: "/api/placeholder/600/400",
    client: "SalesForce Inc",
    features: [
      "Custom Lightning Web Components",
      "Advanced Apex trigger framework",
      "Third-party CRM integration",
      "Automated lead scoring system",
      "Custom reporting and analytics",
      "Mobile-responsive design"
    ],
    link: "https://github.com/robocode-team/salesforce-automation"
  },
  {
    title: "Modern Web Portal",
    category: "Web Development", 
    description: "Responsive web application with real-time features, built with React and modern development practices.",
    fullDescription: "Developed a modern, high-performance web portal with real-time collaboration features, advanced authentication, and responsive design. The application serves over 10,000 daily active users with 99.9% uptime.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/api/placeholder/600/400",
    client: "TechCorp Solutions",
    features: [
      "Real-time collaboration tools",
      "Advanced user authentication",
      "Responsive design for all devices",
      "Progressive Web App capabilities",
      "Advanced search and filtering",
      "Integration with cloud services"
    ],
    link: "https://github.com/robocode-team/modern-web-portal"
  }
]

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Odoo Performance for Large Datasets",
    excerpt: "Learn advanced techniques to improve Odoo performance when dealing with millions of records and complex queries.",
    content: "Full article content would go here...",
    author: "Angelo Iván Alejandro Vera",
    date: "2024-01-15",
    image: "/api/placeholder/400/250",
    tags: ["Odoo", "Performance", "PostgreSQL"]
  },
  {
    id: "2", 
    title: "Salesforce Lightning Component Best Practices",
    excerpt: "Discover the latest patterns and practices for building maintainable Lightning components in Salesforce.",
    content: "Full article content would go here...",
    author: "Angelo Haro",
    date: "2024-01-10", 
    image: "/api/placeholder/400/250",
    tags: ["Salesforce", "Lightning", "JavaScript"]
  },
  {
    id: "3",
    title: "Modern React Patterns for Enterprise Applications", 
    excerpt: "Exploring advanced React patterns and state management solutions for large-scale enterprise applications.",
    content: "Full article content would go here...",
    author: "Alex Fabricio Rosero",
    date: "2024-01-05",
    image: "/api/placeholder/400/250", 
    tags: ["React", "TypeScript", "Architecture"]
  }
]

function App(): React.JSX.Element {
  const { t, i18n } = useTranslation()
  
  // Initialize state with proper error handling
  const [activeSection, setActiveSection] = useState<string>('home')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
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

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  return (
    <AuthProvider>
      {showAdmin ? (
        <AdminPanel />
        ) : (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-2xl font-bold drop-shadow-sm transition-colors duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>Robocode</span>
                <div className={`text-xs font-medium drop-shadow-sm transition-colors duration-300 ${
                  scrolled ? 'text-gray-600' : 'text-white/80'
                }`}>Professional Development</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { key: 'home', label: t('nav.home') },
                { key: 'about', label: t('nav.about') },
                { key: 'portfolio', label: t('nav.portfolio') },
                { key: 'blog', label: t('nav.blog') },
                { key: 'contact', label: t('nav.contact') }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.key
                      ? scrolled
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'bg-white/15 text-white shadow-sm border border-white/25 backdrop-blur-sm'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className={`hidden md:flex items-center space-x-1 transition-all duration-300 ${
                  scrolled
                    ? 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 bg-white'
                    : 'border-white/20 text-white/90 hover:bg-white/10 hover:text-white backdrop-blur-sm bg-white/5'
                }`}
              >
                <Globe size={16} />
                <span>{currentLanguage.toUpperCase()}</span>
              </Button>

              {/* CTA Button */}
              <Button
                onClick={() => scrollToSection('contact')}
                className={`hidden md:flex px-6 py-2 font-medium shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                    : 'bg-white/90 text-blue-700 hover:bg-white hover:text-blue-800'
                }`}
                size="sm"
              >
                {t('nav.quoteProject')}
              </Button>

              {/* Admin Access Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.location.pathname = '/admin'
                  setShowAdmin(true)
                }}
                className={`text-xs transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                }`}
              >
                <Gear className="w-3 h-3" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="p-2"
              >
                <Globe size={16} />
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {['home', 'about', 'portfolio', 'blog', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    {t(`nav.${section}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Sora Inspired Design */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-700">
        {/* Sora-style background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        {/* Enhanced geometric elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 border border-white rounded-lg rotate-45 animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-white rounded-lg rotate-12 animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
                <Code className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('home.heroTitle')} <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  {t('home.heroSubtitle')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto">
                {t('home.description')}
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="text-sm text-white/70 uppercase tracking-wide">{t('home.stats.projects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                  <div className="text-sm text-white/70 uppercase tracking-wide">{t('home.stats.experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
                  <div className="text-sm text-white/70 uppercase tracking-wide">{t('home.stats.satisfaction')}</div>
                </div>
              </div>
            </motion.div>

            {/* Technologies badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-sm text-white/70 uppercase tracking-wide mb-4">{t('home.specializedIn')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-white/30 text-white hover:bg-white/10">
                  {t('home.technologies.odooErp')}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-white/30 text-white hover:bg-white/10">
                  {t('home.technologies.salesforceCrm')}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-white/30 text-white hover:bg-white/10">
                  {t('home.technologies.reactNode')}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-white/30 text-white hover:bg-white/10">
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
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                {t('home.viewWork')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 text-lg font-medium border-2 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                size="lg"
              >
                {t('home.getQuote')}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section - PHASE 2 */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('trust.title')} <span className="text-primary">{t('trust.subtitle')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {t(`trust.stats.${stat.key}.number`)}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                      {t(`trust.stats.${stat.key}.label`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Client Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/10"
          >
            <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
              {t('trust.clients')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {/* Placeholder for client logos - replace with real logos */}
              {['Empresa 1', 'Empresa 2', 'Empresa 3', 'Empresa 4'].map((client, index) => (
                <div
                  key={client}
                  className="h-12 bg-muted/30 rounded-lg flex items-center justify-center hover:opacity-100 transition-opacity"
                >
                  <span className="text-sm font-medium text-muted-foreground">{client}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('about.experience', { years: '4', field: member.experience })}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <LinkedinLogo size={20} />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('process.title')} <span className="text-primary">{t('process.subtitle')}</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {t(`process.steps.${process.key}.title`)}
                  </h4>
                  <p className="text-muted-foreground">
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
      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('portfolio.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('portfolio.subtitle')}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category === 'All' ? t('portfolio.all') : category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProject(project)}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <Badge className="mb-4" variant="outline">
                        {project.category}
                      </Badge>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image */}
                {selectedProject.image && (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cliente</h3>
                    <p className="text-muted-foreground mb-4">{selectedProject.client || 'Confidencial'}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">Categoría</h3>
                    <Badge variant="outline" className="mb-4">{selectedProject.category}</Badge>
                    
                    <h3 className="text-lg font-semibold mb-2">Tecnologías</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedProject.fullDescription || selectedProject.description}
                    </p>
                    
                    {selectedProject.link && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(selectedProject.link, '_blank')}
                      >
                        <ArrowSquareOut size={16} className="mr-2" />
                        Ver Proyecto
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Project Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Características Principales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                
                <Card>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-full h-64 bg-muted rounded-lg mb-6 flex items-center justify-center">
                        <Article className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <h1 className="text-3xl font-bold text-foreground mb-4">
                        {selectedBlogPost.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-foreground">
                      <p className="text-lg leading-relaxed">
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
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                        <Article className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
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
      <section id="contact" className="py-20">{/* Changed from bg-muted/50 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Envelope className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{t('contact.info.email')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{t('contact.info.location')}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('contact.expertise.title')}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{t('contact.expertise.items.odoo')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{t('contact.expertise.items.salesforce')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{t('contact.expertise.items.web')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{t('contact.expertise.items.enterprise')}</span>
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