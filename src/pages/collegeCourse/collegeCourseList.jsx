import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCollegeCourses, deleteCollegeCourse } from "../../services/collegeCourseService";
import "./collegeCourseList.css";
import { getListOfIdAndName } from "../../services/collegeService";
import { getListOfCourseIdAndName } from "../../services/courseService";

function CollegeCourseList() {
    const navigate = useNavigate();
    const [collegeCourse, setCollegeCourse] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [college, setColleges] = useState([]);
    const [course, setCourses] = useState([]);
    const [selectedCollegeId, setSelectedCollegeId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");

    useEffect(() => {
        fetchColleges();
        fetchCourses();
    }, []);

    useEffect(() => {
        loadCollegeCourses(selectedCollegeId, selectedCourseId);
    }, [page, search]);


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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this collegeCourse?"
        );

        if (!confirmDelete) return;
        try {
            await deleteCollegeCourse(id);
            alert("College Course deleted successfully.");
            loadCollegeCourses();
        } catch (error) {
            console.error(error);
            alert("Unable to delete college Course");
        }
    };

    const loadCollegeCourses = async (collegeId, courseId) => {
        try {
            setLoading(true);
            const response = await getAllCollegeCourses(collegeId, courseId, page, size, search);
            console.log("Full Response :", response);
            console.log("Response Data :", response.data);
            if (Array.isArray(response.data)) {
                setCollegeCourse(response.data);
            } else {
                setCollegeCourse([]);
            }

        } catch (error) {
            console.error("College API Error :", error);
            setCollegeCourse([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="college-page">
            <div className="college-header">
                <h2>College Course List</h2>
                <button
                    className="btn btn-success"
                    onClick={() => navigate("/college-courses/add")}
                >
                    + Add College Course
                </button>

            </div>



 {/* Search Section */}

<div className="search-row">

    {/* Search */}
    <div className="search-item">
        <input
            type="text"
            className="form-control"
            placeholder="Search College-Course"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    </div>

    {/* Search Button */}
    <button
        className="btn btn-primary search-btn"
        onClick={() => {
            setSearch(searchText);
            setPage(0);
        }}
    >
        Search
    </button>

    {/* Reset Button */}
    <button
        className="btn btn-secondary search-btn"
        onClick={() => {
            setSearch("");
            setSearchText("");
            setSelectedCollegeId("");
            setSelectedCourseId("");
            setPage(0);
            loadCollegeCourses("", "");
        }}
    >
        Reset
    </button>

    {/* College */}
    <div className="search-item">
        <select
            className="form-select"
            value={selectedCollegeId}
            onChange={(e) => {
                const value = e.target.value;
                setSelectedCollegeId(value);
                setPage(0);
                loadCollegeCourses(value, selectedCourseId);
            }}
        >
            <option value="">Select College</option>

            {college.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>
    </div>

    {/* Course */}
    <div className="search-item">
        <select
            className="form-select"
            value={selectedCourseId}
            onChange={(e) => {
                const value = e.target.value;
                setSelectedCourseId(value);
                setPage(0);
                loadCollegeCourses(selectedCollegeId, value);
            }}
        >
            <option value="">Select Course</option>

            {course.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>
    </div>

</div>

            <table className="table table-bordered table-hover">
                <thead className="table-success">
                    <tr>
                        <th>Sr No</th>
                        <th>College</th>
                        <th>Course</th>
                        <th>Fee</th>
                        <th>Seats(avail/total)</th>
                        <th>StartDate</th>
                        <th width="250">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : collegeCourse.length > 0 ? (
                            collegeCourse.map((collegeCourses, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{collegeCourses.collegeName}</td>
                                    <td>{collegeCourses.courseName}</td>
                                    <td>{collegeCourses.fees}</td>
                                    <td>
                                        {collegeCourses.availableSeats}/{collegeCourses.totalSeats}
                                    </td>
                                    <td>{collegeCourses.startDate}</td>

                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => {
                                                if (collegeCourses.id) {
                                                    navigate(`/college-courses/view/${collegeCourses.id}`);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }

                                            }}
                                        >
                                            Detail
                                        </button>

                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                if (collegeCourses.id) {
                                                    navigate(`/college-courses/edit/${collegeCourses.id}`);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                if (collegeCourses.id) {
                                                    handleDelete(collegeCourses.id);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No Records Found
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table>

            <div className="pagination-area d-flex justify-content-between">
                <button
                    className="btn btn-secondary"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span className="align-self-center">
                    Page {page + 1}
                </span>

                <button
                    className="btn btn-secondary"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );

}

export default CollegeCourseList;