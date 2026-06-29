import "./AddCollege.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
    getCollegeById,
    updateCollege
} from "../../services/collegeService";

function EditCollege() {

    const { id } = useParams();
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

    useEffect(() => {
        loadCollege();
    }, []);

    const loadCollege = async () => {

        try {

            const response = await getCollegeById(id);

            setFormData({
                collegeName: response.data.collegeName,
                code: response.data.code,
                address: response.data.address,
                city: response.data.city,
                state: response.data.state,
                pincode: response.data.pincode,
                mobile: response.data.mobile,
                email: response.data.email
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load college.");

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCollege(id, formData);

            await Swal.fire({
                title: "Success!",
                text: "College updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/colleges");

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Update Failed!",
                text: "Unable to update college.",
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

                <h2>Edit College</h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <input
                            name="collegeName"
                            value={formData.collegeName}
                            placeholder="College Name"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="code"
                            value={formData.code}
                            placeholder="Code"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            name="address"
                            value={formData.address}
                            placeholder="Address"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            name="city"
                            value={formData.city}
                            placeholder="City"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="state"
                            value={formData.state}
                            placeholder="State"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            name="pincode"
                            value={formData.pincode}
                            placeholder="Pincode"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="mobile"
                            value={formData.mobile}
                            placeholder="Mobile"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type="submit">
                        Update College
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditCollege;