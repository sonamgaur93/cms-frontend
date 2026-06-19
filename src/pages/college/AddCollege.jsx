import "./AddCollege.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveCollege } from "../../services/collegeService";

function AddCollege() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collegeName: "",
    code: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await saveCollege(formData);

      console.log("Save Response:", response.data);

      alert("College saved successfully.");

      // Clear the form
      setFormData({
        collegeName: "",
        code: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
        email: ""
      });

    } catch (error) {
      console.error("Save Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }

      alert("Failed to save college.");
    }
  };

  return (
    <div className="add-college-page">
      <div className="add-college-card">

        <button
          className="back-btn"
          onClick={() => navigate("/colleges")}
        >
          ← Back
        </button>

        <h2>Add College</h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <input
              name="collegeName"
              value={formData.collegeName}
              placeholder="College Name"
              onChange={handleChange}
            />

            <input
              name="code"
              value={formData.code}
              placeholder="Code"
              onChange={handleChange}
            />

          </div>

          <div className="row">

            <input
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleChange}
            />

          </div>

          <div className="row">

            <input
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
            />

            <input
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
            />

          </div>

          <div className="row">

            <input
              name="pincode"
              value={formData.pincode}
              placeholder="Pincode"
              onChange={handleChange}
            />

            <input
              name="mobile"
              value={formData.mobile}
              placeholder="Mobile"
              onChange={handleChange}
            />

          </div>

          <div className="row">

            <input
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
            />

          </div>

          <button type="submit">
            Save College
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddCollege;