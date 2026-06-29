import "./AddCourse.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveCourse } from "../../services/courseService";
import Swal from "sweetalert2";

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

            await Swal.fire({
                title: "Success!",
                text: "Course saved successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/courses");

            setFormData({
                courseName: "",
                duration: "",
            });

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Failed to save course.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
            });
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