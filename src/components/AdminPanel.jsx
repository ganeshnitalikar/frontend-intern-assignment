import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "./ProfileCard";
import "./Util.css";
import { Link } from "react-router-dom";
import { fetchProfiles } from "../services/FirebaseServices";
import { setProfiles } from "../redux/proflieSlice";

const AdminPanel = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        setLoading(true);
        const fetchedProfiles = await fetchProfiles(); // Fetch profiles from Firebase
        dispatch(setProfiles(fetchedProfiles)); // Update Redux state
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setError("Failed to fetch profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProfiles();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Loading profiles...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-neutral-500 w-full">
      <div className="bg-white w-full h-20 flex justify-between items-center px-5">
        <h1 className="text-xl text-center">Admin Panel</h1>
        <Link to={"/addprofile"}>
          <button className="btn">Add Profile</button>
        </Link>
      </div>
      <div className="profile-list flex justify-center items-center w-full bg-slate-300 gap-3 p-5 flex-wrap">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} isAdmin />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
