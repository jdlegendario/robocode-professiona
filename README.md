# Robocode Portfolio Website

A modern, responsive portfolio website for the Robocode development team featuring a full-stack architecture with React frontend, Express.js backend, MongoDB database, and comprehensive CMS functionality.

![Robocode](https://img.shields.io/badge/Robocode-Professional%20Development%20Team-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?logo=mongodb)

## 🌟 Features

### Frontend
- **Modern React Application** - Built with React 18+ and TypeScript
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Internationalization** - Spanish and English language support
- **Smooth Animations** - Framer Motion for elegant transitions
- **Professional UI** - shadcn/ui components with custom theme
- **SEO Optimized** - Proper meta tags and semantic HTML

### Backend & CMS
- **RESTful API** - Express.js backend with JWT authentication
- **Content Management** - Full CMS for team, projects, and blog management
- **File Upload System** - Automated image processing and optimization
- **Email Integration** - Contact form with automated email responses
- **Security Features** - Rate limiting, CORS, and input validation
- **Admin Dashboard** - Comprehensive management interface

### Key Sections
- **Home** - Professional landing page with team introduction
- **About Us** - Team member profiles with skills and social links
- **Portfolio** - Project showcase with filtering and categories
- **Blog** - Technical articles and insights
- **Contact** - Functional contact form with email integration
- **Admin Panel** - Secure CMS for content management

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - High-quality UI components
- **React i18next** - Internationalization
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Multer & Sharp** - File upload and image processing
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

### DevOps & Tools
- **ESLint & Prettier** - Code quality and formatting
- **Git** - Version control
- **PM2** - Process management (production)
- **Nginx** - Reverse proxy (production)

## 📁 Project Structure

```
robocode-portfolio/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── admin/             # Admin panel components
│   │   ├── contexts/          # React contexts (Auth)
│   │   ├── api/               # API integration
│   │   ├── i18n.ts           # Internationalization config
│   │   └── App.tsx           # Main application
│   ├── public/               # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                  # Express.js API server
│   ├── controllers/         # Route handlers
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/            # Configuration files
│   ├── scripts/           # Utility scripts
│   └── uploads/           # File upload directory
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+ (local or MongoDB Atlas)
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/robocode/portfolio-website.git
   cd robocode-portfolio
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run seed    # Initialize database with sample data
   npm run dev     # Start development server
   ```

3. **Setup Frontend** (in a new terminal):
   ```bash
   cd frontend  # or root directory if using the Spark template
   npm install
   npm run dev  # Start development server
   ```

4. **Access the application**:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Admin Panel**: http://localhost:3000/admin

### Default Admin Credentials
```
Email: admin@robocode.dev
Password: RoboAdmin2024!
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/robocode-portfolio

# JWT Security
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Service (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Admin User
ADMIN_EMAIL=admin@robocode.dev
ADMIN_PASSWORD=RoboAdmin2024!

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### Email Setup (Gmail)
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

## 📊 Admin Panel Features

The comprehensive admin panel allows you to:

### Dashboard
- View website statistics
- Monitor system status
- Quick access to all management features

### Team Management
- Add/edit/remove team members
- Upload member photos
- Manage skills and social links
- Control member visibility

### Project Management
- Create and manage project entries
- Upload project images
- Set project categories
- Feature important projects

### Blog Management
- Write and publish blog posts
- Rich text editor support
- Featured image uploads
- Tag and category system

### Contact Management
- View all contact form submissions
- Mark messages as read/unread
- Delete messages
- Contact statistics

## 🌐 Internationalization

The website supports multiple languages:

- **English** (default)
- **Spanish** (Español)

Language can be switched using the globe icon in the navigation. All content, including team information and project descriptions, is translatable.

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

All components adapt gracefully to different screen sizes with mobile-first design principles.

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#007BFF) - Technology and trust
- **Secondary**: Dark Gray (#343A40) - Professional and stable
- **Background**: White (#FFFFFF) - Clean and minimal
- **Accent**: Light blue variations for highlights

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Scales**: Mathematical progression for visual hierarchy
- **Line Heights**: Optimized for readability

### Components
- **Consistent spacing** using Tailwind's spacing scale
- **Rounded corners** with unified border radius
- **Subtle shadows** for depth and elevation
- **Smooth transitions** for interactive elements

## 🔒 Security Features

### Backend Security
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevents abuse and spam
- **Input Validation** - Server-side data validation
- **CORS Protection** - Configurable cross-origin requests
- **Security Headers** - Helmet.js security middleware

### File Upload Security
- **Type Restrictions** - Only image files allowed
- **Size Limits** - Configurable upload size limits
- **Processing** - Automatic image optimization
- **Safe Storage** - Organized file storage structure

## 🚀 Deployment

### Production Deployment

1. **Backend Deployment**:
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start the backend
   cd backend
   npm install --production
   pm2 start server.js --name robocode-backend
   pm2 startup
   pm2 save
   ```

2. **Frontend Build**:
   ```bash
   npm run build
   # Deploy build folder to your web server
   ```

3. **Database Setup**:
   - Use MongoDB Atlas for production
   - Update `MONGODB_URI` in environment variables

4. **Web Server Configuration** (Nginx):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       # Frontend
       location / {
           root /path/to/frontend/build;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Environment-Specific Configuration

#### Development
- Use local MongoDB instance
- Enable debug mode
- Hot reloading enabled

#### Production
- Use MongoDB Atlas or production database
- Disable debug mode
- Enable production optimizations
- Set up SSL certificates
- Configure domain-specific CORS

## 📈 Performance Optimizations

### Frontend
- **Code Splitting** - Lazy loading for better performance
- **Image Optimization** - WebP format with automatic compression
- **Bundle Analysis** - Webpack bundle analyzer for optimization
- **Caching** - Browser caching for static assets

### Backend
- **Database Indexing** - Optimized queries with proper indexes
- **Response Caching** - Cache frequently accessed data
- **File Compression** - Gzip compression for responses
- **Connection Pooling** - Efficient database connections

## 🧪 Testing

### Frontend Testing
```bash
npm run test          # Run unit tests
npm run test:coverage # Generate coverage report
npm run e2e           # End-to-end tests
```

### Backend Testing
```bash
npm run test:api      # API endpoint tests
npm run test:unit     # Unit tests for controllers
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify` - Verify token

### Public Endpoints
- `GET /api/team` - Get team members
- `GET /api/projects` - Get projects
- `GET /api/blog` - Get blog posts
- `POST /api/contact/send` - Send contact message

### Admin Endpoints (Protected)
- `GET /api/*/admin/all` - Get all items for management
- `POST /api/*` - Create new items
- `PUT /api/*/:id` - Update items
- `DELETE /api/*/:id` - Delete items

Full API documentation available in the backend README.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add proper TypeScript types
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when needed

## 📞 Support

For technical support or questions:

- **Email**: contact@robocode.dev
- **GitHub Issues**: [Create an issue](https://github.com/robocode/portfolio-website/issues)
- **Documentation**: Check the backend and frontend README files

## 👥 Team

**Robocode Development Team** - Ecuador 🇪🇨

- **Angelo Iván Alejandro Vera** - Senior Full Stack Developer (Odoo Specialist)
- **Angelo Haro** - Salesforce Developer
- **Alex Fabricio Rosero** - Frontend Developer
- **Juan Diego Salazar Vivas** - Backend Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Express.js** community for the robust backend framework
- **MongoDB** for the flexible database solution

---

**Built with ❤️ by Robocode Team in Ecuador**

*Professional Development Solutions • Modern Web Technologies • Enterprise Applications*