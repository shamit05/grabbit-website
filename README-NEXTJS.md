# Grabbit Website - Next.js with Firebase

This is the modern React/Next.js version of the Grabbit website with Firebase integration and automated GitHub Pages deployment.

## 🏗️ Project Structure

### Branch Strategy
- `react-dev`: Development branch with Next.js source code
- `gh-pages`: Automatically generated static files for GitHub Pages deployment

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS Modules (converted from original CSS)
- **Database**: Firebase Firestore
- **Analytics**: Firebase Analytics
- **Deployment**: GitHub Pages via GitHub Actions
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository and switch to the React development branch:
```bash
git checkout react-dev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static files
- `npm run lint` - Run ESLint

## 🔥 Firebase Integration

### Features Integrated
- **Firestore**: Email list collection for contact form submissions
- **Analytics**: Page view and user interaction tracking
- **Security**: Client-side only configuration (no server-side secrets)

### Firebase Collections
- `emailList`: Stores email signups with timestamps and source tracking

### Environment Variables
All Firebase configuration is included in the codebase as it's safe for client-side use.

## 📱 App Redirect Functionality

The website handles app deep links through the 404 page:
- URLs like `https://grabbit.tech/app/groups?invite=ABC123&groupName=My+Group`
- Automatically redirect to `/download` with query parameters preserved
- Display invite banners with group information

## 🚀 Deployment

### Automatic Deployment
The site automatically deploys to GitHub Pages when you push to the `react-dev` branch:

1. GitHub Actions builds the Next.js app
2. Exports static files to the `out` directory
3. Deploys to GitHub Pages

### Manual Deployment
```bash
npm run build
# The static files will be in the 'out' directory
```

## 🔧 Configuration

### Next.js Configuration
The `next.config.js` is configured for static export:
- `output: 'export'` for static site generation
- `images.unoptimized: true` for GitHub Pages compatibility
- `trailingSlash: true` for proper routing

### GitHub Actions
The deployment workflow (`.github/workflows/deploy.yml`) handles:
- Installing dependencies
- Building the Next.js app
- Deploying to GitHub Pages

## 📄 Pages

### Main Pages
- `/` - Homepage with hero, features, team, and contact sections
- `/download` - App download page with screenshots and requirements
- `/404` - Custom 404 page with app redirect logic

### Components
- `Header` - Navigation with mobile menu and scroll effects
- Responsive design with mobile-first approach

## 🎨 Styling

The CSS has been converted from the original static site:
- Global styles in `styles/globals.css`
- Maintains original design and animations
- Responsive design with mobile hamburger menu
- Pill-shaped translucent header design

## 🔍 SEO & Meta Tags

- Proper meta tags for each page
- Open Graph tags for social sharing
- Apple App Store integration meta tags
- Structured data for better search engine understanding

## 📊 Analytics

Firebase Analytics tracks:
- Page views
- User interactions
- App download clicks
- Email list signups

## 🛠️ Development Tips

### Converting from Static HTML
The original HTML has been converted to React components:
- Static HTML → React components with proper JSX
- CSS classes maintained for design consistency
- Interactive elements converted to React state/effects
- Form handling integrated with Firebase

### Adding New Features
1. Create components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Utilize Firebase for data storage
4. Test locally before pushing to `react-dev`

## 📝 Migration Notes

### What's New
- React/Next.js architecture
- Firebase integration for email collection
- Automated deployments
- TypeScript support
- Component-based architecture

### What's Preserved
- Original design and styling
- All functionality (app redirects, mobile menu, etc.)
- SEO optimizations
- Responsive design

## 🚨 Important Notes

1. **Branch Management**: Always develop in `react-dev`, never commit directly to `gh-pages`
2. **Static Export**: The site uses Next.js static export for GitHub Pages compatibility
3. **Image Optimization**: Images are unoptimized for static deployment
4. **Firebase Security**: All Firebase config is client-side safe

## 📞 Contact

For questions about the website setup, contact: contact@grabbit.tech

---

Made with ❤️ by the Grabbit team
