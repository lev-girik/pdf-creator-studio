// Sample data structure for the offer letter template
// Use this structure when generating PDFs in your Node.js backend

const offerLetterData = {
  // Basic document info
  date: "DD/MM/YYYY",
  
  // Student information
  studentName: "<Student Name>",
  dateOfBirth: "DD/MM/YYYY", 
  studentReferenceId: "LD-60000-159277",
  
  // Offer details
  offerType: "Offer in Principle", // or "Unconditional Offer", "Conditional Offer"
  
  // Course information
  provider: "RTC Education Ltd trading as Regent College London",
  awardingBody: "University of Greater Manchester",
  cohort: "<Intake Name>",
  courseName: "<Course Name>",
  tuitionFees: "£17,500**",
  courseDuration: "1 Year",
  location: "London",
  courseStartDate: "22/03/2026",
  
  // Financial information
  bursaryAmount: "£5000.00", // Optional, can be null
  
  // Conditions arrays
  academicConditions: [
    "Statement of comparability from Naric and MOI"
  ],
  
  otherConditions: [
    "Attending a Credibility Interview and satisfying the interviewer regarding your intention to study. Please refer to the College's credibility interview policy <link> for further information.",
    "Signed Tuition Plan and evidence of payment or notification of payment to the tuition fees (Details will be provided on the payment plan after undergoing the Credibility Interview).",
    "UKVI Compliant Bank Statement showing that you have the necessary funds for maintenance and the remaining balance of the course fee. The funds must be held for at least 28 consecutive days. The end date of the 28-day period must be within 31 calendar days of the date you intend to apply for your visa. Further information about the money you will need can be found <link>.",
    "TB test certificate (if applicable). A full list of countries that require a TB test certificate for Student Visa Route application can be found <link>."
  ],
  
  // Page 2 content
  continuedText: "location while you are looking for suitable accommodation. Please check with us when enquiring about the course; however, your campus address will be confirmed in your CAS letter.",
  
  // Signature information
  signatoryName: "Turkiz Erdogan", // or any other signatory
  signatoryTitle: "Head of Admissions",
  signatureBase64: null, // Base64 encoded signature image, or null for no signature
  
  // Additional metadata
  documentType: "offer_letter",
  version: "1.0",
  generatedDate: new Date().toISOString()
};

// Export for use in Node.js
module.exports = {
  offerLetterData,
  
  // Helper function to validate required fields
  validateOfferData: (data) => {
    const requiredFields = [
      'date', 'studentName', 'dateOfBirth', 'studentReferenceId',
      'offerType', 'provider', 'courseName', 'courseStartDate',
      'signatoryName', 'signatoryTitle'
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    return true;
  },
  
  // Helper function to format data for template
  formatDataForTemplate: (rawData) => {
    return {
      ...offerLetterData,
      ...rawData,
      // Ensure arrays are properly formatted
      academicConditions: rawData.academicConditions || offerLetterData.academicConditions,
      otherConditions: rawData.otherConditions || offerLetterData.otherConditions
    };
  }
};