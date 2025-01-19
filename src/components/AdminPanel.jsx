import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Util.css";
import { Link } from "react-router-dom";
import { fetchProfiles } from "../services/FirebaseServices";
import { setProfiles, setSearchQuery } from "../redux/proflieSlice";
import ProfileList from "./ProfileList";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
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
    <div className="bg-neutral-500 w-full">
      <div className="bg-white w-full h-20 flex justify-between items-center px-5">
        <h1 className="text-xl text-center">Admin Panel</h1>
        <Link to={"/addprofile"}>
          <button className="btn">Add Profile</button>
        </Link>
      </div>
      <div className="p-5">
        <div className="search-bar my-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search profiles by name..."
            className="p-2 w-full "
          />
        </div>
      </div>
      {loading ? (
        <div className=" text-center">
          <p>Loading profiles...</p>
        </div>
      ) : (
        <ProfileList AdminProfile={true} />
      )}
    </div>
  );
};

export default AdminPanel;
