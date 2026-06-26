import api from "./api";

// Get All Courses
export const getAllCourses = (
    page = 0,
    size = 10,
    search = "",
    sortBy = "",
    sortOrder = "asc"
) => {
    return api.get(
        `/course/get_all?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`
    );
};

// Get Course By Id
export const getCourseById = (id) => {
    return api.get(`/course/get/${id}`);
};

// Save Course
export const saveCourse = (course) => {
    return api.post("/course/save", course);
};

// Update Course
export const updateCourse = (id, course) => {
    return api.put(`/course/update/${id}`, course);
};

// Delete Course
export const deleteCourse = (id) => {
    return api.delete(`/course/delete/${id}`);
};

export const getListOfCourseIdAndName = () =>{
    return api.get("/course/get_id_and_name")
}