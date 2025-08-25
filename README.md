# Robocode - Professional Development Team Portfolio

A modern, responsive, and multilingual portfolio website for the Robocode development team. Built with React, TypeScript, and Tailwind CSS.

![Robocode Logo](https://img.shields.io/badge/Robocode-Professional%20Development-007BFF?style=for-the-badge)

## ✨ Features

### 🌟 Core Features
- **Modern Design**: Clean, minimalist design with professional aesthetics
- **Fully Responsive**: Mobile-first design that works on all devices
- **Multilingual Support**: Spanish and English language support with persistent selection
- **Smooth Animations**: Subtle animations powered by Framer Motion
- **SEO Optimized**: Semantic HTML and proper meta tags

### 📱 Sections
- **Home**: Hero section with team introduction and call-to-action
- **About**: Team member profiles with skills and social links
- **Portfolio**: Project showcase with filtering capabilities
- **Blog**: Technical articles and industry insights
- **Contact**: Functional contact form with validation

### 🎨 Design System
- **Color Palette**: Blue (#007BFF), Dark Gray (#343A40), White (#FFFFFF)
- **Typography**: Inter font family for optimal readability
- **Components**: Consistent UI components using shadcn/ui
- **Icons**: Phosphor Icons for professional appearance

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **React i18next** - Internationalization framework
- **shadcn/ui** - High-quality, accessible UI components
- **Phosphor Icons** - Flexible icon library

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS post-processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/robocode-team/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be available in the `dist` folder.

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                 # shadcn/ui components
├── assets/
│   ├── images/             # Image assets
│   ├── video/              # Video assets
│   └── documents/          # Document assets
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main application component
├── i18n.ts               # Internationalization configuration
├── index.css             # Global styles and theme
├── main.css              # Structural CSS (do not edit)
└── main.tsx              # Application entry point (do not edit)
```

## 🌐 Internationalization

### Adding New Languages

1. **Update `src/i18n.ts`**
   ```typescript
   const resources = {
     en: { /* English translations */ },
     es: { /* Spanish translations */ },
     fr: { /* Add French translations */ }
   }
   ```

2. **Update language toggle component**
   - Modify the language toggle button to support multiple languages

### Translation Keys Structure
```typescript
{
  nav: { home, about, portfolio, blog, contact },
  home: { title, subtitle, description, viewWork, getInTouch },
  about: { title, subtitle, experience },
  portfolio: { title, subtitle, all, categories },
  blog: { title, subtitle, readMore, backToBlog },
  contact: { title, subtitle, form, info, expertise },
  footer: { subtitle },
  messages: { success, error, loading, notFound }
}
```

## 🎨 Customization

### Colors
Update the color palette in `src/index.css`:
```css
:root {
  --primary: oklch(0.55 0.18 252);    /* Blue #007BFF */
  --background: oklch(1 0 0);          /* White #FFFFFF */
  --foreground: oklch(0.24 0.005 250); /* Dark Gray #343A40 */
  /* ... other color variables */
}
```

### Team Members
Update team information in `src/App.tsx`:
```typescript
const teamMembers: TeamMember[] = [
  {
    name: "Your Name",
    role: "Your Role",
    skills: ["Skill1", "Skill2"],
    experience: "your experience description",
    linkedin: "your-linkedin-url",
    github: "your-github-url",
    avatar: "path-to-avatar"
  }
]
```

### Projects
Add your projects in `src/App.tsx`:
```typescript
const projects: Project[] = [
  {
    title: "Project Title",
    category: "Category",
    description: "Project description",
    technologies: ["Tech1", "Tech2"]
  }
]
```

### Blog Posts
Add blog content in `src/App.tsx`:
```typescript
const blogPosts: BlogPost[] = [
  {
    id: "unique-id",
    title: "Article Title",
    excerpt: "Brief description",
    content: "Full article content",
    author: "Author Name",
    date: "YYYY-MM-DD",
    tags: ["tag1", "tag2"]
  }
]
```

## 📱 Responsive Design

The website is designed with a mobile-first approach:
- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Desktop**: > 1024px (multi-column layouts)

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📈 Performance Optimization

### Implemented Optimizations
- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Optimized asset imports
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript minification
- **Lazy Loading**: Components and images loaded on demand

### Recommended Optimizations
- **Image Compression**: Use WebP format for images
- **CDN Deployment**: Deploy static assets to a CDN
- **Gzip Compression**: Enable server-side compression
- **Service Worker**: Implement caching strategies

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts for configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Build and deploy: `npm run build && npm run deploy`

## 🛡️ Security Considerations

- **Input Validation**: Contact form includes client-side validation
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Always deploy with SSL/TLS certificates
- **Content Security Policy**: Implement CSP headers for production

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use semantic HTML elements
- Implement responsive design patterns
- Write meaningful commit messages

## 📞 Support

### Team Contact
- **Email**: contact@robocode.dev
- **Location**: Based in Ecuador 🇪🇨

### Team Members
- **Angelo Iván Alejandro Vera** - Senior Full Stack Developer
- **Angelo Haro** - Salesforce Developer  
- **Alex Fabricio Rosero** - Frontend Developer
- **Juan Diego Salazar Vivas** - Backend Developer

## 📄 License

This project is private and proprietary to the Robocode team.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Phosphor Icons](https://phosphoricons.com/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [React i18next](https://react.i18next.com/) for internationalization

---

**Built with ❤️ by the Robocode Team in Ecuador** 🇪🇨