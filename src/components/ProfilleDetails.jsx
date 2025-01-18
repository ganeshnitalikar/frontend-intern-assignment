import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/config";
import { query, where, getDocs, collection } from "firebase/firestore";

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profilesCollection = collection(db, "profiles");
        const q = query(profilesCollection, where("id", "==", profileId));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0];
          console.log("Profile data found:", profileDoc.data());
          setProfile({ id: profileDoc.id, ...profileDoc.data() });
        } else {
          console.error("Profile not found with the given profileId");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-medium text-gray-700">
          Loading profile...
        </h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-medium text-gray-700">
          Profile not found!
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-6 w-full bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Profile Details
        </h1>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Name
          </label>
          <p className="text-gray-800 text-lg">{profile.name}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Photo Link
          </label>
          <div className="justify-center flex items-center ">
            <img className="lg:w-1/3" src={profile.photo} alt="" />
          </div>
          <p className="text-gray-800 text-lg">{profile.photo}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Description
          </label>
          <p className="text-gray-800 text-lg">{profile.description}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Address
          </label>
          <p className="text-gray-800 text-lg">{profile.address}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Contact
          </label>
          <p className="text-gray-800 text-lg">{profile.contact}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium text-sm mb-1">
            Interests
          </label>
          <p className="text-gray-800 text-lg">{profile.interests}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
