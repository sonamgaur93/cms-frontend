import "./AddCourse.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/courseService";
import Swal from "sweetalert2";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        courseName: "",
        duration: ""
    });

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {

        try {

            const response = await getCourseById(id);

            setFormData({
                courseName: response.data.courseName,
                duration: response.data.duration
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load course.");

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
            await updateCourse(id, formData);

            await Swal.fire({
                title: "Success!",
                text: "Course updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/courses")

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Update Failed!",
                text: "Unable to update course.",
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

                <h2>Edit Course</h2>

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

                        Update Course

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditCourse;