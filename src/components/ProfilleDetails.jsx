import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/config";
import { query, where, getDocs, collection } from "firebase/firestore";
import ShowDetailsField from "./showDetailField";

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
    <div className="flex justify-center items-center p-6 w-full bg-neutral-600 min-h-screen">
      <div className="w-full max-w-lg bg-neutral-300 rounded-lg shadow-lg p-5 ">
        <div className="bg-neutral-900 w-full p-5 mb-5">
          <h1 className="text-3xl font-semibold text-center text-white ">
            Profile Details
          </h1>
        </div>
        <ShowDetailsField title={"Name"} value={profile.name} />
        <ShowDetailsField
          title={"Photo Link"}
          value={profile.photo}
          isImage={true}
        />
        <ShowDetailsField title={"Description"} value={profile.description} />
        <ShowDetailsField title={"Address"} value={profile.address} />
        <ShowDetailsField title={"Contact"} value={profile.contact} />
        <ShowDetailsField title={"Interests"} value={profile.interests} />
      </div>
    </div>
  );
};

export default ProfileDetails;
