import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const SavedHomesPage = () => {
  const [savedHome, setSavedHome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/listing/getSavedHomes?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setSavedHome(data.savedHomes);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  if (loading) {
    return <p className="text-slate-500 text-xl">Loading saved homes...</p>;
  }

  if (error) {
    return (
      <p className="text-slate-500 text-xl">
        Something went wrong. Please try again later.
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {savedHome && savedHome.length > 0 ? (
        <div>
          <div className="my-5">
            <h2 className="text-3xl font-bold text-slate-700">
              Your Saved Properties
            </h2>
            <Link
              className="text-lg text-blue-800 hover:underline"
              to={"/search?offer=true"}
            >
              Add more Properties
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {savedHome.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-2xl text-slate-500">
            <span className="text-slate-500">Woodland</span>{" "}
            <span className="text-slate-700">Escape</span>: No saved properties
            yet.
          </p>
          <Link
            to="/search"
            className="mt-5 inline-block text-slate-700 text-slate-500 text-lg px-6 py-3 rounded-lg shadow hover:text-slate-700"
          >
            Explore Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedHomesPage;
