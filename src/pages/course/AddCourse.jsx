import "./AddCourse.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveCourse } from "../../services/courseService";

function AddCourse() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        courseName: "",
        duration: ""
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

            await saveCourse(formData);

            alert("Course saved successfully.");

            setFormData({
                courseName: "",
                duration: ""
            });

        } catch (error) {

            console.error(error);

            alert("Failed to save course.");

        }

    };

    return (

        <div className="add-course-page">

            <div className="add-course-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/courses")}
                >
                    ← Back
                </button>

                <h2>Add Course</h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <input
                            type="text"
                            name="courseName"
                            placeholder="Course Name"
                            value={formData.courseName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <input
                            type="text"
                            name="duration"
                            placeholder="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type="submit">
                        Save Course
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddCourse;