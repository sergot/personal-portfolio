import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { personal } from '@/data/personal';
import { jobs } from '@/data/jobs';
import { skills, categories } from '@/data/skills';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = join(__dirname, '../../public/resume.pdf');

async function generatePDF(): Promise<void> {
  try {
    console.log('Starting PDF generation...');
    console.log('Output path:', outputPath);

    // Create a document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true, // Enable buffer pages for better page management
      info: {
        Title: 'Resume',
        Author: personal.name
      }
    });

    // Pipe its output somewhere, in this case to a file
    doc.pipe(createWriteStream(outputPath));

    // Helper function to add a section title
    function addSectionTitle(text: string): void {
      // Check if we need a new page
      if (doc.y > 700) {
        doc.addPage();
      }
      doc.fontSize(14)
         .fillColor('#1E40AF')
         .text(text, { underline: true })
         .moveDown(0.5);
    }

    // Helper function to add body text
    function addBodyText(text: string): void {
      doc.fontSize(10)
         .fillColor('#374151')
         .text(text);
    }

    // Helper function to check and add new page if needed
    function checkNewPage(height: number = 150): void {
      const remainingSpace = 792 - doc.y; // A4 height in points is 792
      if (remainingSpace < height) {
        doc.addPage();
      }
    }

    // Add the header
    doc.fontSize(24)
       .fillColor('#1E40AF')
       .text(personal.name)
       .fontSize(16)
       .fillColor('#4B5563')
       .text(personal.title)
       .fontSize(10)
       .text(`${personal.email} • ${personal.location}`)
       .text(`${personal.github} • ${personal.linkedin}`)
       .moveDown();

    // Add Professional Summary
    addSectionTitle('Professional Summary');
    addBodyText(personal.summary);
    doc.moveDown();

    // Add Experience
    addSectionTitle('Professional Experience');

    jobs.forEach((job, index) => {
      // Estimate space needed for this job entry
      const estimatedHeight = 60 + (job.description.length * 20); // Base height + lines
      checkNewPage(estimatedHeight);

      doc.fontSize(12)
         .fillColor('#000000')
         .text(job.title)
         .fontSize(11)
         .fillColor('#4B5563')
         .text(`${job.company} • ${job.location}`)
         .fontSize(10)
         .text(`${job.startDate} - ${job.endDate}`)
         .moveDown(0.5);

      job.description.forEach(desc => {
        // Check if we need a new page before each bullet point
        checkNewPage(30);
        doc.fontSize(10)
           .fillColor('#374151')
           .text(`• ${desc}`, { indent: 20, lineGap: 2 });
      });

      // Add space between jobs
      if (index < jobs.length - 1) {
        doc.moveDown();
      }
    });

    // Add Skills
    checkNewPage(200); // Ensure enough space for skills section
    addSectionTitle('Technical Skills');

    categories.forEach(category => {
      checkNewPage(80);
      doc.fontSize(12)
         .fillColor('#000000')
         .text(category)
         .moveDown(0.5);

      const categorySkills = skills
        .filter(skill => skill.category === category)
        .map(skill => skill.name)
        .join(', ');

      doc.fontSize(10)
         .fillColor('#374151')
         .text(categorySkills, { 
           indent: 20,
           width: doc.page.width - 100, // Account for margins
           align: 'left'
         })
         .moveDown();
    });

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