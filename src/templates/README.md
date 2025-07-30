# Regent College London Offer Letter PDF Templates

This package contains HTML templates and CSS styling to generate PDF offer letters that match the Regent College London design.

## Files Structure

```
templates/
├── complete-offer-letter.html    # Complete 2-page template (recommended)
├── offer-letter-page1.html       # Individual page 1 template
├── offer-letter-page2.html       # Individual page 2 template
├── styles.css                    # Complete styling for all templates
├── data-structure.js             # Data structure and helper functions
└── README.md                     # This file
```

## Usage in Node.js Backend

### Option 1: Using Handlebars (Recommended)

```javascript
const fs = require('fs');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');

// Read template
const templateHtml = fs.readFileSync('templates/complete-offer-letter.html', 'utf8');
const template = handlebars.compile(templateHtml);

// Your data
const offerData = {
  date: "15/01/2024",
  studentName: "John Smith",
  dateOfBirth: "01/05/1995",
  studentReferenceId: "LD-60000-159277",
  offerType: "Offer in Principle",
  provider: "RTC Education Ltd trading as Regent College London",
  awardingBody: "University of Greater Manchester",
  cohort: "January 2024 Intake",
  courseName: "MSc Computer Science",
  tuitionFees: "£17,500**",
  courseDuration: "1 Year",
  location: "London",
  courseStartDate: "22/03/2026",
  bursaryAmount: "£5000.00",
  academicConditions: [
    "Statement of comparability from Naric and MOI"
  ],
  otherConditions: [
    "Attending a Credibility Interview...",
    "Signed Tuition Plan and evidence...",
    "UKVI Compliant Bank Statement...",
    "TB test certificate (if applicable)..."
  ],
  continuedText: "location while you are looking for suitable accommodation...",
  signatoryName: "Turkiz Erdogan",
  signatoryTitle: "Head of Admissions",
  signatureBase64: null // or base64 encoded signature
};

// Generate HTML
const html = template(offerData);

// Convert to PDF
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
const pdf = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: {
    top: '10mm',
    right: '10mm',
    bottom: '10mm',
    left: '10mm'
  }
});
await browser.close();
```

### Option 2: Using Template Literals

```javascript
const fs = require('fs');

// Read template
let templateHtml = fs.readFileSync('templates/complete-offer-letter.html', 'utf8');

// Replace placeholders
const placeholders = {
  '{{studentName}}': offerData.studentName,
  '{{date}}': offerData.date,
  '{{dateOfBirth}}': offerData.dateOfBirth,
  // ... add all other fields
};

Object.entries(placeholders).forEach(([placeholder, value]) => {
  templateHtml = templateHtml.replace(new RegExp(placeholder, 'g'), value);
});

// Handle arrays (academic and other conditions)
let academicConditionsHtml = '';
offerData.academicConditions.forEach(condition => {
  academicConditionsHtml += `<li>${condition}</li>`;
});
templateHtml = templateHtml.replace('{{#each academicConditions}}<li>{{this}}</li>{{/each}}', academicConditionsHtml);
```

## Key Features

1. **Responsive Design**: Works on different screen sizes
2. **Print Optimized**: Includes print-specific CSS rules
3. **Watermarks**: Includes background watermarks matching the original
4. **Professional Layout**: Matches the exact layout of RCL offer letters
5. **Dynamic Content**: All fields are templated for easy data injection
6. **Modular Structure**: Can be broken into components if needed

## Customization

### Adding New Fields
1. Add the field to `data-structure.js`
2. Add the placeholder `{{fieldName}}` in the HTML template
3. Update your data object when generating PDFs

### Styling Changes
- Modify `styles.css` to adjust colors, fonts, spacing
- The design uses CSS Grid and Flexbox for responsive layout
- Print styles are included for PDF generation

### Logo Replacement
Replace the logo URL in the templates:
```html
<img src="https://your-logo-url.com/logo.png" alt="Your Institution" />
```

## Requirements

### Node.js Dependencies
```bash
npm install puppeteer handlebars
```

### Alternative PDF Libraries
- **Playwright**: Similar to Puppeteer
- **wkhtmltopdf**: Command-line tool
- **PDFKit**: Direct PDF generation (requires manual layout)

## Notes

- The templates include proper page breaks for multi-page PDFs
- Watermarks are implemented using CSS and SVG
- The design is optimized for A4 paper size
- All colors and spacing match the original RCL design
- The signature section supports both base64 images and empty spaces

## Troubleshooting

### Common Issues
1. **Missing Images**: Ensure the logo URL is accessible
2. **CSS Not Loading**: Check the path to `styles.css`
3. **Handlebars Arrays**: Use `{{#each array}}` syntax for lists
4. **PDF Margins**: Adjust Puppeteer margin settings if content is cut off

### Performance Tips
- Cache compiled Handlebars templates
- Reuse Puppeteer browser instances
- Optimize images for web delivery
- Use async/await for PDF generation