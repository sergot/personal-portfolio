# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design with smooth animations and dark mode support.

## Features

- 🎨 Modern and clean design
- 🌙 Dark mode support
- 📱 Fully responsive
- ⚡ Fast and optimized
- 🎭 Smooth animations
- 🧩 Interactive components
- 📝 Contact form
- 🎯 SEO friendly

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

## Customization

### Personal Information

1. Update your name and title in `src/components/Hero.tsx`
2. Modify your experience in `src/components/Experience.tsx`
3. Add your skills in `src/components/Skills.tsx`
4. Update projects in `src/components/Projects.tsx`
5. Customize contact information in `src/components/Contact.tsx`

### Styling

The website uses Tailwind CSS for styling. You can customize the theme by modifying:

- Colors: Update the color scheme in `tailwind.config.js`
- Typography: Modify font settings in `src/app/layout.tsx`
- Spacing: Adjust padding and margins in component files

### Adding Projects

To add a new project, update the `projects` array in `src/components/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    title: 'Your Project',
    description: 'Project description',
    technologies: ['Tech1', 'Tech2'],
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://project.example.com',
    image: '/project-image.jpg',
  },
  // Add more projects...
];
```

### Contact Form

The contact form is set up to handle submissions, but you'll need to add your own form handling logic in `src/components/Contact.tsx`. You can integrate it with services like:

- Email service (SendGrid, AWS SES)
- Form backends (Formspree, Netlify Forms)
- Custom API endpoint

## Deployment

The website can be easily deployed to various platforms:

1. Vercel (Recommended):
   ```bash
   npm run build
   vercel deploy
   ```

2. Netlify:
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
