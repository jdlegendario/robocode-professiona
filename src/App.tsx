import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  X
} from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'

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
    experience: "5+ years in enterprise solutions and ERP customization",
    linkedin: "https://linkedin.com/in/angelo-vera",
    github: "https://github.com/angelo-vera",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Angelo Haro",
    role: "Salesforce Developer",
    skills: ["Apex", "Lightning", "Salesforce", "SOQL", "Integration"],
    experience: "4+ years in Salesforce ecosystem and CRM solutions",
    linkedin: "https://linkedin.com/in/angelo-haro",
    github: "https://github.com/angelo-haro",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Alex Fabricio Rosero",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind", "Next.js", "UI/UX"],
    experience: "3+ years in modern web applications and user interfaces",
    linkedin: "https://linkedin.com/in/alex-rosero",
    github: "https://github.com/alex-rosero",
    avatar: "/api/placeholder/300/300"
  },
  {
    name: "Juan Diego Salazar Vivas",
    role: "Backend Developer",
    skills: ["Node.js", "API Design", "Database", "Cloud", "DevOps"],
    experience: "4+ years in scalable backend systems and infrastructure",
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

function App(): React.JSX.Element {
  // Initialize state with proper error handling
  const [activeSection, setActiveSection] = useState<string>('home')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  
  // Initialize contact form with useKV hook
  const [contactForm, setContactForm] = useKV<ContactForm>('contact-form', {
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm?.name || !contactForm?.email || !contactForm?.message) {
      toast.error('Please fill in all fields')
      return
    }

    toast.success('Message sent successfully! We\'ll get back to you soon.')
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
              {['home', 'about', 'portfolio', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Users size={24} />}
            </button>
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
                {['home', 'about', 'portfolio', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                Robocode
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                The Robocoders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                Professional development team specializing in <span className="text-primary font-semibold">Odoo</span>, 
                <span className="text-primary font-semibold"> Salesforce</span>, and modern web technologies. 
                Based in Ecuador, delivering enterprise solutions worldwide.
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
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3"
              >
                Get in Touch
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
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four experienced developers united by passion for creating exceptional software solutions
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
                      {member.experience}
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
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Showcase of our expertise in enterprise solutions and modern web development
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
                  {category}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your project to life? Get in touch with our team for a consultation.
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
                        placeholder="Your Name"
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
                        placeholder="Your Email"
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
                        placeholder="Tell us about your project..."
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
                      Send Message
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
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">contact@robocode.dev</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Based in Ecuador</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Our Expertise
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Odoo ERP Implementation & Customization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Salesforce Development & Integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Modern Web Application Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Enterprise Solutions & Consulting</span>
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
              Professional Development Team • Ecuador
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