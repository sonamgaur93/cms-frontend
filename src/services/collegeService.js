import api from "./api";

// Get All Colleges
export const getAllColleges = (
    page = 0,
    size = 10,
    search = "",
    sortBy = "",
    sortOrder = ""
) => {

    return api.get(
        `/college/get_all?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`
    );

};

// Get College By Id
export const getCollegeById = (id) => {

    return api.get(`/college/get/${id}`);

};

// Save College
export const saveCollege = (college) => {

    return api.post("/college/save", college);

};

// Update College
export const updateCollege = (id, college) => {

    return api.put(`/college/update/${id}`, college);

};

// Delete College
export const deleteCollege = (id) => {

    return api.delete(`/college/delete/${id}`);

};