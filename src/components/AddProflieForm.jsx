import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { addProfileToFirebase } from "../services/FirebaseServices";
import { nanoid } from "nanoid"; // Import nanoid

const AddProflieForm = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!photo) newErrors.photo = "Photo link is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const newProfile = {
      id: nanoid(),
      name,
      photo,
      description,
      address,
    };

    try {
      await addProfileToFirebase(newProfile);
      alert("Profile added successfully!");

      setTimeout(() => {
        setName("");
        setPhoto("");
        setDescription("");
        setAddress("");
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to add profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-5 w-full flex-col">
      <div>
        <h1 className="text-3xl">Add New Profile</h1>
      </div>
      <div className="w-full h-auto bg-slate-300 border-2 border-neutral-900 p-5">
        <form
          onSubmit={handleAdd}
          className="flex justify-center items-center flex-col h-auto"
        >
          <div className="border-y-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="inputname"
              className="block text-gray-800 font-semibold text-sm"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
            <label className="pt-1 block text-gray-500 text-sm">
              Enter Full Name
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="inputname"
              className="block text-gray-800 font-semibold text-sm"
            >
              Photo Link
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="photoLink"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                onChange={(e) => setPhoto(e.target.value)}
                value={photo}
                disabled={isSubmitting}
              />
            </div>
            <label className="pt-1 block text-gray-500 text-sm">
              Link for profile photo without 'https://'
            </label>
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="inputname"
              className="block text-gray-800 font-semibold text-sm"
            >
              Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="inputname"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                disabled={isSubmitting}
              />
            </div>
            <label className="pt-1 block text-gray-500 text-sm py-5">
              Add Information About you
            </label>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950">
            <label
              htmlFor="inputname"
              className="block text-gray-800 font-semibold text-sm"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="inputname"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                disabled={isSubmitting}
              />
            </div>
            <label className="pt-1 block text-gray-500 text-sm">
              Add Your Address
            </label>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <button
            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add New Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProflieForm;
