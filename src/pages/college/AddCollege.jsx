import "./AddCollege.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveCollege } from "../../services/collegeService";
import Swal from "sweetalert2";

function AddCollege() {

    const navigate = useNavigate();

    // State -> City Mapping
    const stateCityMap = {
        "Madhya Pradesh": [
            "Bhopal",
            "Indore",
            "Jabalpur",
            "Gwalior",
            "Ujjain"
        ],
        Maharashtra: [
            "Mumbai",
            "Pune",
            "Nagpur",
            "Nashik"
        ],
        Rajasthan: [
            "Jaipur",
            "Jodhpur",
            "Kota"
        ],
        Gujarat: [
            "Ahmedabad",
            "Surat",
            "Vadodara"
        ],
        Delhi: [
            "New Delhi"
        ]
    };

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

        const { name, value } = e.target;

        if (name === "state") {

            setFormData({
                ...formData,
                state: value,
                city: "" // reset city when state changes
            });

        } else {

            setFormData({
                ...formData,
                [name]: value
            });

        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await saveCollege(formData);
            console.log(response.data);

            await Swal.fire({
                title: "Success!",
                text: "College saved successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/colleges");

            setFormData({
                collegeName: "",
                code: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                mobile: "",
                email: "",
            });

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Failed to save college.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
            });
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
                            type="text"
                            name="collegeName"
                            placeholder="College Name"
                            value={formData.collegeName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        {/* State Dropdown */}

                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select State</option>

                            {Object.keys(stateCityMap).map((state) => (

                                <option
                                    key={state}
                                    value={state}
                                >
                                    {state}
                                </option>

                            ))}

                        </select>

                        {/* City Dropdown */}

                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            disabled={!formData.state}
                        >
                            <option value="">Select City</option>

                            {formData.state &&
                                stateCityMap[formData.state].map((city) => (

                                    <option
                                        key={city}
                                        value={city}
                                    >
                                        {city}
                                    </option>

                                ))}

                        </select>

                    </div>

                    <div className="row">

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
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