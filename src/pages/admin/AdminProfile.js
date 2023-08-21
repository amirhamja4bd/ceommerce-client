import React, { useState } from 'react';

const Intro = () => {
  const [images, setImages] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <div className="w-50">
      <div className="mt-2">
        <h2>Create Intro</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          {images && (
            <div className="form-group">
              <div className="text-start">
                <img
                  src={URL.createObjectURL(images)}
                  alt="Product Photo"
                  className="img img-responsive rounded"
                  height="150px"
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="image" className="mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control form-control-sm text-white"
              accept="image/*"
              onChange={(e) => setImages(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="welcomeText" className="form-label">
            Welcome Text
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="welcomeText"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control form-control-sm"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="secondary-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Intro;
