import jsPDF from 'jspdf';
import 'jspdf-autotable';

const handleDownloadPDF = (reportData, userDetails) => {
  const doc = new jsPDF();

  // Title and Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Woodland Escape', 105, 15, null, null, 'center');

  doc.setFontSize(16);
  doc.text('Report Page', 105, 25, null, null, 'center');

  doc.setFontSize(10);
  const generationDate = new Date().toLocaleString();
  doc.text(`Generated on: ${generationDate}`, 105, 33, null, null, 'center');

  // User Details Section
  doc.setFontSize(12);
  doc.text('User Details', 14, 45);
  const { username, email } = userDetails;

  const userDetailsData = [
    [`Name`, username || 'N/A'],
    [`Email`, email || 'N/A']
  ];

  userDetailsData.forEach((row, index) => {
    doc.text(`${row[0]}: ${row[1]}`, 14, 55 + index * 8);
  });

  // Summary Section
  doc.setFontSize(12);
  doc.text('Summary', 14, 85);
  const { totalListings, totalSavedByUser, averagePrice, totalDiscounts, mostExpensiveListing, leastExpensiveListing } = reportData;

  const summaryData = [
    [`Total Listings`, totalListings],
    [`Saved by Users`, totalSavedByUser],
    [`Average Price`, `$${averagePrice}`],
    [`Total Discounts`, totalDiscounts],
  ];

  summaryData.forEach((row, index) => {
    doc.text(`${row[0]}: ${row[1]}`, 14, 95 + index * 8);
  });

  // Special Listings Section
  if (mostExpensiveListing && leastExpensiveListing) {
    doc.text('Special Listings', 14, 135);
    doc.text(
      `Most Expensive: ${mostExpensiveListing.name} - $${mostExpensiveListing.regularPrice}`,
      14,
      143
    );
    doc.text(
      `Least Expensive: ${leastExpensiveListing.name} - $${leastExpensiveListing.regularPrice}`,
      14,
      151
    );
  }

  // Listings Table
  const tableColumns = ['Name', 'Price', 'Address', 'Type', 'Offer'];
  const tableRows = reportData.listings.map((listing) => [
    listing.name,
    `$${listing.regularPrice}`,
    listing.address,
    listing.type,
    listing.offer ? 'Yes' : 'No',
  ]);

  doc.autoTable({
    startY: 165,
    head: [tableColumns],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
    styles: { fontSize: 10, halign: 'center', valign: 'middle' },
  });

  // Footer with Page Numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 105, 285, null, null, 'center');
    doc.text('Generated by Listing Manager', 105, 292, null, null, 'center');
  }

  doc.save('listing-report.pdf');
};

export default handleDownloadPDF;
