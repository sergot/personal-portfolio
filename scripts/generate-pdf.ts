import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { personal } from '../src/data/personal';
import { jobs } from '../src/data/jobs';
import { skills, categories } from '../src/data/skills';
import { projects } from '../src/data/projects';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a filename-friendly version of the user's name
const resumeFileName = personal.name.toLowerCase().replace(/\s+/g, '-');
const outputPath = join(__dirname, `../public/${resumeFileName}-resume.pdf`);

async function generatePDF(): Promise<void> {
  try {
    console.log('Starting PDF generation...');
    console.log('Output path:', outputPath);

    // Create a document with standard settings
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0, // We'll handle margins manually for more control
      info: {
        Title: `${personal.name} - Resume`,
        Author: personal.name,
        Keywords: 'resume, curriculum vitae, software engineer'
      },
      font: 'Helvetica' // Using a font with good UTF-8 support
    });

    // Pipe its output somewhere, in this case to a file
    doc.pipe(createWriteStream(outputPath));

    // Define colors
    const colors = {
      primary: '#4b6bfb', // More subtle blue
      primaryLight: '#dbeafe', // Light blue
      dark: '#1e293b', // Dark blue/gray
      text: '#334155', // Slate gray
      lightText: '#64748b', // Light slate
      background: '#f8fafc', // Very light gray
      white: '#ffffff'
    };

    // Define layout measurements
    const layout = {
      margin: 30,
      topPadding: 40, // Added explicit top padding for all pages
      rightPadding: 20, // Added right padding for the left column
      leftColumnWidth: 380,
      rightColumnWidth: 185,
      headerHeight: 110, // Increased from 100 to ensure title is visible
      pageWidth: 595.28, // A4 width in points
      pageHeight: 841.89 // A4 height in points
    };

    // Helper function to add a section title
    function addSectionTitle(text: string, x: number, width: number): void {
      doc.fontSize(14)
         .fillColor(colors.primary)
         .text(text, x, doc.y, { width })
         .moveDown(0.2);
      
      // Add a subtle line under the title
      doc.moveTo(x, doc.y)
         .lineTo(x + width - 10, doc.y)
         .lineWidth(1)
         .strokeColor(colors.primary)
         .stroke();
      
      doc.moveDown(0.5);
    }

    function addNewPageWithBackground(): number {
      doc.addPage();
      doc.rect(0, 0, layout.leftColumnWidth + layout.margin, layout.pageHeight)
         .fill(colors.background);
      doc.y = layout.topPadding;
      return layout.topPadding;
    }

    function checkForNewPage(yPosition: number, threshold: number, sectionTitle?: string, x?: number, width?: number): number {
      if (yPosition > layout.pageHeight - threshold) {
        addNewPageWithBackground();
        if (sectionTitle && x !== undefined && width !== undefined) {
          addSectionTitle(`${sectionTitle} (continued)`, x, width);
        }
        return doc.y;
      }
      return yPosition;
    }

    // Draw header background
    doc.rect(0, 0, layout.pageWidth, layout.headerHeight)
       .fill(colors.primary);

    // Add name and title in header
    const nameY = 40;
    doc.fontSize(28)
       .fillColor(colors.white)
       .text(personal.name, layout.margin, nameY, { align: 'center', width: layout.pageWidth - (layout.margin * 2) });
    
    // Add separator line
    const lineY = nameY + 40;
    doc.moveTo(layout.pageWidth / 4, lineY)
       .lineTo(layout.pageWidth - (layout.pageWidth / 4), lineY)
       .lineWidth(2)
       .strokeColor(colors.white)
       .stroke();
    
    // Add title
    doc.fontSize(16)
       .fillColor(colors.white)
       .text(personal.title, layout.margin, lineY + 15, { align: 'center', width: layout.pageWidth - (layout.margin * 2) });

    // Calculate column positions
    const leftColumnX = layout.margin;
    const rightColumnX = layout.margin + layout.leftColumnWidth;

    // Draw left column background (subtle color)
    doc.rect(0, layout.headerHeight, layout.leftColumnWidth + layout.margin, layout.pageHeight - layout.headerHeight)
       .fill(colors.background);

    // Set initial Y position for both columns with proper top padding
    const initialY = layout.headerHeight + layout.topPadding;
    
    // RIGHT COLUMN: Contact Information - Set position explicitly
    doc.y = initialY;
    doc.fontSize(12).fillColor(colors.dark);
    addSectionTitle('Contact Information', rightColumnX, layout.rightColumnWidth);
    let rightColumnY = doc.y;

    // Contact details
    const contactFields = [
      { label: 'Email:', value: personal.email, link: `mailto:${personal.email}`, color: colors.primary },
      { label: 'Location:', value: personal.location, color: colors.dark },
      { label: 'GitHub:', value: 'github.com/sergot', link: personal.github, color: colors.primary },
      { label: 'LinkedIn:', value: 'linkedin.com/in/filipsergot', link: personal.linkedin, color: colors.primary }
    ];

    contactFields.forEach((field, index) => {
      doc.fontSize(10)
         .fillColor(colors.text)
         .text(field.label, rightColumnX, rightColumnY)
         .fillColor(field.color)
         .text(field.value, rightColumnX + 50, rightColumnY, field.link ? { link: field.link } : {});
      rightColumnY += index === contactFields.length - 1 ? 30 : 20;
    });

    // LEFT COLUMN: Experience (renamed from Professional Experience)
    doc.y = initialY + 5; // Reduced from 10 to 5 to move Experience higher
    doc.fontSize(12).fillColor(colors.dark);
    addSectionTitle('Experience', leftColumnX, layout.leftColumnWidth - layout.rightPadding);
    
    // Save the current Y position for left column content
    const savedY = doc.y;
    
    // Continue with RIGHT COLUMN: Skills (renamed from Technical Skills)
    doc.y = rightColumnY;
    addSectionTitle('Skills', rightColumnX, layout.rightColumnWidth);
    rightColumnY = doc.y;

    // Add skills by category
    categories.forEach(category => {
      doc.fontSize(11)
         .fillColor(colors.dark)
         .text(category, rightColumnX, rightColumnY, { continued: true })
         .fillColor(colors.lightText)
         .text(':');
      rightColumnY += 15;

      // Get skills for this category
      const categorySkills = skills.filter(skill => skill.category === category);
      
      // Display skills with bullet points
      doc.fontSize(9)
         .fillColor(colors.text);
      
      let skillText = '';
      categorySkills.forEach((skill, index) => {
        skillText += `• ${skill.name}`;
        
        // Add frameworks if available
        if (skill.frameworks && skill.frameworks.length > 0) {
          skillText += `: ${skill.frameworks.join(', ')}`;
        }
        
        if (index < categorySkills.length - 1) {
          skillText += '\n';
        }
      });
      
      doc.text(skillText, rightColumnX, rightColumnY, { width: layout.rightColumnWidth, lineGap: 2 });
      rightColumnY = doc.y + 10;

      rightColumnY = checkForNewPage(rightColumnY, layout.margin);
    });

    // RIGHT COLUMN: Projects
    addSectionTitle('Projects', rightColumnX, layout.rightColumnWidth);
    rightColumnY = doc.y;

    // Add projects
    projects.forEach(project => {
      rightColumnY = checkForNewPage(rightColumnY, 100, 'Projects', rightColumnX, layout.rightColumnWidth);

      // Project title
      doc.fontSize(10)
         .fillColor(colors.primary)
         .text(project.title, rightColumnX, rightColumnY, { link: project.liveUrl });
      rightColumnY += 15;

      // Project description
      doc.fontSize(9)
         .fillColor(colors.text)
         .text(project.description, rightColumnX, rightColumnY, { width: layout.rightColumnWidth, lineGap: 2 });
      rightColumnY = doc.y + 5;

      // Technologies used
      doc.fontSize(8)
         .fillColor(colors.lightText)
         .text(`Technologies: ${project.technologies.join(', ')}`, rightColumnX, rightColumnY, { width: layout.rightColumnWidth });
      rightColumnY = doc.y + 15;
    });
    
    // Now restore position for left column content
    doc.y = savedY;

    // Add jobs
    jobs.forEach(job => {
      doc.y = checkForNewPage(doc.y, 150, 'Experience', leftColumnX, layout.leftColumnWidth - layout.rightPadding);

      // Job title
      doc.fontSize(12)
         .fillColor(colors.dark)
         .text(job.title, leftColumnX, doc.y, { width: layout.leftColumnWidth - layout.rightPadding });
      doc.moveDown(0.8);

      // Company and location
      doc.fontSize(11)
         .fillColor(colors.primary)
         .text(job.company, leftColumnX, doc.y, { continued: true, width: layout.leftColumnWidth - layout.rightPadding })
         .fillColor(colors.lightText)
         .text(` • ${job.location}`);
      doc.moveDown(0.6);

      // Date range
      doc.fontSize(10)
         .fillColor(colors.lightText)
         .text(`${job.startDate} - ${job.endDate}`, leftColumnX, doc.y, { width: layout.leftColumnWidth - layout.rightPadding });
      doc.moveDown(0.6);
      
      // Technologies used - Added as requested
      if (job.technologies && job.technologies.length > 0) {
        doc.fontSize(9)
           .fillColor(colors.primary)
           .text(`Technologies: `, leftColumnX, doc.y, { continued: true, width: layout.leftColumnWidth - layout.rightPadding })
           .fillColor(colors.text)
           .text(job.technologies.join(', '));
        doc.moveDown(0.6);
      }

      // Job description
      doc.fontSize(10)
         .fillColor(colors.text);
      
      job.description.forEach(desc => {
        if (doc.y > layout.pageHeight - 60) {
          doc.y = addNewPageWithBackground();
          doc.fontSize(10)
             .fillColor(colors.primary)
             .text(`${job.company} (continued)`, leftColumnX, doc.y);
          doc.moveDown(0.8);
        }
        
        doc.text(`• ${desc}`, leftColumnX, doc.y, { width: layout.leftColumnWidth - layout.rightPadding, lineGap: 2 });
        doc.moveDown(0.2);
      });

      doc.moveDown(0.6);
    });

    // Add Summary at the bottom of the left column if there's space (renamed from Professional Summary)
    if (doc.y < layout.pageHeight - 150) {
      addSectionTitle('Summary', leftColumnX, layout.leftColumnWidth - layout.rightPadding);
      
      doc.fontSize(10)
         .fillColor(colors.text)
         .text(personal.summary, leftColumnX, doc.y, { width: layout.leftColumnWidth - layout.rightPadding, lineGap: 2 });
    }

    // Finalize PDF file
    doc.end();

    console.log('PDF generated successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Execute the function
generatePDF().catch(error => {
  console.error('Failed to generate PDF:', error);
  process.exit(1);
}); 