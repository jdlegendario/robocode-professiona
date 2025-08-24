# Robocode Portfolio

A modern, professional portfolio website for the Robocode development team, showcasing expertise in Odoo, Salesforce, and modern web technologies.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Optimized for desktop, tablet, and mobile devices  
- **Team Showcase**: Individual profiles with skills and social links
- **Portfolio Gallery**: Filterable project showcase by category
- **Contact Form**: Functional contact form with validation
- **Professional Branding**: Consistent Robocode visual identity

## 🛠️ Technologies

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **UI Components**: Shadcn/ui component library
- **Icons**: Phosphor Icons React
- **Build Tool**: Vite
- **State Management**: React hooks with persistent storage

## 🎨 Design System

### Colors
- **Primary**: Deep Blue (#1e40af) - Trust and professionalism
- **Secondary**: Cool Gray (#374151) - Supporting neutrals
- **Accent**: Warm Orange (#f97316) - Call-to-action highlights
- **Background**: Light Gray (#f8fafc) - Clean canvas

### Typography
- **Font**: Inter - Modern, professional typeface
- **Hierarchy**: Clear size relationships (48px/32px/24px/16px)
- **Spacing**: Consistent rhythm with Tailwind scale

## 📁 Project Structure

```
src/
├── components/
│   └── ui/          # Shadcn components (40+ prebuilt)
├── hooks/
│   └── use-mobile.ts # Responsive utilities
├── lib/
│   └── utils.ts     # Utility functions
├── App.tsx          # Main application component
├── index.css        # Global styles and design system
└── main.tsx         # Application entry point
```

## 🏁 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd robocode-portfolio
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
   ```
   http://localhost:5173
   ```

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Options

#### Vercel (Recommended)
1. Push to GitHub repository
2. Connect repository to Vercel
3. Auto-deploys on push to main branch

#### Netlify
1. Build the project: `npm run build`
2. Upload `dist/` folder to Netlify
3. Configure redirects for SPA routing

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## ✏️ Customization

### Team Members
Edit team information in `src/App.tsx`:
```typescript
const teamMembers: TeamMember[] = [
  {
    name: "Your Name",
    role: "Your Role",
    skills: ["Skill1", "Skill2"],
    experience: "X+ years in...",
    linkedin: "https://linkedin.com/in/yourname",
    github: "https://github.com/yourname",
    avatar: "/api/placeholder/300/300"
  }
  // Add more members...
]
```

### Projects Portfolio
Update projects in `src/App.tsx`:
```typescript
const projects: Project[] = [
  {
    title: "Project Name",
    category: "Technology Category",
    description: "Project description...",
    technologies: ["Tech1", "Tech2"],
    link: "https://project-url.com" // Optional
  }
  // Add more projects...
]
```

### Colors and Styling
Modify the design system in `src/index.css`:
```css
:root {
  --primary: oklch(0.45 0.15 250); /* Deep Blue */
  --accent: oklch(0.7 0.15 50);    /* Orange */
  /* Update other colors as needed */
}
```

### Content
- Update company information in the hero section
- Modify contact details and location
- Add or remove sections as needed

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Robocode - The Robocoders**
- Angelo Iván Alejandro Vera - Senior Full Stack Developer
- Angelo Haro - Salesforce Developer  
- Alex Fabricio Rosero - Frontend Developer
- Juan Diego Salazar Vivas - Backend Developer

📍 **Location**: Ecuador  
📧 **Contact**: contact@robocode.dev

---

Built with ❤️ by the Robocode team using React, TypeScript, and Tailwind CSS.