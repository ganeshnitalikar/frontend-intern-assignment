import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addProfileToFirebase } from "../services/FirebaseServices";
import { nanoid } from "nanoid";

const AddProflieForm = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [interests, setInterests] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!photo) newErrors.photo = "Photo link is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!contact) newErrors.contact = "Contact  is required.";
    if (!interests) newErrors.interes = "Interests  is required.";

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
      photo: `https://${photo}`,
      description,
      address,
      contact,
      interests,
      coordinates,
    };

    try {
      await addProfileToFirebase(newProfile);
      alert("Profile added successfully!");

      setTimeout(() => {
        setName("");
        setPhoto("");
        setDescription("");
        setAddress("");
        setContact("");
        setInterests("");
        setCoordinates({ lat: 0, lng: 0 });
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
            <div className="mt-2">
              <input
                type="text"
                name="photo"
                onChange={(e) => setPhoto(e.target.value)}
                value={photo}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
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
            <div className="mt-2">
              <input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="description"
              className="block text-gray-800 font-semibold text-sm"
            >
              Contact
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="contact"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="description"
              className="block text-gray-800 font-semibold text-sm"
            >
              Interests
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="interests"
                onChange={(e) => setInterests(e.target.value)}
                value={interests}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="border-b-2 pb-3 border-neutral-950 py-5">
            <label
              htmlFor="description"
              className="block text-gray-800 font-semibold text-sm"
            >
              Street Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={isSubmitting}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
          <button
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
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
