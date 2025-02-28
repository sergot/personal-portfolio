import puppeteer from 'puppeteer';
import { personal } from '../src/data/personal';
import { jobs } from '../src/data/jobs';
import { skills, categories } from '../src/data/skills';
import { projects } from '../src/data/projects';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a filename-friendly version of the user's name
const resumeFileName = personal.name.toLowerCase().replace(/\s+/g, '-');
const outputPath = join(__dirname, `../public/${resumeFileName}-resume.pdf`);

async function generatePDF(): Promise<void> {
  console.log('Starting PDF generation...');
  console.log('Output path:', outputPath);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  });
  const page = await browser.newPage();

  // Your resume HTML template
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <style>
          :root {
            --primary: #2563eb;
            --primary-light: #60a5fa;
            --primary-bg: #f0f7ff;
            --text: #111827;
            --text-light: #4b5563;
            --background: #ffffff;
            --border: #e5e7eb;
            --left-column-width: 33%;
            --right-column-width: 67%;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            color: var(--text);
            background: var(--background);
            line-height: 1.4;
            margin: 0;
            padding: 0;
            font-size: 0.95rem;
          }

          /* Two-column layout */
          .resume-container {
            display: flex;
            min-height: 100vh;
          }

          .left-column {
            width: var(--left-column-width);
            background-color: var(--primary-bg);
            padding: 1.5rem;
            /* Ensure the background extends to the full height of all pages */
            position: relative;
            z-index: 0;
          }

          /* Add a pseudo-element that extends the full height */
          .left-column::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: var(--left-column-width);
            height: 100%;
            background-color: var(--primary-bg);
            z-index: -1;
          }

          .right-column {
            width: var(--right-column-width);
            padding: 1.5rem;
          }

          /* Header styles */
          .header {
            margin-bottom: 1.25rem;
          }

          h1 {
            color: var(--primary);
            font-size: 1.8rem;
            margin: 0 0 0.25rem 0;
            line-height: 1.2;
          }

          .title {
            font-size: 1rem;
            color: var(--text-light);
            margin-bottom: 0.5rem;
          }

          /* Contact info styles */
          .contact-info {
            margin-bottom: 1.25rem;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-light);
            margin-bottom: 0.4rem;
            font-size: 0.9rem;
          }

          .contact-item i {
            color: var(--primary);
            width: 16px;
            text-align: center;
          }

          .contact-item a {
            color: var(--primary);
            text-decoration: none;
          }

          /* Section styles */
          .section {
            margin-bottom: 1.25rem;
          }

          h2 {
            color: var(--primary);
            font-size: 1.2rem;
            margin: 0 0 0.75rem 0;
            padding-bottom: 0.3rem;
            border-bottom: 1px solid var(--border);
            page-break-after: avoid;
          }

          /* Summary styles */
          .summary {
            font-size: 0.9rem;
            color: var(--text-light);
            margin-bottom: 1.25rem;
            line-height: 1.4;
          }

          /* Job styles */
          .job {
            margin-bottom: 1rem;
            page-break-inside: avoid;
          }

          .job h3 {
            color: var(--primary);
            font-size: 1rem;
            margin: 0 0 0.15rem 0;
          }

          .job-title {
            font-weight: 600;
            color: var(--text);
            margin: 0;
            font-size: 0.9rem;
          }

          .job-date {
            color: var(--text-light);
            font-size: 0.8rem;
            margin: 0.15rem 0 0.3rem 0;
          }

          .job ul {
            margin: 0.3rem 0;
            padding-left: 1.1rem;
          }

          .job li {
            margin-bottom: 0.25rem;
            color: var(--text);
            font-size: 0.85rem;
          }

          /* Skills styles */
          .skills-category {
            margin-bottom: 0.8rem;
            page-break-inside: avoid;
          }

          .skills-category h3 {
            color: var(--primary);
            font-size: 0.95rem;
            margin: 0 0 0.3rem 0;
          }

          .skills-category ul {
            margin: 0;
            padding-left: 1.25rem;
          }

          .skills-category li {
            margin-bottom: 0.2rem;
            font-size: 0.85rem;
          }

          /* Project styles */
          .project {
            margin-bottom: 0.8rem;
            page-break-inside: avoid;
          }

          .project h3 {
            color: var(--primary);
            font-size: 0.95rem;
            margin: 0 0 0.2rem 0;
          }

          .project p {
            margin: 0.2rem 0;
            font-size: 0.85rem;
          }

          .technologies {
            color: var(--text-light);
            font-size: 0.8rem;
          }

          .project-link {
            color: var(--primary);
            margin-left: 0.5rem;
            text-decoration: none;
          }

          /* Page break styling */
          @page {
            margin: 0;
            size: A4;
          }

          /* Add top margin to all pages except the first */
          @page :not(:first) {
            margin-top: 3cm;
          }

          /* Ensure job descriptions don't break across pages if possible */
          .job {
            page-break-inside: avoid;
          }

          /* Ensure the first two jobs stay on the first page if possible */
          .job:nth-child(1),
          .job:nth-child(2) {
            break-inside: avoid;
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <!-- Left Column -->
          <div class="left-column">
            <div class="header">
              <h1>${personal.name}</h1>
              <p class="title">${personal.title}</p>
            </div>
            
            <div class="section">
              <h2>Contact</h2>
              <div class="contact-info">
                <div class="contact-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${personal.location}</span>
                </div>
                <div class="contact-item">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:${personal.email}">${personal.email}</a>
                </div>
                <div class="contact-item">
                  <i class="fas fa-globe"></i>
                  <a href="${personal.website}" target="_blank">${personal.website.replace(/^https?:\/\//, '')}</a>
                </div>
                <div class="contact-item">
                  <i class="fab fa-linkedin"></i>
                  <a href="${personal.linkedin}" target="_blank">LinkedIn</a>
                </div>
                <div class="contact-item">
                  <i class="fab fa-github"></i>
                  <a href="${personal.github}" target="_blank">GitHub</a>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Skills</h2>
              ${categories.map((category, index) => `
                <div class="skills-category">
                  <h3>${category}</h3>
                  <ul>
                    ${skills
                      .filter(skill => skill.category === category)
                      .map(skill => `
                        <li>
                          ${skill.name}
                          ${skill.frameworks && skill.frameworks.length > 0 ? `
                            <span class="technologies">
                              (${skill.frameworks.join(', ')})
                            </span>
                          ` : ''}
                        </li>
                      `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Projects</h2>
              ${projects.slice(0, 3).map(project => `
                <div class="project">
                  <h3>
                    ${project.title}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                  </h3>
                  <p>${project.description}</p>
                  <p class="technologies">
                    <strong>Technologies:</strong> ${project.technologies.join(', ')}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Column -->
          <div class="right-column">
            <div class="section">
              <h2>Experience</h2>
              ${jobs.map((job, index) => `
                <div class="job">
                  <h3>${job.company}</h3>
                  <p class="job-title">${job.title}</p>
                  <p class="job-date">${job.startDate} - ${job.endDate || 'Present'} | ${job.location}</p>
                  <ul>
                    ${job.description.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                  ${job.technologies ? `
                    <p class="technologies">
                      <strong>Technologies:</strong> ${job.technologies.join(', ')}
                    </p>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Summary</h2>
              <div class="summary">
                ${personal.summary}
              </div>
            </div>

            ${projects.length > 3 ? `
              <div class="section">
                <h2>More Projects</h2>
                ${projects.slice(3).map(project => `
                  <div class="project">
                    <h3>
                      ${project.title}
                      ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                      ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                    </h3>
                    <p>${project.description}</p>
                    <p class="technologies">
                      <strong>Technologies:</strong> ${project.technologies.join(', ')}
                    </p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  
  // Wait for Font Awesome to load
  await page.waitForFunction(() => {
    const styleSheets = Array.from(document.styleSheets);
    return styleSheets.some(sheet => 
      sheet.href && sheet.href.includes('font-awesome')
    );
  });

  // Generate PDF with no margins (margins are handled in the HTML)
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width: 100%; height: 0;"></div>
    `,
    footerTemplate: `
      <div style="font-size: 8px; padding: 0 1cm; width: 100%; text-align: center; color: #4b5563;">
        Generated on ${new Date().toLocaleDateString()} | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `
  });

  await browser.close();
  console.log('PDF generated successfully!');
}

generatePDF().catch(console.error);