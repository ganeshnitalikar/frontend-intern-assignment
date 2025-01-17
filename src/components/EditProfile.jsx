import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/config";
import { query, where, getDocs, collection } from "firebase/firestore";
import { updateProfileInFirebase } from "../services/FirebaseServices";

const EditProfile = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required.";
    if (!profile.photo) newErrors.photo = "Photo link is required.";
    if (!profile.description)
      newErrors.description = "Description is required.";
    if (!profile.address) newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const profilesCollection = collection(db, "profiles");
      const q = query(profilesCollection, where("id", "==", profile.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const profileDoc = querySnapshot.docs[0];
        const docId = profileDoc.id;
        await updateProfileInFirebase(docId, {
          name: profile.name,
          photo: profile.photo,
          description: profile.description,
          address: profile.address,
        });

        alert("Profile updated successfully!");
        navigate("/adminHome");
      } else {
        console.error("Profile not found with the given profileId");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Profile not found!</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-5 w-full flex-col">
      <div>
        <h1 className="text-3xl">Edit Profile</h1>
      </div>
      <div className="w-full h-auto bg-slate-300 border-2 border-neutral-900 p-5">
        <form
          onSubmit={handleSave}
          className="flex justify-center items-center flex-col h-auto"
        >
          <div className="border-y-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="name"
              className="block text-gray-800 font-semibold text-sm"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="photo"
              className="block text-gray-800 font-semibold text-sm"
            >
              Photo Link
            </label>
            <input
              type="text"
              name="photo"
              value={profile.photo}
              onChange={handleChange}
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="description"
              className="block text-gray-800 font-semibold text-sm"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={profile.description}
              onChange={handleChange}
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950">
            <label
              htmlFor="address"
              className="block text-gray-800 font-semibold text-sm"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
