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
        contact: "Contact"
      },
      home: {
        title: "Robocode",
        subtitle: "The Robocoders",
        description: "Professional development team specializing in {{odoo}}, {{salesforce}}, and modern web technologies. Based in Ecuador, delivering enterprise solutions worldwide.",
        odoo: "Odoo",
        salesforce: "Salesforce",
        viewWork: "View Our Work",
        getInTouch: "Get in Touch"
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
        contact: "Contacto"
      },
      home: {
        title: "Robocode",
        subtitle: "Los Robocoders",
        description: "Equipo de desarrollo profesional especializado en {{odoo}}, {{salesforce}} y tecnologías web modernas. Con sede en Ecuador, entregamos soluciones empresariales a nivel mundial.",
        odoo: "Odoo",
        salesforce: "Salesforce",
        viewWork: "Ver Nuestro Trabajo",
        getInTouch: "Contáctanos"
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