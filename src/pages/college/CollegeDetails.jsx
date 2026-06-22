import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCollegeById } from "../../services/collegeService";

function CollegeDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [college, setCollege] = useState({});

    useEffect(() => {
        loadCollege();
    }, []);

    const loadCollege = async () => {

        try {

            const response = await getCollegeById(id);

            setCollege(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load college details.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>College Details</h3>

                </div>

                <div className="card-body">

                    <table className="table">

                        <tbody>

                            <tr>
                                <th>College Name</th>
                                <td>{college.collegeName}</td>
                            </tr>

                            <tr>
                                <th>Code</th>
                                <td>{college.code}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{college.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{college.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{college.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{college.pincode}</td>
                            </tr>

                            <tr>
                                <th>Mobile</th>
                                <td>{college.mobile}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{college.email}</td>
                            </tr>

                        </tbody>

                    </table>

                    <button
                       className="btn btn-primary"
                        onClick={() => navigate("/colleges")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CollegeDetail;