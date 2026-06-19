import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
    getAllColleges
    // deleteCollege
} from "../../services/collegeService";

import "./CollegeList.css";

function CollegeList() {

    const navigate = useNavigate();

    const [colleges, setColleges] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [search, setSearch] = useState("");
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
        console.log("Is Array :", Array.isArray(response.data));

        if (Array.isArray(response.data)) {
            setColleges(response.data);
        } else {
            setColleges([]);
        }

    } catch (error) {

        console.error("College API Error :", error);

        if (error.response) {
            console.log("Status :", error.response.status);
            console.log("Response :", error.response.data);
        }

        setColleges([]);

    } finally {

        setLoading(false);

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

                <div className="college-search mb-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search College"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

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
                                        alert("Delete API will be called here.");
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