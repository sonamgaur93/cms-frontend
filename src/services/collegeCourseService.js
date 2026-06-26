import api from "./api";

export const getAllCollegeCourses = (
    collegeId,
    courseId,
    page = 0,
    size = 10,
    search = "",
    sortBy = "",
    sortOrder = ""
) => {

    let url = `/college_course/get_all?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`;

    if (collegeId !== null && collegeId !== undefined && collegeId !== "") {
        url += `&collegeId=${collegeId}`;
    }

    if (courseId !== null && courseId !== undefined && courseId !== "") {
        url += `&courseId=${courseId}`;
    }

    return api.get(url);
};


// Get College course By Id
export const getCollegeCourseById = (id, collegeId, courseId) => {
    return api.get(`/college_course/get/${id}`, {
        params: {
            collegeId,
            courseId,
        },
    });
};

// Save College course
export const saveCollegeCourse = (collegeId, courseId, collegeCourse) => {
    return api.post(
        "/college_course/save",
        collegeCourse, // request body
        {
            params: {
                collegeId,
                courseId,
            },
        }
    );
};

// Update College course
export const updateCollegeCourse = (id, collegeCourse, collegeId, courseId) => {
    return api.put(`/college_course/update/${id}`, collegeCourse, {
        params: {
            collegeId,
            courseId
        }
    });
};

// Delete College course
export const deleteCollegeCourse = (id, collegeId, courseId) => {
    return api.delete(`/college_course/delete/${id}`, {
        params: {
            collegeId,
            courseId,
        },
    });
};