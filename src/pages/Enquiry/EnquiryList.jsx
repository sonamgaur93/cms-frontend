import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEnquiry, deleteEnquiry } from "../../services/enquiryService";
import "./EnquiryList.css";

function EnquiryList() {
    const navigate = useNavigate();
    const [enquiry, setEnquiry] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadEnquiry();
    }, [page, search]);

    const loadEnquiry = async (collegeCourseId) => {
        try {
            setLoading(true);
            const response = await getAllEnquiry(collegeCourseId, page, size, search);
            console.log("Full Response :", response);
            console.log("Response Data :", response.data);

            if (Array.isArray(response.data)) {
                setEnquiry(response.data);
            } else {
                setEnquiry([]);
            }
        } catch (error) {
            console.error("Enquiry API Error :", error);
            setEnquiry([]);
        } finally {
            setLoading(false);
        }

    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this enquiry?"
        );

        if (!confirmDelete) return;
        try {
            await deleteCollege(id);
            alert("Enquiry deleted successfully.");
            loadEnquiry();

        } catch (error) {
            console.error(error);
            alert("Unable to delete enquiry.");
        }

    };

    return (
        <div className="college-page">
            <div className="college-header">
                <h2>Enquiry List</h2>
                {/* <button
                    className="btn btn-success"
                    onClick={() => navigate("/enquiries/add")}
                >
                    + Add Enquiry
                </button> */}
            </div>

            {/* Search */}

            <div className="college-search mb-3 d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search Enquiry"
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
                        <th>Student Name</th>
                        <th>College Name</th>
                        <th>Course Name</th>
                        <th>Detail</th>
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
                        ) : enquiry.length > 0 ? (

                            enquiry.map((enquiry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{enquiry.studentName}</td>
                                    <td>{enquiry.collegeName}</td>
                                    <td>{enquiry.courseName}</td>
                                    <td>{enquiry.message}</td>
                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => {
                                                if (enquiry.id) {
                                                    navigate(`/enquiries/view/${enquiry.id}`);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }
                                            }}
                                        >
                                            Detail
                                        </button>

                                        {/* <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                if (enquiry.id) {
                                                    navigate(`/colleges/edit/${enquiry.id}`);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }
                                            }}
                                        >
                                            Edit
                                        </button> */}

                                        {/* <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                if (enquiry.id) {
                                                    handleDelete(enquiry.id);
                                                } else {
                                                    alert("Backend is not returning id.");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button> */}
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

export default EnquiryList;