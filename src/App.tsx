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
import { 
  Code, 
  Users, 
  Briefcase, 
  Mail, 
  Github, 
  LinkedinLogo, 
  ArrowRight,
  CheckCircle,
  X,
  List,
  Globe,
  Article,
  Calendar,
  Eye,
  MapPin
} from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'

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
    technologies: ["Odoo", "Python", "PostgreSQL", "Docker"]
  },
  {
    title: "Sales Force Automation", 
    category: "Salesforce",
    description: "Custom Salesforce solution with Apex triggers, Lightning components, and third-party integrations for lead management.",
    technologies: ["Apex", "Lightning", "SOQL", "REST API"]
  },
  {
    title: "Modern Web Portal",
    category: "Web Development", 
    description: "Responsive web application with real-time features, built with React and modern development practices.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"]
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
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language)
  
  // Initialize contact form with useKV hook
  const [contactForm, setContactForm] = useKV<ContactForm>('contact-form', {
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

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

    toast.success(t('messages.success'))
    setContactForm({ name: '', email: '', message: '' })
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
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Robocode</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'portfolio', 'blog', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`nav.${section}`)}
                </button>
              ))}
              
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="ml-4"
              >
                <Globe className="w-4 h-4 mr-2" />
                {currentLanguage.toUpperCase()}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4" />
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

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Subtle tech background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-20 h-20 border border-primary rounded-lg rotate-45"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-primary rounded-lg rotate-12"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                {t('home.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                {t('home.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                {t('home.description', { 
                  odoo: t('home.odoo'),
                  salesforce: t('home.salesforce')
                })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                {t('home.viewWork')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3"
              >
                {t('home.getInTouch')}
              </Button>
            </motion.div>
          </div>
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
                        <Github size={20} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                  <Card className="h-full hover:shadow-lg transition-shadow">
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
                    <Mail className="w-5 h-5 text-primary" />
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
                    <Github size={20} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App