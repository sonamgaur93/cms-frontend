import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllColleges,
    deleteCollege
} from "../../services/collegeService";

import "./CollegeList.css";

function CollegeList() {

    const navigate = useNavigate();

    const [colleges, setColleges] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    // Actual search sent to API
    const [search, setSearch] = useState("");

    // Text typed by user
    const [searchText, setSearchText] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadColleges();
    }, [page, search]);

    const loadColleges = async () => {

        try {

            setLoading(true);

            const response = await getAllColleges(page, size, search);

            console.log("Full Response :", response);
            console.log("Response Data :", response.data);

            if (Array.isArray(response.data)) {
                setColleges(response.data);
            } else {
                setColleges([]);
            }

        } catch (error) {

            console.error("College API Error :", error);

            setColleges([]);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this college?"
    );

    if (!confirmDelete) return;

    try {

        await deleteCollege(id);

        alert("College deleted successfully.");

        loadColleges();

    } catch (error) {

        console.error(error);

        alert("Unable to delete college.");

    }

};

    return (

        <div className="college-page">

            <div className="college-header">

                <h2>College List</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/colleges/add")}
                >
                    + Add College
                </button>

            </div>

            {/* Search */}

            <div className="college-search mb-3 d-flex">

                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search College"
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

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-success">

                    <tr>

                        <th>Sr No</th>

                        <th>College Name</th>

                        <th>Address</th>

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

                        ) : colleges.length > 0 ? (

                            colleges.map((college, index) => (

                                <tr key={index}>

                                    <td>{index + 1}</td>

                                    <td>{college.collegeName}</td>

                                    <td>{college.address}</td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => {

                                                if (college.id) {
                                                    navigate(`/colleges/view/${college.id}`);
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

                                                if (college.id) {
                                                    navigate(`/colleges/edit/${college.id}`);
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

        if (college.id) {

            handleDelete(college.id);

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

export default CollegeList;