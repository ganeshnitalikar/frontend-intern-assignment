import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../redux/proflieSlice";
import "./Util.css";
import { BiEdit } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { deleteProfileFromFirebase } from "../services/FirebaseServices";
import LocatorMap from "./LocatorMap";

const ProfileCard = ({ profile, isAdmin }) => {
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);

  const handleDelete = async (profileId) => {
    try {
      console.log(profileId);
      await deleteProfileFromFirebase(profileId);
      dispatch(deleteProfile(profileId));
      alert("Profile deleted successfully.");
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please try again.");
    }
  };

  return (
    <div className="profile-card bg-green-300 border-neutral-950 flex justify-center w-full sm:w-11/12  md:w-1/3 lg:w-1/4 md:h-1/3 items-center flex-col border-2 p-5 rounded-2xl lg:h-1/3">
      <div className="border-b-2 pb-3 flex justify-center items-center w-full h-1/3">
        <img
          className="w-full sm:w-1/2 md:w-1/2"
          src={profile.photo}
          alt="Profile Img"
        />
      </div>
      <div className="border-b-2 py-2 w-full flex justify-center h-1/3 items-center">
        <h3>{profile.name}</h3>
      </div>
      <div className="border-b-2 w-full py-2 flex justify-center items-center overflow-ellipsis">
        <p className="overflow-ellipsis">{profile.description}</p>
      </div>
      <div className="flex justify-center w-full gap-2 items-center p-2">
        <Link to={`/profileDetails/${profile.id}`}>
          <button className="btn">Summary</button>
        </Link>
        <button className="btn" onClick={() => setShowMap((prev) => !prev)}>
          <CiLocationOn />
        </button>
        {isAdmin && (
          <>
            <Link to={`/editProfile/${profile.id}`}>
              <button className="btn">
                <BiEdit />
              </button>
            </Link>
            <button className="btn" onClick={() => handleDelete(profile.id)}>
              <ImCancelCircle />
            </button>
          </>
        )}
      </div>
      {showMap && (
        <LocatorMap key={profile.id} location={{ address: profile.address }} />
      )}
    </div>
  );
};

export default ProfileCard;
