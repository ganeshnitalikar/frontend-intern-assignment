import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import ClientPanel from "./components/ClientPanel";
import AdminPanel from "./components/AdminPanel";
import AddProfileForm from "./components/AddProflieForm";
import NoPage from "./Pages/NoPage";
import EditProfile from "./components/EditProfile";
import ProfileDetails from "./components/ProfilleDetails";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          Authentication Screen
        </Route>
        <Route path="/clientHome" element={<ClientPanel />}>
          Client Home
        </Route>
        <Route path="/adminHome" element={<AdminPanel />}>
          Admin Home
        </Route>
        <Route path="/addprofile" element={<AddProfileForm />}>
          Add Profile
        </Route>
        <Route path="/editProfile/:profileId" element={<EditProfile />} />
        <Route path="/profileDetails/:profileId" element={<ProfileDetails />} />

        <Route path="*" element={<NoPage />}>
          No Page Found
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
