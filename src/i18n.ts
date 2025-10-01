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
  description: "Designing multi-cloud CRM, ERP, and web products that accelerate revenue teams.",
  heroTitle: "Deliver measurable impact with",
  heroHighlight: "specialized Salesforce, Odoo & web teams",
  heroDescription: "We architect CRM, ERP, and product experiences in ≤5 weeks with a cross-functional certified squad.",
        odoo: "Odoo",
        salesforce: "Salesforce", 
        viewWork: "View Our Projects",
        getQuote: "Request Quote",
    specializedIn: "Specialized in",
    motto: "A young and dynamic team with the vision and energy to transform the world.",
        stats: {
          implementation: {
            value: "4-5 weeks",
            label: "Average rollout across Salesforce & Odoo"
          },
          savings: {
            value: "-35%",
            label: "Average operations savings delivered"
          },
          nps: {
            value: "87 NPS",
          salesforceSri: {
            title: "Facturación electrónica Salesforce en tiempo real",
            description: "Automatización del ciclo de facturas con el API del SRI Ecuador.",
            fullDescription: "Construimos una experiencia gestionada en Salesforce que genera facturas electrónicas, las firma digitalmente y las envía al SRI en tiempo real. La plataforma reconcilia estados de aprobación, dispara notificaciones y sincroniza documentos fiscales con ERP y BI.",
            client: "Scale-up SaaS • Ecuador",
            features: [
              "Salesforce Flow orquestando eventos de facturación",
              "Generación de firma digital y sobres XML",
              "Monitoreo en tiempo real del estado SRI con reintentos",
              "Sincronización bidireccional con ERP y data lake"
            ],
            meta: {
              stack: ["Salesforce Apex", "Salesforce Flow", "API SRI", "AWS Lambda"],
              duration: "5 semanas",
              impact: "100% de cumplimiento con aprobaciones en minutos"
            }
          },
            label: "CRM, ERP & web engagements delivered"
          }
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
        subtitle: "Salesforce, Odoo, and web delivery highlights for enterprise teams",
        all: "All",
        categories: {
          odoo: "Odoo",
          integrations: "Salesforce & Integrations",
          automation: "Automation",
          bi: "Business Intelligence"
        },
        projects: {
          odooSuite: {
            title: "Odoo supply chain suite",
            description: "Odoo 16 rollout for APY with payment governance, credit control, and logistics orchestration.",
            fullDescription: "We modernised Antonio Pino Ycaza Cía. Ltda.'s Odoo 16 estate across payments, sales, credit control, and logistics. The programme delivered a self-consumption governance model, reinforced stock and approval flows, and introduced CI/CD instrumentation for safe releases.",
            client: "Antonio Pino Ycaza Cía. Ltda. • Ecuador",
            features: [
              "Payment and self-consumption flow with confirmation traceability and custom schemas",
              "Sales controls with credit blocks, stock validations, and SRI-compliant workflows",
              "Warehouse and finance logistics orchestration with tiered approvals and cron jobs",
              "Executive reporting and Advanced Access Control with cleaned manifests and dashboards"
            ],
            meta: {
              stack: ["Odoo 16", "Python", "PostgreSQL", "XML", "JavaScript", "CSS", "Git"],
              duration: "5 weeks",
              impact: "Cash-sale delinquencies held under 3% and 35% fewer reconciliation incidents"
            }
          },
          integrationLayer: {
            title: "Financial integrations hub",
            description: "Unified middleware connecting Odoo with banking, CRM, and BI stacks.",
            fullDescription: "We launched a resilient integration layer synchronising transactions between Odoo, global banking APIs, Salesforce, and Power BI. Asynchronous queues and automated reconciliation guarantee clean data in every downstream system.",
            client: "Fintech scale-up • North America",
            features: [
              "Banking connectors with automatic reconciliation",
              "CRM enrichment and 360º customer view",
              "Event-driven architecture with observability dashboards",
              "Disaster-recovery playbooks and runbooks"
            ],
            meta: {
              stack: ["Odoo API", "MuleSoft", "Azure Service Bus", "Grafana"],
              duration: "6 weeks",
              impact: "99.7% sync accuracy across platforms"
            }
          },
          salesforceSri: {
            title: "Salesforce real-time e-invoicing",
            description: "Invoice lifecycle automation with Ecuador SRI API compliance.",
            fullDescription: "We built a managed Salesforce experience that generates electronic invoices, signs them digitally, and submits them to Ecuador's SRI in real time. The platform reconciles approval states, triggers notifications, and syncs fiscal documents with ERP and BI systems.",
            client: "SaaS scale-up • Ecuador",
            features: [
              "Salesforce Flow orchestrating billing events",
              "Digital signature and XML envelope generation",
              "Real-time SRI status tracking with retries",
              "Two-way sync with ERP ledger and data lake"
            ],
            meta: {
              stack: ["Salesforce Apex", "Salesforce Flow", "SRI API", "AWS Lambda"],
              duration: "5 weeks",
              impact: "100% compliance with sub-minute approvals"
            }
          },
          automationBilling: {
            title: "Subscription billing automation",
            description: "Automated invoicing, dunning, and revenue recognition for SaaS operations.",
            fullDescription: "We modernised a SaaS billing workflow by orchestrating Odoo Accounting, Stripe, and custom Celery workers. The result: automated invoicing, dunning journeys, and GAAP-compliant revenue recognition with near real-time dashboards.",
            client: "SaaS provider • United States",
            features: [
              "Usage-based billing and proration rules",
              "Automated dunning with multi-channel outreach",
              "Revenue recognition aligned with ASC 606",
              "Executive dashboard with predictive churn KPIs"
            ],
            meta: {
              stack: ["Odoo Accounting", "Stripe", "Celery", "Redis"],
              duration: "4 weeks",
              impact: "+40% B2B conversion after automation"
            }
          },
          biInsights: {
            title: "Executive BI for Odoo",
            description: "Data lake and dashboards delivering near real-time KPIs across operations.",
            fullDescription: "We created a governed analytics layer pulling clean data from Odoo into a dbt-powered warehouse and Power BI dashboards. Leadership gained actionable KPIs, cohort analysis, and automated alerts for anomalies.",
            client: "Retail conglomerate • LATAM",
            features: [
              "dbt models with automated data quality checks",
              "Self-service dashboards for finance and ops",
              "Anomaly detection with proactive notifications",
              "Data lake architecture with role-based access"
            ],
            meta: {
              stack: ["Odoo Data Lake", "dbt", "Power BI", "Python"],
              duration: "7 weeks",
              impact: "+28% faster decision cycles"
            }
          }
        },
        metaLabels: {
          stack: "Stack",
          duration: "Duration",
          impact: "Impact"
        },
        ctaFullCase: "Request full case study",
        modal: {
          clientLabel: "Client",
          categoryLabel: "Category",
          technologiesLabel: "Technologies",
          descriptionLabel: "Description",
          featuresLabel: "Key Features",
          viewProject: "View Project",
          confidential: "Confidential"
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
          location: "Based in Guayaquil, Ecuador"
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
  description: "Multi-cloud squads delivering Salesforce, Odoo, and full-stack product launches",
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
            description: "Revenue, service, and marketing automation across the Salesforce platform",
            features: {
              apexDev: "Apex Development",
              lightningComponents: "Lightning Components", 
              flowAutomation: "Flow Automation",
              einsteinAi: "Einstein AI"
            }
          },
          webDev: {
            title: "Modern Web Development",
            description: "React, Node.js, and UX teams crafting scalable digital products",
            features: {
              reactApps: "React Applications",
              apiDev: "API Development",
              cloudDeploy: "Cloud Deployment",
              mobileResponsive: "Mobile Responsive"
            }
          },
          consulting: {
            title: "Digital Consulting",
            description: "Strategic advisory spanning CRM, ERP, and product modernization",
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
      trust: {
        title: "Trusted by",
        subtitle: "Industry Leaders",
  description: "Over 5 years shipping Salesforce, Odoo, and product programs with measurable outcomes",
        stats: {
          projects: {
            number: "200+",
            label: "Cross-cloud programs delivered"
          },
          satisfaction: {
            number: "98%",
            label: "Client satisfaction across CRM, ERP & web"
          },
          support: {
            number: "24/7",
            label: "Follow-the-sun technical support"
          },
          experience: {
            number: "5+",
            label: "Years orchestrating CRM/ERP transformations"
          }
        },
          clients: "Companies that trust our solutions",
          logos: ["Andina Foods", "Finanzas360", "LogistiCore", "Flux Retail"],
          testimonial: {
            quote: "+40% B2B conversion after automating billing and collections.",
            author: "Laura Peña",
            role: "CFO • Mid-market SaaS LATAM",
            cta: "Read full success story"
          }
      },
      process: {
        title: "Our Work",
        subtitle: "Process",
        description: "A proven methodology that ensures exceptional results in every project",
        steps: {
          strategy: {
            title: "Strategy",
            description: "In-depth needs analysis and technical architecture definition"
          },
          design: {
            title: "Design",
            description: "Prototyping and interface design focused on user experience"
          },
          development: {
            title: "Development",
            description: "Agile implementation with continuous testing and automated deployment"
          }
        }
      },
      footer: {
        subtitle: "Professional Development Team • Ecuador",
        credit: "Developed by Robocode"
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
  description: "Diseñamos productos CRM, ERP y web multicloud que aceleran a los equipos comerciales.",
  heroTitle: "Impulsa resultados medibles con",
  heroHighlight: "equipos expertos en Salesforce, Odoo y web",
  heroDescription: "Diseñamos experiencias CRM, ERP y productos digitales en ≤5 semanas con una escuadra certificada multidisciplinaria.",
        odoo: "Odoo",
        salesforce: "Salesforce",
        viewWork: "Ver Nuestros Proyectos",
        getQuote: "Solicitar Cotización",
    specializedIn: "Especializados en",
    motto: "Un equipo joven y dinámico, con la visión y la energía para transformar el mundo.",
        stats: {
          implementation: {
            value: "4-5 semanas",
            label: "Despliegue promedio en Salesforce y Odoo"
          },
          savings: {
            value: "-35%",
            label: "Ahorro operativo promedio logrado"
          },
          nps: {
            value: "87 NPS",
            label: "Proyectos CRM, ERP y web entregados"
          }
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
        subtitle: "Casos destacados en Salesforce, Odoo y experiencias web para empresas",
        all: "Todos",
        categories: {
          odoo: "Odoo",
          integrations: "Salesforce e Integraciones",
          automation: "Automatización",
          bi: "Business Intelligence"
        },
        projects: {
          odooSuite: {
            title: "Suite Odoo para cadena de suministro",
            description: "Implementación Odoo 16 para APY con gobierno de pagos, crédito y logística integrada.",
            fullDescription: "Modernizamos el ecosistema Odoo 16 de Antonio Pino Ycaza Cía. Ltda. cubriendo pagos, ventas, control de crédito y logística. Entregamos un modelo de autoconsumo gobernado, reforzamos validaciones de stock y aprobaciones, e instrumentamos CI/CD para despliegues seguros.",
            client: "Antonio Pino Ycaza Cía. Ltda. • Ecuador",
            features: [
              "Flujo de pagos y autoconsumo con trazabilidad de confirmación y esquemas personalizados",
              "Controles comerciales con bloqueos crediticios, validaciones de stock y cumplimiento SRI",
              "Logística-finanzas orquestada con permisos de bodega, base_tier_validation y cron jobs",
              "Reportes ejecutivos APY y Advanced Access Control con vistas depuradas y dashboards"
            ],
            meta: {
              stack: ["Odoo 16", "Python", "PostgreSQL", "XML", "JavaScript", "CSS", "Git"],
              duration: "5 semanas",
              impact: "Impagos contado/crédito corto < 3% y -35% incidencias en conciliación"
            }
          },
          integrationLayer: {
            title: "Hub de integraciones financieras",
            description: "Middleware unificado que conecta Odoo con banca, CRM y BI.",
            fullDescription: "Implementamos una capa de integraciones resiliente que sincroniza transacciones entre Odoo, APIs bancarias globales, Salesforce y Power BI. Colas asíncronas y conciliación automática aseguran datos limpios en todos los sistemas.",
            client: "Fintech en escala • Norteamérica",
            features: [
              "Conectores bancarios con conciliación automática",
              "Enriquecimiento CRM y vista 360° del cliente",
              "Arquitectura orientada a eventos con observabilidad",
              "Playbooks de recuperación ante desastres"
            ],
            meta: {
              stack: ["API Odoo", "MuleSoft", "Azure Service Bus", "Grafana"],
              duration: "6 semanas",
              impact: "99.7% de exactitud en sincronizaciones"
            }
          },
          salesforceSri: {
            title: "Facturación electrónica Salesforce en tiempo real",
            description: "Automatización integral de facturas con cumplimiento SRI Ecuador.",
            fullDescription: "Construimos una experiencia gestionada en Salesforce que genera facturas electrónicas, las firma digitalmente y las envía al SRI en tiempo real. La plataforma reconcilia estados de aprobación, dispara notificaciones y sincroniza documentos fiscales con ERP y BI.",
            client: "Scale-up SaaS • Ecuador",
            features: [
              "Salesforce Flow orquestando eventos de facturación",
              "Generación de firma digital y sobres XML",
              "Seguimiento SRI en tiempo real con reintentos",
              "Sincronización bidireccional con ERP y data lake"
            ],
            meta: {
              stack: ["Salesforce Apex", "Salesforce Flow", "API SRI", "AWS Lambda"],
              duration: "5 semanas",
              impact: "100% de cumplimiento con aprobaciones en minutos"
            }
          },
          automationBilling: {
            title: "Automatización de facturación por suscripción",
            description: "Facturación, dunning y revenue recognition automatizados para SaaS.",
            fullDescription: "Modernizamos el flujo de facturación SaaS orquestando Odoo Accounting, Stripe y workers en Celery. Resultado: facturación automática, journeys de cobranza y revenue recognition conforme a GAAP con dashboards en tiempo real.",
            client: "Proveedor SaaS • Estados Unidos",
            features: [
              "Facturación por uso y reglas de prorrateo",
              "Dunning automatizado multicanal",
              "Revenue recognition alineado a ASC 606",
              "Dashboard ejecutivo con KPIs predictivos"
            ],
            meta: {
              stack: ["Odoo Accounting", "Stripe", "Celery", "Redis"],
              duration: "4 semanas",
              impact: "+40% conversión B2B tras la automatización"
            }
          },
          biInsights: {
            title: "BI ejecutivo para Odoo",
            description: "Data lake y dashboards con KPIs casi en tiempo real.",
            fullDescription: "Creamos una capa analítica gobernada que extrae datos limpios de Odoo hacia un warehouse con dbt y dashboards en Power BI. Dirección obtuvo KPIs accionables, análisis por cohortes y alertas automáticas.",
            client: "Conglomerado retail • LATAM",
            features: [
              "Modelos dbt con validaciones automáticas",
              "Dashboards self-service para finanzas y operaciones",
              "Detección de anomalías con alertas proactivas",
              "Arquitectura de data lake con accesos por rol"
            ],
            meta: {
              stack: ["Data Lake Odoo", "dbt", "Power BI", "Python"],
              duration: "7 semanas",
              impact: "+28% velocidad en toma de decisiones"
            }
          }
        },
        metaLabels: {
          stack: "Stack",
          duration: "Duración",
          impact: "Impacto"
        },
        ctaFullCase: "Solicitar caso completo",
        modal: {
          clientLabel: "Cliente",
          categoryLabel: "Categoría",
          technologiesLabel: "Tecnologías",
          descriptionLabel: "Descripción",
          featuresLabel: "Características Principales",
          viewProject: "Ver Proyecto",
          confidential: "Confidencial"
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
          location: "Con sede en Guayaquil, Ecuador"
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
        description: "Escuadras multicloud para lanzar Salesforce, Odoo y productos full-stack",
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
            description: "Automatización de ventas, servicio y marketing sobre la plataforma Salesforce",
            features: {
              apexDev: "Apex Development",
              lightningComponents: "Lightning Components",
              flowAutomation: "Flow Automation", 
              einsteinAi: "Einstein AI"
            }
          },
          webDev: {
            title: "Desarrollo Web Moderno",
            description: "Equipos de React, Node.js y UX para productos digitales escalables",
            features: {
              reactApps: "React Applications",
              apiDev: "API Development",
              cloudDeploy: "Cloud Deployment",
              mobileResponsive: "Mobile Responsive"
            }
          },
          consulting: {
            title: "Consultoría Digital",
            description: "Asesoría estratégica en CRM, ERP y modernización de productos",
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
      trust: {
        title: "Confianza de",
        subtitle: "Líderes de la Industria",
  description: "Más de 5 años lanzando programas Salesforce, Odoo y productos digitales con resultados medibles",
        stats: {
          projects: {
            number: "200+",
            label: "Programas multicloud entregados"
          },
          satisfaction: {
            number: "98%",
            label: "Satisfacción en CRM, ERP y web"
          },
          support: {
            number: "24/7",
            label: "Soporte técnico follow-the-sun"
          },
          experience: {
            number: "5+",
            label: "Años orquestando transformaciones CRM/ERP"
          }
        },
          clients: "Nuestros Clientes",
          logos: ["Andina Foods", "Finanzas360", "LogistiCore", "Flux Retail"],
          testimonial: {
            quote: "+40% de conversión en ventas B2B tras automatizar facturación y cobros.",
            author: "Laura Peña",
            role: "CFO • SaaS de mercados emergentes",
            cta: "Leer caso completo"
          }
      },
      process: {
        title: "Nuestro Proceso",
        subtitle: "de Trabajo",
        description: "Una metodología probada que asegura resultados excepcionales en cada proyecto",
        steps: {
          strategy: {
            title: "Estrategia y Planificación",
            description: "Analizamos las necesidades de tu negocio y diseñamos una estrategia integral de solución"
          },
          design: {
            title: "Diseño y Arquitectura", 
            description: "Creamos interfaces intuitivas y arquitecturas de sistema robustas"
          },
          development: {
            title: "Desarrollo y Entrega",
            description: "Implementamos soluciones con mejores prácticas y entregamos resultados excepcionales"
          }
        }
      },
      footer: {
        subtitle: "Equipo de Desarrollo Profesional • Ecuador",
        credit: "Desarrollado por Robocode"
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