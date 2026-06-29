import "./AddCollegeCourse.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveCollegeCourse } from "../../services/collegeCourseService";
import { getListOfIdAndName } from "../../services/collegeService";
import { getListOfCourseIdAndName } from "../../services/courseService";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";


function AddCollegeCourse() {
    const navigate = useNavigate();
    const [college, setColleges] = useState([]);
    const [course, setCourses] = useState([]);
    const [collegeId, setCollegeId] = useState("");
    const [courseId, setCourseId] = useState("");
    const deadlineRef = useRef(null);

    useEffect(() => {
        fetchColleges();
        fetchCourses();

        flatpickr(deadlineRef.current, {
            dateFormat: "Y-m-d",
            allowInput: true,
            onChange: (selectedDates, dateStr) => {
                setFormData(prev => ({
                    ...prev,
                    startDate: dateStr
                }));
            }
        });
    }, []);

    const fetchColleges = async () => {
        try {
            const res = await getListOfIdAndName();
            setColleges(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await getListOfCourseIdAndName();
            setCourses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        collegeId: "",
        courseId: "",
        fees: "",
        totalSeats: "",
        availableSeats: "",
        startDate: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await saveCollegeCourse(
                formData.collegeId,
                formData.courseId,
                {
                    fees: formData.fees,
                    totalSeats: formData.totalSeats,
                    availableSeats: formData.availableSeats,
                    startDate: formData.startDate,
                }
            );

            console.log(response.data);

            await Swal.fire({
                title: "Success!",
                text: "College course saved successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

            navigate("/college-courses");
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Failed to save college course.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="add-college-page">
            <div className="add-college-card">
                <button
                    className="back-btn"
                    onClick={() => navigate("/college-courses")}
                >
                    ← Back
                </button>

                <h2>Add College Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <select
                            name="college"
                            value={formData.collegeId}
                            onChange={(e) =>
                                setFormData({ ...formData, collegeId: e.target.value })
                            }
                            required
                        >
                            <option value="">Select College</option>

                            {college.map((college) => (
                                <option key={college.id} value={college.id}>
                                    {college.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row">
                        <select
                            name="course"
                            value={formData.courseId}
                            onChange={(e) =>
                                setFormData({ ...formData, courseId: e.target.value })
                            }
                            required
                        >
                            <option value="">Select Course</option>

                            {course.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row">
                        <input
                            type="text"
                            name="fees"
                            placeholder="Fees"
                            value={formData.fees}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <input
                            type="text"
                            name="totalSeats"
                            placeholder="Total seats"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="availableSeats"
                            placeholder="Available Seats"
                            value={formData.availableSeats}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <input
                            ref={deadlineRef}
                            name="startDate"
                            className="form-control"
                            placeholder="Select Start Date"
                        />
                    </div>

                    <button type="submit">
                        Save College Course
                    </button>
                </form>
            </div>
        </div>
    );

}

export default AddCollegeCourse;