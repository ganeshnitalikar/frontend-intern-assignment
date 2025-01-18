import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { LoadScript } from "@react-google-maps/api";

const ProfileList = ({ AdminProfile }) => {
  const { profiles, searchQuery } = useSelector((state) => state.profiles);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {AdminProfile ? (
        <div className="profile-list flex justify-center items-center w-full bg-slate-300 gap-3 p-5 flex-wrap">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <ProfileCard key={profile.id} profile={profile} isAdmin />
            ))
          ) : (
            <div className="no-profiles text-center">
              <p>No profiles found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="profile-list flex justify-center items-center w-full bg-slate-300 gap-3 p-5 flex-wrap">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isAdmin={AdminProfile}
              />
            ))
          ) : (
            <div className="no-profiles text-center">
              <p>No profiles found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileList;
