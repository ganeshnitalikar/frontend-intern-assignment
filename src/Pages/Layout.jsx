import React from "react";
import { Link } from "react-router-dom";
import "../components/Util.css";

const Layout = () => {
  return (
    <div className="bg-neutral-700 w-full h-[100vh] flex justify-center items-center flex-col p-4">
      <h2 className="text-2xl">Select Role/Authentication</h2>
      <div className="flex justify-center items-center gap-4 p-5">
        <Link to="/clientHome">
          <button className="btn">Client</button>
        </Link>
        <Link to="/adminHome">
          <button className="btn">Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
