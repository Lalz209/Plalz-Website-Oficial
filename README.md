# Plalz E-commerce Frontend

A modern, scalable e-commerce platform for web services built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Dark/Light mode** support
- **Internationalization** (Spanish/English)
- **Responsive design**
- **Modern UI components** with Radix UI
- **Scalable architecture**

## 🛠️ Tech Stack

- **Framework:** Next.js 14+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Internationalization:** next-intl
- **Theme Management:** next-themes
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Animations:** Framer Motion
- **State Management:** TanStack Query

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/          # Authentication routes
│   │   ├── (dashboard)/     # Dashboard routes
│   │   ├── (shop)/          # Shop routes
│   │   └── page.tsx         # Home page
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│   └── features/            # Feature-specific components
├── lib/                     # Utility libraries
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── constants/               # Application constants
└── utils/                   # Utility functions
```

## 🎨 Color Palette

### Light Mode
- Background: `#F5F5F7`
- Foreground: `#1C1C1E`
- Primary: `#12355B`
- Secondary: `#60815F`
- Accent: `#C0BD0F`

### Dark Mode
- Background: `#1C1C1E`
- Foreground: `#F5F5F7`
- Primary: `#3396FF`
- Secondary: `#00D084`
- Accent: `#DCDF52`

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 Internationalization

The project supports Spanish (default) and English languages. Language files are located in the `messages/` directory:

- `messages/es.json` - Spanish translations
- `messages/en.json` - English translations

## 🎯 Key Features

### Theme Support
- Automatic dark/light mode detection
- Manual theme switching
- System preference respect

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Modern CSS Grid and Flexbox

### Type Safety
- Full TypeScript coverage
- Strict type checking
- Interface definitions for all data models

### Performance
- Next.js App Router for optimal performance
- Image optimization
- Code splitting and lazy loading

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with CSS variables for theming. See `tailwind.config.js` for details.

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `next-intl` - Internationalization
- `next-themes` - Theme management

### UI Components
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icons
- `framer-motion` - Animations

### Development Tools
- `eslint` - Code linting
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository. 