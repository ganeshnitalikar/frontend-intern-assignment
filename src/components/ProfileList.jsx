import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
  const { profiles, searchQuery } = useSelector((state) => state.profiles);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profile-list flex justify-center items-center w-full bg-slate-300 gap-3 p-5 flex-wrap">
      {filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))
      ) : (
        <div className="no-profiles text-center">
          <p>No profiles found.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
