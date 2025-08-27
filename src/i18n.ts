import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        portfolio: "Portfolio", 
        blog: "Blog",
        contact: "Contact",
        quoteProject: "Quote Project"
      },
      home: {
        title: "Robocode",
        subtitle: "The Robocoders",
        description: "Developing complex software systems that drive business growth with cutting-edge technologies.",
        heroTitle: "Enterprise Digital",
        heroSubtitle: "Solutions",
        odoo: "Odoo",
        salesforce: "Salesforce", 
        viewWork: "View Our Projects",
        getQuote: "Request Quote",
        specializedIn: "Specialized in",
        stats: {
          projects: "Successful Projects",
          experience: "Years Experience", 
          satisfaction: "Client Satisfaction"
        },
        technologies: {
          odooErp: "Odoo ERP",
          salesforceCrm: "Salesforce CRM",
          reactNode: "React & Node.js",
          integrationsApi: "Integrations API"
        }
      },
      about: {
        title: "Meet Our Team",
        subtitle: "Four experienced developers united by passion for creating exceptional software solutions",
        experience: "{{years}}+ years in {{field}}"
      },
      portfolio: {
        title: "Our Portfolio",
        subtitle: "Showcase of our expertise in enterprise solutions and modern web development",
        all: "All",
        categories: {
          odoo: "Odoo",
          salesforce: "Salesforce", 
          web: "Web Development"
        }
      },
      blog: {
        title: "Latest Insights",
        subtitle: "Technical articles and industry updates from our team",
        readMore: "Read More",
        backToBlog: "← Back to Blog"
      },
      contact: {
        title: "Let's Work Together",
        subtitle: "Ready to bring your project to life? Get in touch with our team for a consultation.",
        form: {
          name: "Your Name",
          email: "Your Email", 
          message: "Tell us about your project...",
          send: "Send Message"
        },
        info: {
          title: "Get in Touch",
          email: "contact@robocode.dev",
          location: "Based in Ecuador"
        },
        expertise: {
          title: "Our Expertise",
          items: {
            odoo: "Odoo ERP Implementation & Customization",
            salesforce: "Salesforce Development & Integration", 
            web: "Modern Web Application Development",
            enterprise: "Enterprise Solutions & Consulting"
          }
        }
      },
      services: {
        title: "Our Specialized",
        subtitle: "Services",
        description: "Comprehensive technology solutions that drive your company's digital transformation",
        items: {
          odooErp: {
            title: "Odoo ERP Development",
            description: "Complete implementation and customization of enterprise ERP systems",
            features: {
              customModules: "Custom Modules",
              dataMigration: "Data Migration",
              apiIntegration: "API Integration", 
              training: "Training"
            }
          },
          salesforce: {
            title: "Salesforce Solutions",
            description: "Advanced development in the Salesforce ecosystem for sales automation",
            features: {
              apexDev: "Apex Development",
              lightningComponents: "Lightning Components", 
              flowAutomation: "Flow Automation",
              einsteinAi: "Einstein AI"
            }
          },
          webDev: {
            title: "Modern Web Development",
            description: "Scalable web applications with cutting-edge technologies",
            features: {
              reactApps: "React Applications",
              apiDev: "API Development",
              cloudDeploy: "Cloud Deployment",
              mobileResponsive: "Mobile Responsive"
            }
          },
          consulting: {
            title: "Digital Consulting",
            description: "Strategic advisory for technological modernization and optimization",
            features: {
              softwareArch: "Software Architecture",
              codeReview: "Code Review",
              perfOptimization: "Performance Optimization", 
              securityAudit: "Security Audit"
            }
          }
        },
        learnMore: "Learn More",
        mainFeatures: "Main Features:",
        techStack: "Tech Stack:"
      },
      footer: {
        subtitle: "Professional Development Team • Ecuador"
      },
      messages: {
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Please fill in all fields",
        loading: "Loading...",
        notFound: "Page not found"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Nosotros", 
        portfolio: "Portafolio",
        blog: "Blog",
        contact: "Contacto",
        quoteProject: "Cotizar Proyecto"
      },
      home: {
        title: "Robocode",
        subtitle: "Los Robocoders",
        description: "Desarrollamos sistemas complejos de software que impulsan el crecimiento empresarial con tecnologías de vanguardia.",
        heroTitle: "Soluciones Digitales",
        heroSubtitle: "Empresariales",
        odoo: "Odoo",
        salesforce: "Salesforce",
        viewWork: "Ver Nuestros Proyectos",
        getQuote: "Solicitar Cotización",
        specializedIn: "Especializados en",
        stats: {
          projects: "Proyectos Exitosos",
          experience: "Años de Experiencia",
          satisfaction: "Satisfacción Cliente"
        },
        technologies: {
          odooErp: "Odoo ERP",
          salesforceCrm: "Salesforce CRM", 
          reactNode: "React & Node.js",
          integrationsApi: "Integrations API"
        }
      },
      about: {
        title: "Conoce Nuestro Equipo",
        subtitle: "Cuatro desarrolladores experimentados unidos por la pasión de crear soluciones de software excepcionales",
        experience: "{{years}}+ años en {{field}}"
      },
      portfolio: {
        title: "Nuestro Portafolio",
        subtitle: "Muestra de nuestra experiencia en soluciones empresariales y desarrollo web moderno",
        all: "Todos",
        categories: {
          odoo: "Odoo",
          salesforce: "Salesforce",
          web: "Desarrollo Web"
        }
      },
      blog: {
        title: "Últimas Perspectivas",
        subtitle: "Artículos técnicos y actualizaciones de la industria de nuestro equipo",
        readMore: "Leer Más",
        backToBlog: "← Volver al Blog"
      },
      contact: {
        title: "Trabajemos Juntos",
        subtitle: "¿Listo para dar vida a tu proyecto? Ponte en contacto con nuestro equipo para una consulta.",
        form: {
          name: "Tu Nombre",
          email: "Tu Email",
          message: "Cuéntanos sobre tu proyecto...",
          send: "Enviar Mensaje"
        },
        info: {
          title: "Ponte en Contacto",
          email: "contacto@robocode.dev",
          location: "Con sede en Ecuador"
        },
        expertise: {
          title: "Nuestra Experiencia",
          items: {
            odoo: "Implementación y Personalización de Odoo ERP",
            salesforce: "Desarrollo e Integración de Salesforce",
            web: "Desarrollo de Aplicaciones Web Modernas", 
            enterprise: "Soluciones Empresariales y Consultoría"
          }
        }
      },
      services: {
        title: "Nuestros",
        subtitle: "Servicios Especializados",
        description: "Soluciones tecnológicas integrales que impulsan la transformación digital de tu empresa",
        items: {
          odooErp: {
            title: "Desarrollo Odoo ERP",
            description: "Implementación y personalización completa de sistemas ERP empresariales",
            features: {
              customModules: "Módulos Personalizados",
              dataMigration: "Migración de Datos",
              apiIntegration: "Integración APIs",
              training: "Capacitación"
            }
          },
          salesforce: {
            title: "Soluciones Salesforce",
            description: "Desarrollo avanzado en el ecosistema Salesforce para automatización de ventas",
            features: {
              apexDev: "Apex Development",
              lightningComponents: "Lightning Components",
              flowAutomation: "Flow Automation", 
              einsteinAi: "Einstein AI"
            }
          },
          webDev: {
            title: "Desarrollo Web Moderno",
            description: "Aplicaciones web escalables con tecnologías de última generación",
            features: {
              reactApps: "React Applications",
              apiDev: "API Development",
              cloudDeploy: "Cloud Deployment",
              mobileResponsive: "Mobile Responsive"
            }
          },
          consulting: {
            title: "Consultoría Digital",
            description: "Asesoramiento estratégico para modernización y optimización tecnológica",
            features: {
              softwareArch: "Arquitectura de Software",
              codeReview: "Code Review",
              perfOptimization: "Performance Optimization",
              securityAudit: "Security Audit"
            }
          }
        },
        learnMore: "Saber Más",
        mainFeatures: "Características principales:",
        techStack: "Stack tecnológico:"
      },
      footer: {
        subtitle: "Equipo de Desarrollo Profesional • Ecuador"
      },
      messages: {
        success: "¡Mensaje enviado exitosamente! Te contactaremos pronto.",
        error: "Por favor completa todos los campos",
        loading: "Cargando...",
        notFound: "Página no encontrada"
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n