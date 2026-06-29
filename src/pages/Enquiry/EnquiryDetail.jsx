import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEnquiryById } from "../../services/enquiryService";

function EnquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [enquiry, setEnquiry] = useState({});

    useEffect(() => {
        loadEnquiry();
    }, []);

    const loadEnquiry = async () => {
        try {
            const response = await getEnquiryById(id);
            setEnquiry(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load enquiry details.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-success text-white">
                    <h3>Enquiry Details</h3>
                </div>

                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Student Name</th>
                                <td>{enquiry.studentName}</td>
                            </tr>

                            <tr>
                                <th>Mobile No</th>
                                <td>{enquiry.mobile}</td>
                            </tr>
                            <tr>
                                <th>Course Name</th>
                                <td>{enquiry.courseName}</td>
                            </tr>

                            <tr>
                                <th>College Name</th>
                                <td>{enquiry.collegeName}</td>
                            </tr>

                            <tr>
                                <th>Detail</th>
                                <td>{enquiry.message}</td>
                            </tr>

                        </tbody>
                    </table>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/enquiries")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EnquiryDetail;