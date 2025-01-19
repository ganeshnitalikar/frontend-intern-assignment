import React from "react";

const InputField = ({ name, value, onChange, error, isSubmitting }) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="border-b-2 pb-3 border-neutral-950 py-5">
      <label
        htmlFor={name}
        className="block text-gray-800 font-semibold text-sm"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          disabled={isSubmitting}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
