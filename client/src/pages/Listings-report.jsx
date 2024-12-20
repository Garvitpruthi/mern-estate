import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListingsChart from './ListingChart';
import { Link } from 'react-router-dom';
import ListingsTable from './ListingTable';

function ListingReport() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`/api/listing/getAggregateData/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setReportData(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Error fetching report data');
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-20 animate-pulse">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  const {
    totalListings = 0,
    averagePrice = 0,
    totalSavedByUser = 0,
    totalDiscounts = 0,
    mostExpensiveListing,
    leastExpesiveListing,
    listingsPerMonth = [],
    listings
  } = reportData || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-center text-5xl font-extrabold text-indigo-800 drop-shadow-md">
        Listing Report
      </h1>

      {/* Main Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Listings Per Month</h2>
          <ListingsChart listingsPerMonth={listingsPerMonth} />
        </div>

        {/* Metrics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            <MetricCard title="Total Listings" value={totalListings} />
            <MetricCard title="Saved by Users" value={totalSavedByUser} />
            <MetricCard title="Avg. Price" value={"$ "+averagePrice} />
            <MetricCard title="Total Discounts" value={totalDiscounts} />
          </div>
        </div>
      </div>

      {/* Highlighted Listings Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Highlighted Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mostExpensiveListing && (
            <ListingCard title="Most Expensive" listing={mostExpensiveListing} />
          )}
          {leastExpesiveListing && (
            <ListingCard title="Least Expensive" listing={leastExpesiveListing} />
          )}
        </div>
      </div>
      <div>
        <ListingsTable reportData={reportData} user={currentUser}/>
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-indigo-700">{value}</p>
    </div>
  );
}

function ListingCard({ title, listing }) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md">
        <Link to={`/listing/${listing._id}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600">
            <strong>Name:</strong> {listing.name}
            </p>
            <p className="text-sm text-gray-600">
            <strong>Price:</strong> ${listing.regularPrice}
            </p>
            <p className="text-sm text-gray-600">
            <strong>Address:</strong> {listing.address}
            </p>
        </Link>
    </div>
  );
}

export default ListingReport;
