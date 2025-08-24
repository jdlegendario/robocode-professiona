# Robocode Team Portfolio

A modern, professional portfolio website for the Robocode development team showcasing expertise in Odoo, Apex Salesforce, and other technologies.

**Experience Qualities**:
1. Professional - Clean, trustworthy design that establishes credibility with potential clients
2. Modern - Contemporary UI with smooth animations and responsive design patterns
3. Accessible - Clear navigation and content structure that works across all devices

**Complexity Level**: Light Application (multiple features with basic state)
- Portfolio showcase with interactive project galleries, team member profiles, and contact functionality requiring state management for animations, form handling, and navigation.

## Essential Features

### Landing/Hero Section
- **Functionality**: Display Robocode branding, tagline, and compelling value proposition
- **Purpose**: Create strong first impression and communicate team expertise
- **Trigger**: Page load
- **Progression**: Animated logo reveal → Typewriter effect tagline → Call-to-action buttons → Smooth scroll to sections
- **Success criteria**: Clear branding recognition and <3 second load time

### Team Section
- **Functionality**: Interactive team member cards with photos, skills, and experience
- **Purpose**: Build trust by showcasing individual expertise and team composition
- **Trigger**: Scroll into viewport or navigation click
- **Progression**: Section reveal → Individual card animations → Hover interactions → Skill tag displays
- **Success criteria**: All team members clearly presented with professional information

### Portfolio Gallery
- **Functionality**: Project showcase with categories (Odoo, Salesforce, Others)
- **Purpose**: Demonstrate technical capabilities and past work quality
- **Trigger**: Navigation or scroll
- **Progression**: Filter selection → Project grid animation → Modal details → External links
- **Success criteria**: Projects clearly categorized with compelling descriptions

### Contact Form
- **Functionality**: Working contact form with validation and team social links
- **Purpose**: Enable client communication and professional networking
- **Trigger**: Contact section access
- **Progression**: Form focus → Validation feedback → Submit animation → Success confirmation
- **Success criteria**: Form submissions processed and social links functional

## Edge Case Handling
- **Slow connections**: Progressive loading with skeleton states and optimized images
- **Mobile navigation**: Collapsible menu with touch-friendly interactions
- **Form validation**: Real-time validation with clear error messaging
- **Missing images**: Graceful fallbacks with placeholder graphics
- **JavaScript disabled**: Core content remains accessible

## Design Direction
The design should evoke professionalism, technical competence, and modern development practices - feeling clean, trustworthy, and cutting-edge while maintaining accessibility. Minimal interface better serves the purpose of showcasing work without distraction.

## Color Selection
Complementary (opposite colors) - Using blue as the primary brand color to convey trust and professionalism, with strategic orange accents for calls-to-action and highlights to create visual interest and guide user attention.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Communicates trust, professionalism, and technical expertise
- **Secondary Colors**: 
  - Cool Gray (oklch(0.25 0.02 250)) - Supporting neutral for backgrounds and text
  - Light Gray (oklch(0.96 0.005 250)) - Card backgrounds and subtle sections
- **Accent Color**: Warm Orange (oklch(0.7 0.15 50)) - Call-to-action buttons and interactive elements
- **Foreground/Background Pairings**:
  - Background (Light Gray #F8F9FA): Dark Gray text (oklch(0.25 0.02 250)) - Ratio 12.8:1 ✓
  - Card (White #FFFFFF): Dark Gray text (oklch(0.25 0.02 250)) - Ratio 14.2:1 ✓
  - Primary (Deep Blue): White text (oklch(0.98 0 0)) - Ratio 8.9:1 ✓
  - Accent (Warm Orange): White text (oklch(0.98 0 0)) - Ratio 4.8:1 ✓

## Font Selection
Typography should convey modern professionalism with excellent readability across devices, using Inter for its technical clarity and geometric precision.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/48px/tight letter spacing
  - H2 (Section Titles): Inter SemiBold/32px/normal spacing
  - H3 (Team Names): Inter Medium/24px/normal spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line height
  - Caption (Skills/Tags): Inter Medium/14px/wide letter spacing

## Animations
Animations should feel purposeful and professional, enhancing usability without being distracting - subtle entrance effects that guide attention and smooth transitions that maintain spatial continuity.

- **Purposeful Meaning**: Motion communicates technical precision while guiding user focus through content hierarchy
- **Hierarchy of Movement**: Hero elements get primary animation focus, followed by section reveals, then micro-interactions on hover states

## Component Selection
- **Components**: Card (team/project display), Button (CTAs), Form (contact), Badge (skills), Separator (section dividers), Avatar (team photos)
- **Customizations**: Hero animation container, project gallery grid, team card layout with skill badges
- **States**: Buttons (hover with subtle lift), Cards (hover with shadow increase), Form inputs (focus with blue border), Loading states for form submission
- **Icon Selection**: @phosphor-icons/react for consistent, professional iconography (GitHub, LinkedIn, External Link, etc.)
- **Spacing**: Consistent 4/8/16/32px Tailwind spacing scale for visual rhythm
- **Mobile**: Stack team cards vertically, hamburger navigation, full-width project cards, simplified hero layout