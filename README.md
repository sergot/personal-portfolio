# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design with smooth animations, dark mode support, and automatic PDF resume generation.

## Features

- 🎨 Modern and clean design
- 🌙 Dark mode support with next-themes
- 📱 Fully responsive layout
- ⚡ Fast and optimized with Next.js 15
- 🎭 Smooth animations using Framer Motion
- 🧩 Interactive components
- 📝 Contact form with Formspree integration
- 🎯 SEO friendly with automatic sitemap generation
- 📄 Automatic PDF resume generation with customizable data
- 🚀 Easy deployment to Vercel

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Puppeteer (for PDF resume generation)
- Font Awesome (for PDF icons)
- Formspree (for contact form)
- next-sitemap (for SEO and sitemap generation)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Formspree ID (see [Environment Variables](#environment-variables) section below).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```
# Formspree ID for contact form
NEXT_PUBLIC_FORMSPREE_ID=your-form-id

# Your website URL (for sitemap generation)
SITE_URL=https://sergot.pl
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID (not the full URL) | `abcdefgh` |
| `SITE_URL` | Your website URL for sitemap generation | `https://sergot.pl` |

## Customization

### Personal Information

All personal information is centralized in the `src/data` directory:

1. Update personal info in `src/data/personal.ts`
2. Modify experience in `src/data/jobs.ts`
3. Update skills in `src/data/skills.ts`
4. Edit projects in `src/data/projects.ts`

### Styling

The website uses Tailwind CSS for styling with dark mode support:

- Colors: Update the color scheme in `tailwind.config.js`
- Typography: Modify font settings in `src/app/layout.tsx`
- Dark mode: Customize dark mode colors in `src/app/globals.css`
- Components: Each component in `src/components` has its own styles

### PDF Resume Generation

The site includes automatic PDF resume generation:

1. Update the template in `scripts/generate-pdf.ts`
2. Customize the data in the data files:
   - Personal information (including website URL) in `src/data/personal.ts`
   - Experience details in `src/data/jobs.ts`
   - Skills and categories in `src/data/skills.ts`
   - Projects (including GitHub links) in `src/data/projects.ts`
3. Generate a new PDF:
   ```bash
   npm run pdf
   ```
4. The PDF will be saved to `public/your-name-resume.pdf`


### Contact Form

The contact form is integrated with Formspree:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID (the part after `f/` in the endpoint URL)
3. Add your form ID to `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID=your-form-id`
4. The form includes:
   - Name validation
   - Email validation
   - Message length requirements
   - Success/error handling
   - Loading states

## Project Structure

```
scripts/              # Utility scripts (PDF generation)
next-sitemap.config.js # Sitemap generation configuration
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── data/                # Data files (personal, jobs, skills, projects)
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Deployment

The website is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy!

Alternative deployment options:
- Netlify
- AWS Amplify
- GitHub Pages

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (automatically generates sitemap)
- `npm run start` - Start production server
- `npm run pdf` - Generate PDF resume
- `npm run sitemap` - Generate sitemap manually
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
