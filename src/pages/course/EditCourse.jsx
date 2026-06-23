import "./AddCourse.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getCourseById,
    updateCourse
} from "../../services/courseService";

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

            alert("Course updated successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to update course.");

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