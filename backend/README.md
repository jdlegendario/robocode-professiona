# Robocode Backend API

Backend server for the Robocode portfolio website built with Express.js, MongoDB, and JWT authentication.

## Features

- **RESTful API** - Complete API for portfolio management
- **JWT Authentication** - Secure admin authentication system
- **MongoDB Database** - Flexible document-based storage
- **File Upload** - Image processing and optimization with Sharp
- **Email Service** - Contact form processing with Nodemailer
- **CMS Functionality** - Full content management system
- **Security** - Rate limiting, CORS, Helmet security headers
- **Input Validation** - Comprehensive data validation
- **Error Handling** - Centralized error management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Processing**: Sharp for image optimization
- **Email**: Nodemailer with SMTP
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Joi schema validation

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── blogController.js    # Blog management
│   ├── contactController.js # Contact form handling
│   ├── projectController.js # Project management
│   └── teamController.js    # Team member management
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── upload.js           # File upload and processing
├── models/
│   ├── BlogPost.js         # Blog post schema
│   ├── ContactMessage.js   # Contact message schema
│   ├── Project.js          # Project schema
│   ├── TeamMember.js       # Team member schema
│   └── User.js             # User schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── blog.js             # Blog routes
│   ├── contact.js          # Contact routes
│   ├── projects.js         # Project routes
│   └── team.js             # Team routes
├── scripts/
│   └── seed.js             # Database seeding script
├── uploads/                # File upload directory
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── server.js               # Main server file
```

## Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/robocode-portfolio
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   
   # Email (SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   
   # Admin User
   ADMIN_EMAIL=admin@robocode.dev
   ADMIN_PASSWORD=RoboAdmin2024!
   
   # Client URL
   CLIENT_URL=http://localhost:3000
   ```

## Database Setup

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Seed the database**:
   ```bash
   npm run seed
   ```

This will create:
- Admin user account
- Sample team members
- Sample projects
- Sample blog posts

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify` - Verify JWT token
- `PUT /api/auth/change-password` - Change password

### Team Management
- `GET /api/team` - Get all team members (public)
- `GET /api/team/:id` - Get single team member (public)
- `GET /api/team/admin/all` - Get all team members (admin)
- `POST /api/team` - Create team member (admin)
- `PUT /api/team/:id` - Update team member (admin)
- `DELETE /api/team/:id` - Delete team member (admin)

### Project Management
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/categories` - Get project categories (public)
- `GET /api/projects/:slug` - Get single project (public)
- `GET /api/projects/admin/all` - Get all projects (admin)
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Blog Management
- `GET /api/blog` - Get all blog posts (public)
- `GET /api/blog/categories` - Get blog categories (public)
- `GET /api/blog/tags` - Get blog tags (public)
- `GET /api/blog/:slug` - Get single blog post (public)
- `GET /api/blog/admin/all` - Get all blog posts (admin)
- `GET /api/blog/admin/stats` - Get blog statistics (admin)
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

### Contact Management
- `POST /api/contact/send` - Send contact message (public)
- `GET /api/contact/messages` - Get all messages (admin)
- `GET /api/contact/stats` - Get contact statistics (admin)
- `PUT /api/contact/messages/:id/read` - Mark message as read (admin)
- `DELETE /api/contact/messages/:id` - Delete message (admin)

## File Uploads

The API supports file uploads for:
- Team member avatars
- Project images
- Blog post featured images

Files are automatically processed and optimized:
- Converted to WebP format
- Resized to optimal dimensions
- Thumbnails generated automatically

## Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

For other providers, update the SMTP settings accordingly.

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Prevents abuse and spam
- **CORS Protection** - Configurable cross-origin requests
- **Helmet Security** - Security headers and protection
- **Input Validation** - Server-side data validation
- **File Upload Security** - Type and size restrictions
- **Password Hashing** - bcrypt with salt rounds

## Admin Panel Integration

The backend is designed to work with admin panel interfaces:
- Complete CRUD operations for all content types
- Role-based access control
- File upload handling
- Statistics and analytics
- Contact message management

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure production MongoDB URI
4. Set up proper SMTP service
5. Configure domain-specific CORS settings

### MongoDB Atlas Setup
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/robocode-portfolio?retryWrites=true&w=majority
```

### Process Management
Use PM2 for production:
```bash
npm install -g pm2
pm2 start server.js --name robocode-backend
pm2 startup
pm2 save
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

## API Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## Contributing

1. Follow existing code style and patterns
2. Add proper error handling
3. Include input validation
4. Write descriptive commit messages
5. Test all endpoints before committing

## Support

For technical support or questions about the API, contact the Robocode development team.

---

**Robocode Backend** - Professional Development Solutions from Ecuador 🇪🇨