import React from "react";

const ShowDetailsField = ({ title, value, isImage = false }) => {
  return (
    <div className="mb-6 border-b-2 border-neutral-950">
      <label className="block text-gray-700 font-medium text-sm mb-1">
        {title} :
      </label>
      {isImage && (
        <div className="flex justify-center  items-center  p-5">
          <img className=" lg:w-1/2 w-full rounded-3xl" src={value} alt="" />
        </div>
      )}
      <p className="text-gray-800 text-sm">{value}</p>
    </div>
  );
};

export default ShowDetailsField;
