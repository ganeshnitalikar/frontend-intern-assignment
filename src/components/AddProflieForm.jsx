import React, { useState } from "react";
import { addProfileToFirebase } from "../services/FirebaseServices";
import { nanoid } from "nanoid";
import InputField from "./InputField"; // New component

const AddProflieForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.photo) newErrors.photo = "Photo link is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.contact) newErrors.contact = "Contact is required.";
    if (!formData.interests) newErrors.interests = "Interests are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newProfile = {
      id: nanoid(),
      ...formData,
      photo: `https://${formData.photo}`,
    };

    try {
      await addProfileToFirebase(newProfile);
      alert("Profile added successfully!");
      setFormData({
        name: "",
        photo: "",
        description: "",
        address: "",
        contact: "",
        interests: "",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to add profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center p-5 w-full flex-col">
      <h1 className="text-3xl">Add New Profile</h1>
      <div className="w-full h-auto bg-slate-300 border-2 border-neutral-900 p-5">
        <form
          onSubmit={handleAdd}
          className="flex justify-center items-center flex-col h-auto"
        >
          {[
            "name",
            "photo",
            "description",
            "address",
            "contact",
            "interests",
          ].map((field) => (
            <InputField
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              error={errors[field]}
              isSubmitting={isSubmitting}
            />
          ))}
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
