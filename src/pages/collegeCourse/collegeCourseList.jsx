import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCollegeCourses, deleteCollegeCourse } from "../../services/collegeCourseService";
import "./collegeCourseList.css";
import { getListOfIdAndName } from "../../services/collegeService";
import { getListOfCourseIdAndName } from "../../services/courseService";
import Swal from "sweetalert2";

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
        const result = await Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm ",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteCollegeCourse(id);

            await Swal.fire({
                title: "Deleted!",
                text: "College Course has been deleted successfully.",
                icon: "success",
            });

            loadCollegeCourses();
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Unable to delete College Course.",
                icon: "error",
            });
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

            {/* Search */}

            <div className="college-search mb-3 d-flex ">
                <input
                    type="text"
                    className="form-control me-2"
                    style={{ width: "auto" }}
                    placeholder="Search College-Course"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                        setSearch(searchText);
                        setPage(0);
                    }}
                >
                    Search
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setSearchText("");
                        setSearch("");
                        setPage(0);
                    }}
                >
                    Reset
                </button>


                <select
                    className="form-control"
                    style={{ marginLeft: "300px", width: "300px" }}
                    value={selectedCollegeId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCollegeId(value);
                        loadCollegeCourses(value, selectedCourseId, 0); // reset page if needed
                        setPage(0);
                    }}
                >
                    <option value="">Select College</option>
                    {college.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-control"
                    style={{ marginLeft: "200px", width: "300px" }}
                    value={selectedCourseId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCourseId(value);
                        loadCollegeCourses(selectedCollegeId, value, 0);
                        setPage(0);
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