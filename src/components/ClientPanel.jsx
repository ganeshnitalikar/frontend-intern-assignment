import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setProfiles } from "../redux/proflieSlice";
import { fetchProfiles } from "../services/FirebaseServices";
import ProfileList from "./ProfileList";

const ClientPanel = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.profiles);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      setLoading(true);
      try {
        const fetchedProfiles = await fetchProfiles();
        dispatch(setProfiles(fetchedProfiles));
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <>
      <div className="bg-neutral-600 w-full h-20 flex justify-center items-center">
        <h1 className="text-xl text-center">Client Panel</h1>
      </div>
      <div className="p-5">
        <div className="search-bar mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search profiles by name..."
            className="p-2 w-full "
          />
        </div>
        {loading ? (
          <div className="text-center">
            <p>Loading profiles...</p>
          </div>
        ) : (
          <ProfileList />
        )}
      </div>
    </>
  );
};

export default ClientPanel;
