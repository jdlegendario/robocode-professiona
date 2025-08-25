const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const TeamMember = require('./models/TeamMember');
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await TeamMember.deleteMany({});
    await Project.deleteMany({});
    await BlogPost.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Robocode Admin',
      email: process.env.ADMIN_EMAIL || 'admin@robocode.dev',
      password: process.env.ADMIN_PASSWORD || 'RoboAdmin2024!',
      role: 'admin'
    });

    console.log(`Admin user created: ${adminUser.email}`);

    // Create team members
    console.log('Creating team members...');
    const teamMembers = await TeamMember.insertMany([
      {
        name: 'Angelo Iván Alejandro Vera',
        role: 'Senior Full Stack Developer',
        skills: ['Odoo', 'Python', 'JavaScript', 'PostgreSQL', 'Docker', 'ERP Systems'],
        experience: 'Specializing in enterprise solutions and ERP customization with over 4 years of experience',
        bio: 'Expert in Odoo development and enterprise system integration. Passionate about creating scalable business solutions.',
        social: {
          linkedin: 'https://linkedin.com/in/angelo-vera',
          github: 'https://github.com/angelo-vera'
        },
        order: 1,
        isActive: true
      },
      {
        name: 'Angelo Haro',
        role: 'Salesforce Developer',
        skills: ['Apex', 'Lightning', 'Salesforce', 'SOQL', 'Integration', 'CRM'],
        experience: 'Deep expertise in Salesforce ecosystem and CRM solutions with 4+ years of experience',
        bio: 'Salesforce certified developer specializing in custom Lightning components and complex integrations.',
        social: {
          linkedin: 'https://linkedin.com/in/angelo-haro',
          github: 'https://github.com/angelo-haro'
        },
        order: 2,
        isActive: true
      },
      {
        name: 'Alex Fabricio Rosero',
        role: 'Frontend Developer',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX', 'Mobile Development'],
        experience: 'Creating modern web applications and user interfaces with 4 years of experience',
        bio: 'Frontend specialist focused on creating beautiful, responsive, and accessible user experiences.',
        social: {
          linkedin: 'https://linkedin.com/in/alex-rosero',
          github: 'https://github.com/alex-rosero'
        },
        order: 3,
        isActive: true
      },
      {
        name: 'Juan Diego Salazar Vivas',
        role: 'Backend Developer',
        skills: ['Node.js', 'API Design', 'Database', 'Cloud', 'DevOps', 'Microservices'],
        experience: 'Building scalable backend systems and infrastructure with 4+ years of experience',
        bio: 'Backend architect specializing in high-performance APIs and cloud infrastructure solutions.',
        social: {
          linkedin: 'https://linkedin.com/in/juan-salazar',
          github: 'https://github.com/juan-salazar'
        },
        order: 4,
        isActive: true
      }
    ]);

    console.log(`${teamMembers.length} team members created`);

    // Create projects
    console.log('Creating projects...');
    const projects = await Project.insertMany([
      {
        title: 'Enterprise ERP Customization',
        category: 'Odoo',
        description: 'Complete Odoo implementation for manufacturing company with custom modules for inventory management and production planning.',
        fullDescription: 'This comprehensive Odoo implementation involved developing custom modules for a large manufacturing company. We created specialized inventory management systems, production planning tools, and integrated third-party APIs for seamless workflow automation.',
        technologies: ['Odoo', 'Python', 'PostgreSQL', 'Docker', 'XML', 'JavaScript'],
        client: 'Manufacturing Corp Ecuador',
        projectDate: new Date('2023-12-01'),
        featured: true,
        isActive: true,
        order: 1
      },
      {
        title: 'Sales Force Automation',
        category: 'Salesforce',
        description: 'Custom Salesforce solution with Apex triggers, Lightning components, and third-party integrations for lead management.',
        fullDescription: 'Built a complete sales automation system using Salesforce platform. Developed custom Apex triggers for automated lead scoring, Lightning components for enhanced user experience, and integrated multiple third-party services for comprehensive lead management.',
        technologies: ['Apex', 'Lightning', 'SOQL', 'REST API', 'JavaScript', 'Salesforce Flow'],
        client: 'TechSales International',
        projectDate: new Date('2023-10-15'),
        featured: true,
        isActive: true,
        order: 2
      },
      {
        title: 'Modern Web Portal',
        category: 'Web Development',
        description: 'Responsive web application with real-time features, built with React and modern development practices.',
        fullDescription: 'Developed a cutting-edge web portal featuring real-time data visualization, responsive design, and modern user interface. The application includes user authentication, role-based access control, and integration with multiple APIs.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Socket.io'],
        client: 'Digital Solutions Ecuador',
        projectDate: new Date('2023-09-01'),
        featured: false,
        isActive: true,
        order: 3
      },
      {
        title: 'E-commerce Platform Integration',
        category: 'Integration',
        description: 'Multi-platform e-commerce integration connecting Shopify, Odoo, and payment gateways.',
        fullDescription: 'Created a comprehensive integration solution connecting Shopify e-commerce platform with Odoo ERP system and multiple payment gateways. Automated inventory synchronization, order processing, and financial reporting.',
        technologies: ['Shopify API', 'Odoo', 'Python', 'Webhooks', 'Payment APIs', 'Queue Systems'],
        client: 'E-commerce Ecuador',
        projectDate: new Date('2023-08-01'),
        featured: false,
        isActive: true,
        order: 4
      }
    ]);

    console.log(`${projects.length} projects created`);

    // Create blog posts
    console.log('Creating blog posts...');
    const blogPosts = await BlogPost.insertMany([
      {
        title: 'Optimizing Odoo Performance for Large Datasets',
        excerpt: 'Learn advanced techniques to improve Odoo performance when dealing with millions of records and complex queries.',
        content: `
# Optimizing Odoo Performance for Large Datasets

When working with Odoo in enterprise environments, performance optimization becomes crucial as datasets grow. Here are proven strategies to maintain excellent performance even with millions of records.

## Database Optimization

### Indexing Strategy
Proper indexing is fundamental for query performance. Focus on:
- Frequently filtered fields
- Foreign key relationships
- Search domains in views

### Query Optimization
- Use direct SQL queries for heavy computations
- Implement proper ORM patterns
- Avoid N+1 query problems

## Caching Strategies

Implement multi-level caching:
1. Database query caching
2. Computed field caching
3. Template caching

## Conclusion

With proper optimization techniques, Odoo can handle enterprise-scale data efficiently while maintaining excellent user experience.
        `,
        author: 'Angelo Iván Alejandro Vera',
        tags: ['odoo', 'performance', 'postgresql', 'optimization'],
        category: 'Development',
        language: 'en',
        isPublished: true,
        publishedAt: new Date('2024-01-15')
      },
      {
        title: 'Salesforce Lightning Component Best Practices',
        excerpt: 'Discover the latest patterns and practices for building maintainable Lightning components in Salesforce.',
        content: `
# Salesforce Lightning Component Best Practices

Building robust Lightning components requires following established patterns and best practices. This guide covers the essential principles for creating maintainable and scalable components.

## Component Architecture

### Single Responsibility Principle
Each component should have one clear purpose:
- Data presentation
- User interaction
- Business logic processing

### Communication Patterns
- Use events for parent-child communication
- Implement proper error handling
- Maintain component state effectively

## Performance Considerations

### Efficient Data Loading
- Use Lightning Data Service when possible
- Implement lazy loading for large datasets
- Cache frequently accessed data

### Optimized Rendering
- Minimize DOM manipulations
- Use conditional rendering wisely
- Implement proper lifecycle management

## Testing Strategy

Comprehensive testing includes:
1. Unit tests for business logic
2. Integration tests for component interaction
3. User acceptance testing

## Conclusion

Following these best practices ensures your Lightning components are maintainable, performant, and provide excellent user experience.
        `,
        author: 'Angelo Haro',
        tags: ['salesforce', 'lightning', 'javascript', 'best-practices'],
        category: 'Development',
        language: 'en',
        isPublished: true,
        publishedAt: new Date('2024-01-10')
      },
      {
        title: 'Modern React Patterns for Enterprise Applications',
        excerpt: 'Exploring advanced React patterns and state management solutions for large-scale enterprise applications.',
        content: `
# Modern React Patterns for Enterprise Applications

Enterprise React applications require robust patterns for maintainability, scalability, and performance. This article explores the most effective patterns for large-scale applications.

## State Management Architecture

### Context vs Redux vs Zustand
Choosing the right state management solution:
- Context API for simple, localized state
- Redux Toolkit for complex, global state
- Zustand for modern, lightweight solutions

### Data Flow Patterns
- Unidirectional data flow
- Immutable state updates
- Predictable state mutations

## Component Patterns

### Compound Components
Building flexible, reusable component APIs:
\`\`\`jsx
<Select>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="1">Option 1</Select.Option>
  </Select.Options>
</Select>
\`\`\`

### Higher-Order Components vs Hooks
Modern patterns favor custom hooks over HOCs for:
- Better composition
- Clearer dependencies
- Improved testability

## Performance Optimization

### Code Splitting Strategies
- Route-based splitting
- Component-based splitting
- Dynamic imports

### Memoization Patterns
- React.memo for components
- useMemo for expensive calculations
- useCallback for stable references

## Conclusion

Implementing these patterns creates maintainable, performant enterprise applications that scale with your business needs.
        `,
        author: 'Alex Fabricio Rosero',
        tags: ['react', 'typescript', 'architecture', 'enterprise'],
        category: 'Development',
        language: 'en',
        isPublished: true,
        publishedAt: new Date('2024-01-05')
      }
    ]);

    console.log(`${blogPosts.length} blog posts created`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n📧 Admin Login:
Email: ${adminUser.email}
Password: ${process.env.ADMIN_PASSWORD || 'RoboAdmin2024!'}`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔐 Database connection closed');
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();