import "./AddCollegeCourse";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCollegeCourseById, updateCollegeCourse } from "../../services/collegeCourseService";
import { getListOfIdAndName } from "../../services/collegeService";
import { getListOfCourseIdAndName } from "../../services/courseService";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";


function EditCollegeCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [college, setColleges] = useState([]);
    const [course, setCourses] = useState([]);
    const [collegeId, setCollegeId] = useState("");
    const [courseId, setCourseId] = useState("");
    const deadlineRef = useRef(null);

    const [formData, setFormData] = useState({
        collegeId: "",
        courseId: "",
        fees: "",
        totalSeats: "",
        availableSeats: "",
        // startDate: ""
    });

    useEffect(() => {
        const init = async () => {
            try {
                const [collegeRes, courseRes, response] = await Promise.all([
                    getListOfIdAndName(),
                    getListOfCourseIdAndName(),
                    getCollegeCourseById(id)
                ]);

                setColleges(collegeRes.data);
                setCourses(courseRes.data);

                const matchedCollege = collegeRes.data.find(
                    c => c.name === response.data.collegeName
                );

                const matchedCourse = courseRes.data.find(
                    c => c.name === response.data.courseName
                );

                setFormData({
                    collegeId: matchedCollege?.id?.toString() || "",
                    courseId: matchedCourse?.id?.toString() || "",
                    fees: response.data.fees,
                    totalSeats: response.data.totalSeats,
                    availableSeats: response.data.availableSeats,
                    startDate: response.data.startDate || ""
                });

            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, [id]);

    useEffect(() => {
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

    const loadCollegeCourse = async () => {
        try {
            const response = await getCollegeCourseById(id);

            const matchedCollege = college.find(
                c => c.name === response.data.collegeName
            );

            const matchedCourse = course.find(
                c => c.name === response.data.courseName
            );

            setFormData({
                collegeId: matchedCollege ? matchedCollege.id : "",
                courseId: matchedCourse ? matchedCourse.id : "",
                fees: response.data.fees,
                totalSeats: response.data.totalSeats,
                availableSeats: response.data.availableSeats,
                startDate: response.data.startDate
            });

            console.log("formData", formData);

        } catch (error) {
            console.error(error);
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
            const { collegeId, courseId, ...collegeCourse } = formData;

            await updateCollegeCourse(id, collegeCourse, collegeId, courseId);

            await Swal.fire({
                title: "Success!",
                text: "College course updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/college-courses");

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Update Failed!",
                text: "Unable to update college course.",
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
                    onClick={() => navigate("/college-courses")}
                >
                    ← Back
                </button>

                <h2>Edit College Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <select
                            name="collegeId"
                            value={formData.collegeId}
                            onChange={handleChange}
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
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
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
                            name="fees"
                            value={formData.fees}
                            placeholder="Fees"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="totalSeats"
                            value={formData.totalSeats}
                            placeholder="Total seats"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">
                        <input
                            name="availableSeats"
                            value={formData.availableSeats}
                            placeholder="Available seats"
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">
                        <input
                            name="startDate"
                            ref={deadlineRef}
                            value={formData.startDate}
                            placeholder="Start Date"
                            // onChange={handleChange}
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

export default EditCollegeCourse;