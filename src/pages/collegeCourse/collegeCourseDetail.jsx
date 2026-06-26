import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCollegeCourseById } from "../../services/collegeCourseService";

function CollegeCourseDetail() {
    const { id } = useParams();
    const { collegeId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [collegeCourse, setCollegeCourse] = useState({});

    useEffect(() => {
        loadCollegeCourse();
    }, []);

    const loadCollegeCourse = async () => {
        try {
            const response = await getCollegeCourseById(id);
            setCollegeCourse(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load college course details.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-success text-white">
                    <h3>College Course Details</h3>
                </div>

                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>College Name</th>
                                <td>{collegeCourse.collegeName}</td>
                            </tr>

                            <tr>
                                <th>Course Name</th>
                                <td>{collegeCourse.courseName}</td>
                            </tr>

                            <tr>
                                <th>Course Description</th>
                                <td>{collegeCourse.courseDescription}</td>
                            </tr>

                            <tr>
                                <th>Course Duration</th>
                                <td>{collegeCourse.courseDuration}</td>
                            </tr>

                            <tr>
                                <th>Fees</th>
                                <td>{collegeCourse.fees}</td>
                            </tr>

                            <tr>
                                <th>Total seats</th>
                                <td>{collegeCourse.totalSeats}</td>
                            </tr>

                            <tr>
                                <th>Available seats</th>
                                <td>{collegeCourse.availableSeats}</td>
                            </tr>

                            <tr>
                                <th>Start Date</th>
                                <td>{collegeCourse.startDate}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/college-courses")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CollegeCourseDetail;