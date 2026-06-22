import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllCourses,
    deleteCourse
} from "../../services/courseService";

import "./CourseList.css";

function CourseList() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourses();
    }, [page, search]);

    const loadCourses = async () => {

        try {

            setLoading(true);

            const response = await getAllCourses(page, size, search);

            console.log(response.data);

            if (Array.isArray(response.data)) {
                setCourses(response.data);
            } else {
                setCourses([]);
            }

        } catch (error) {

            console.error(error);
            setCourses([]);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCourse(id);

            alert("Course deleted successfully.");

            loadCourses();

        } catch (error) {

            console.error(error);

            alert("Unable to delete course.");

        }

    };

    return (

        <div className="course-page">

            <div className="course-header">

                <h2>Course List</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/courses/add")}
                >
                    + Add Course
                </button>

            </div>

            {/* Search */}

{/* Search */}

{/* Search */}

<div className="course-search mb-3 d-flex">

    <input
        type="text"
        className="form-control me-2"
        placeholder="Search Course"
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
            setSearch("");
            setSearchText("");
            setPage(0);
        }}
    >
        Reset
    </button>

</div>

            <table className="table table-bordered table-hover">

                <thead className="table-success">

                    <tr>

                        <th>Sr No</th>

                        <th>Course Name</th>

                        <th>Duration</th>

                        <th width="250">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : courses.length > 0 ? (

                            courses.map((course, index) => (

                                <tr key={course.id || index}>

                                    <td>{index + 1}</td>

                                    <td>{course.courseName}</td>

                                    <td>{course.duration}</td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => {

                                                if (course.id) {

                                                    navigate(
                                                        `/courses/view/${course.id}`
                                                    );

                                                } else {

                                                    alert(
                                                        "Backend is not returning id."
                                                    );

                                                }

                                            }}
                                        >
                                            Detail
                                        </button>

                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {

                                                if (course.id) {

                                                    navigate(
                                                        `/courses/edit/${course.id}`
                                                    );

                                                } else {

                                                    alert(
                                                        "Backend is not returning id."
                                                    );

                                                }

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {

                                                if (course.id) {

                                                    handleDelete(course.id);

                                                } else {

                                                    alert(
                                                        "Backend is not returning id."
                                                    );

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

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >
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

export default CourseList;