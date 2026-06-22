import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../../services/courseService";

function CourseDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({});

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {

        try {

            const response = await getCourseById(id);

            setCourse(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to load course.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Course Details</h3>

                </div>

                <div className="card-body">

                    <table className="table">

                        <tbody>

                            <tr>
                                <th>Course Name</th>
                                <td>{course.courseName}</td>
                            </tr>

                            <tr>
                                <th>Duration</th>
                                <td>{course.duration}</td>
                            </tr>

                        </tbody>

                    </table>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/courses")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CourseDetail;