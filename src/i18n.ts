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
        quoteProject: "Book Consultation"
      },
      home: {
        title: "Robocode",
        subtitle: "The Robocoders",
  description: "Designing multi-cloud CRM, ERP, and web products that accelerate revenue teams.",
  heroTitle: "Deliver measurable impact with",
  heroHighlight: "specialized Salesforce, Odoo & web teams",
  heroDescription: "We architect CRM, ERP, and product experiences in ≤5 weeks with a cross-functional certified squad.",
        heroSubheadline: "We implement Odoo and Salesforce solutions in ≤6 weeks with certified squads ready to plug into your roadmap.",
        odoo: "Odoo",
        salesforce: "Salesforce", 
        viewWork: "Explore Our Portfolio",
        getQuote: "Download PRD Snapshot",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "Explore full portfolio",
    specializedIn: "Specialized in",
    motto: "A young and dynamic team with the vision and energy to transform the world.",
        promise: {
          title: "Functional demo in 10 days",
          description: "90-minute discovery, automated backlog scoring, and a delivery squad assembled in under two weeks."
        },
        guarantee: {
          title: "Consulting guarantee",
          description: "If you don’t leave with a clear roadmap, we refund the engagement—no questions asked."
        },
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
        filters: {
          categories: "Delivery focus",
          tags: "Filter by tags"
        },
        tags: {
          odoo: "Odoo",
          manufacturing: "Manufacturing",
          governance: "Governance",
          integrations: "Integrations",
          finance: "Finance",
          compliance: "Compliance",
          salesforce: "Salesforce",
          automation: "Automation",
          stripe: "Stripe",
          growth: "Growth",
          analytics: "Analytics",
          decisionOps: "Decision Ops"
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
              impact: "Cash-sale delinquencies held under 3% and 35% fewer reconciliation incidents",
              tags: ["odoo", "manufacturing", "governance"]
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
              impact: "99.7% sync accuracy across platforms",
              tags: ["integrations", "finance", "analytics"]
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
              impact: "100% compliance with sub-minute approvals",
              tags: ["salesforce", "compliance", "automation"]
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
              impact: "+40% B2B conversion after automation",
              tags: ["automation", "stripe", "growth"]
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
              impact: "+28% faster decision cycles",
              tags: ["analytics", "decisionOps", "odoo"]
            }
          }
        },
        metaLabels: {
          stack: "Stack",
          duration: "Duration",
          impact: "Impact"
        },
        ctaFullCase: "Request full case study",
        ctaCard: "Request full case",
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
      resources: {
        title: "Resources & insights",
        subtitle: "Download battle-tested guides to accelerate your delivery roadmap",
        items: {
          erpGuide: {
            title: "ERP modernisation guide 2025",
            description: "Framework to upgrade legacy ERPs with Odoo 16, governance, and finance automations.",
            action: "Download the guide"
          },
          salesforcePlaybook: {
            title: "Salesforce automation playbook",
            description: "30-page playbook covering Lightning, Flow, and data hygiene rituals for revenue teams.",
            action: "Get the playbook"
          },
          integrationChecklist: {
            title: "Integration readiness checklist",
            description: "Checklist to align architecture, security, and observability before multi-cloud launches.",
            action: "Access the checklist"
          }
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
        promise: {
          title: "We reply in under 24 hours",
          description: "Receive a tailored next step, a draft roadmap, and clarity on squad availability."
        },
        availability: "Serving North & South America plus European time zones.",
        form: {
          name: "Your Name",
          email: "Your Email", 
          message: "Tell us about your project...",
          send: "Send Message"
        },
        info: {
          title: "Get in Touch",
          email: "diego.salazar_@outlook.com",
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
        },
        channels: {
          calendly: "Book via Calendly",
          whatsapp: "Chat on WhatsApp",
          email: "Send us an email",
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
          clients: "Our clients",
          clientsSubtitle: "Selected brands that rely on our squads for Salesforce, Odoo, and digital delivery.",
          clientsAria: "Carousel of client logos sliding horizontally",
          logos: ["Andina Foods", "Finanzas360", "LogistiCore", "Flux Retail"],
          testimonial: {
            quote: "+40% B2B conversion after automating billing and collections.",
            author: "Laura Peña",
            role: "CFO • Mid-market SaaS LATAM",
            cta: "Read full success story"
          }
      },
      process: {
        title: "How we work",
        subtitle: "Process",
        description: "A proven methodology that carries you from discovery to long-term support without losing velocity.",
        steps: {
          discovery: {
            title: "Discovery",
            description: "90-minute intake, KPI alignment, and automated backlog scoring in under 48 hours."
          },
          design: {
            title: "Design",
            description: "Experience and solution architecture blueprints with rapid prototyping across CRM, ERP, and web."
          },
          build: {
            title: "Build & Integrate",
            description: "Sprint-based delivery with Salesforce, Odoo, and full-stack engineers orchestrating releases every 7 days."
          },
          qa: {
            title: "QA & UAT",
            description: "Automated tests, security audits, and guided UAT playbooks to certify go-lives without regression."
          },
          support: {
            title: "Support & Growth",
            description: "Hypercare, enablement, and continuous optimisation backed by observability and refinement cadences."
          }
        },
        matched: {
          title: "Matched with AI precision",
          description: "We pair certified specialists with your roadmap using proprietary scoring, automated QA, and governance frameworks.",
          bullets: [
            "AI-assisted backlog scoring to prioritise epics by ROI, risk, and effort in 48 hours.",
            "Quality audits combining automated testing, human reviews, and compliance playbooks.",
            "Frameworks that secure data, integrations, and releases across Salesforce, Odoo, and web."
          ],
          cta: "See our delivery playbook"
        }
      },
      credentials: {
        title: "Certifications & stack",
        subtitle: "Confidence to ship mission-critical programmes",
        certificationsTitle: "Recognised by industry leaders",
        certifications: [
          "Odoo Ready Partner",
          "Salesforce Trailblazer Rank",
          "AWS Partner Network",
          "Certified Scrum Product Owner"
        ],
        stackTitle: "Preferred technologies",
        stack: [
          "Odoo 16 Enterprise",
          "Salesforce Lightning & Flow",
          "React, Node.js & Next.js",
          "dbt, Power BI & modern data stack"
        ]
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
        quoteProject: "Agenda una consultoría"
      },
      home: {
        title: "Robocode",
        subtitle: "Los Robocoders",
  description: "Diseñamos productos CRM, ERP y web multicloud que aceleran a los equipos comerciales.",
  heroTitle: "Impulsa resultados medibles con",
  heroHighlight: "equipos expertos en Salesforce, Odoo y web",
  heroDescription: "Diseñamos experiencias CRM, ERP y productos digitales en ≤5 semanas con una escuadra certificada multidisciplinaria.",
        heroSubheadline: "Implementamos soluciones Odoo y Salesforce en ≤6 semanas con equipos certificados listos para integrarse a tu roadmap.",
        odoo: "Odoo",
        salesforce: "Salesforce",
        viewWork: "Explorar Portafolio",
        getQuote: "Descargar snapshot de PRD",
    ctaPrimary: "Agenda una consultoría",
    ctaSecondary: "Explora el portafolio completo",
    specializedIn: "Especializados en",
    motto: "Un equipo joven y dinámico, con la visión y la energía para transformar el mundo.",
        promise: {
          title: "Demo funcional en 10 días",
          description: "Discovery de 90 minutos, priorización automatizada y escuadra asignada en menos de dos semanas."
        },
        guarantee: {
          title: "Garantía de consultoría",
          description: "Si no obtienes un roadmap claro, te devolvemos la inversión sin preguntas."
        },
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
        filters: {
          categories: "Foco de entrega",
          tags: "Filtrar por tags"
        },
        tags: {
          odoo: "Odoo",
          manufacturing: "Manufactura",
          governance: "Gobernanza",
          integrations: "Integraciones",
          finance: "Finanzas",
          compliance: "Cumplimiento",
          salesforce: "Salesforce",
          automation: "Automatización",
          stripe: "Stripe",
          growth: "Crecimiento",
          analytics: "Analítica",
          decisionOps: "Decision Ops"
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
              impact: "Impagos contado/crédito corto < 3% y -35% incidencias en conciliación",
              tags: ["odoo", "manufacturing", "governance"]
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
              impact: "99.7% de exactitud en sincronizaciones",
              tags: ["integrations", "finance", "analytics"]
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
              impact: "+40% conversión B2B tras la automatización",
              tags: ["automation", "stripe", "growth"]
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
              impact: "+28% velocidad en toma de decisiones",
              tags: ["analytics", "decisionOps", "odoo"]
            }
          }
        },
        metaLabels: {
          stack: "Stack",
          duration: "Duración",
          impact: "Impacto"
        },
        ctaFullCase: "Solicitar caso completo",
  ctaCard: "Solicitar caso completo",
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
      resources: {
        title: "Recursos y aprendizajes",
        subtitle: "Descarga guías probadas para acelerar tu roadmap de entrega",
        items: {
          erpGuide: {
            title: "Guía ERP 2025",
            description: "Marco para modernizar ERPs heredados con Odoo 16, gobierno financiero y automatizaciones.",
            action: "Descargar la guía"
          },
          salesforcePlaybook: {
            title: "Playbook de automatización Salesforce",
            description: "30 páginas sobre Lightning, Flow y rituales de higiene de datos para equipos comerciales.",
            action: "Obtener el playbook"
          },
          integrationChecklist: {
            title: "Checklist de integraciones",
            description: "Lista para alinear arquitectura, seguridad y observabilidad antes de lanzamientos multicloud.",
            action: "Ver checklist"
          }
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
        promise: {
          title: "Respondemos en menos de 24h",
          description: "Recibe un siguiente paso a medida, un roadmap preliminar y disponibilidad del squad."
        },
        availability: "Atendemos zonas horarias de América y Europa.",
        form: {
          name: "Tu Nombre",
          email: "Tu Email",
          message: "Cuéntanos sobre tu proyecto...",
          send: "Enviar Mensaje"
        },
        info: {
          title: "Ponte en Contacto",
          email: "diego.salazar_@outlook.com",
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
        },
        channels: {
          calendly: "Agenda en Calendly",
          whatsapp: "Conversa por WhatsApp",
          email: "Escríbenos un correo",
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
          clients: "Nuestros clientes",
          clientsSubtitle: "Marcas que confían en nuestros squads para Salesforce, Odoo y productos digitales.",
          clientsAria: "Carrusel de logos de clientes desplazándose horizontalmente",
          logos: ["Andina Foods", "Finanzas360", "LogistiCore", "Flux Retail"],
          testimonial: {
            quote: "+40% de conversión en ventas B2B tras automatizar facturación y cobros.",
            author: "Laura Peña",
            role: "CFO • SaaS de mercados emergentes",
            cta: "Leer caso completo"
          }
      },
      process: {
        title: "Cómo trabajamos",
        subtitle: "Proceso",
        description: "Una metodología probada que te acompaña desde el discovery hasta el soporte continuo sin perder velocidad.",
        steps: {
          discovery: {
            title: "Discovery",
            description: "Intake de 90 minutos, definición de KPIs y priorización automatizada del backlog en menos de 48 horas."
          },
          design: {
            title: "Diseño",
            description: "Blueprints de experiencia y arquitectura con prototipos rápidos en CRM, ERP y productos web."
          },
          build: {
            title: "Build & Integración",
            description: "Entregas por sprints con squads de Salesforce, Odoo y full-stack orquestando releases cada 7 días."
          },
          qa: {
            title: "QA & UAT",
            description: "Testing automatizado, auditorías de seguridad y playbooks de UAT guiada para liberar sin regresiones."
          },
          support: {
            title: "Soporte & Growth",
            description: "Hypercare, enablement y mejora continua respaldados por observabilidad y rituales de optimización."
          }
        },
        matched: {
          title: "Matched con precisión AI",
          description: "Asignamos especialistas certificados usando scoring propietario, QA automatizada y marcos de gobernanza.",
          bullets: [
            "Scoring asistido por IA que prioriza épicas por ROI, riesgo y esfuerzo en 48 horas.",
            "Auditorías de calidad que combinan pruebas automáticas, revisiones humanas y playbooks de cumplimiento.",
            "Frameworks que resguardan datos, integraciones y releases en Salesforce, Odoo y web."
          ],
          cta: "Conoce nuestro playbook"
        }
      },
      credentials: {
        title: "Certificaciones y stack",
        subtitle: "Confianza para lanzar programas críticos",
        certificationsTitle: "Respaldados por la industria",
        certifications: [
          "Odoo Ready Partner",
          "Salesforce Trailblazer Rank",
          "AWS Partner Network",
          "Certified Scrum Product Owner"
        ],
        stackTitle: "Tecnologías preferidas",
        stack: [
          "Odoo 16 Enterprise",
          "Salesforce Lightning & Flow",
          "React, Node.js y Next.js",
          "dbt, Power BI y modern data stack"
        ]
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