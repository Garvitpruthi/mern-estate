import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table styling in PDF
import handleDownloadPDF from './downloadPdf';


function ListingsTable({ reportData, user }) {
    const listings = reportData.listings;
    const userId = user._id;
    console.log("listings ka data ");
    console.log(listings);
    console.log("user ka data ");
    console.log(userId);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [showMoreColumns, setShowMoreColumns] = useState(false);
  const [filteredListings, setFilteredListings] = useState(listings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    offer: '',
    sortBy: '',
  });

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredListings.slice(indexOfFirstRow, indexOfLastRow);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = filteredListings.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredListings(filtered);
  };

  // Fetch Filtered Data
  const fetchFilteredData = async () => {
    try {
      const searchQuery = new URLSearchParams({
        ...filters,
        userId: userId,
      }).toString();
      const response = await fetch(`api/listing/table?${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFilteredListings(data.listings);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [filters]);

  // PDF Download Logic
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const tableColumns = ['Name', 'Price', 'Address', 'Type', 'Offer'];
//     const tableRows = currentRows.map(listing => [
//       listing.name,
//       `$${listing.regularPrice}`,
//       listing.address,
//       listing.type,
//       listing.offer ? 'Yes' : 'No',
//     ]);

//     doc.autoTable({
//       head: [tableColumns],
//       body: tableRows,
//       theme: 'grid',
//       styles: { cellPadding: 5, fontSize: 10, valign: 'middle' },
//     });

//     doc.save('listings-report.pdf');
//   };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Listings</h2>

      {/* Filter and Search */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded-lg px-4 py-2 flex-1 transition-all focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border rounded-lg px-4 py-2 transition-all hover:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Types</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <select
          value={filters.offer}
          onChange={(e) => setFilters({ ...filters, offer: e.target.value })}
          className="border rounded-lg px-4 py-2 transition-all hover:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Offers</option>
          <option value="true">Offer</option>
          <option value="false">No Offer</option>
        </select>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="border rounded-lg px-4 py-2 transition-all hover:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
          <option value="savedBy">Popularity</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-gray-800">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            {showMoreColumns && (
              <>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Offer</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((listing) => (
            <tr key={listing._id} className="hover:bg-gray-50 transition-all">
              <td className="border border-gray-300 px-4 py-2">{listing.name}</td>
              <td className="border border-gray-300 px-4 py-2">${listing.regularPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{listing.address}</td>
              {showMoreColumns && (
                <>
                  <td className="border border-gray-300 px-4 py-2">{listing.type}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {listing.offer ? 'Yes' : 'No'}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all hover:bg-blue-600"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {Math.ceil(filteredListings.length / rowsPerPage)}
        </p>
        <button
          disabled={currentPage === Math.ceil(filteredListings.length / rowsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Show More Columns */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowMoreColumns((prev) => !prev)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-green-600"
        >
          {showMoreColumns ? 'Hide Additional Columns' : 'Show More Columns'}
        </button>
      </div>

      {/* Download PDF Button */}
      <div className="mt-6 text-center">
        <button
          onClick={()=> handleDownloadPDF(reportData, user)}
          className="bg-red-500 text-white px-6 py-3 rounded-lg transition-all hover:bg-red-600"
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}

export default ListingsTable;

