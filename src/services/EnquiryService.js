import api from "./api";

// get all enquiry
export const getAllEnquiry = (
    collegeCourseId = collegeCourseId,
    page = 0,
    size = 10,
    search = "",
    sortBy = "",
    sortOrder = ""
) => {
    return api.get(
        `/enquiry/get_all?collegeCourseId=${collegeCourseId}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`
    );
};

// Get enquiry by id
export const getEnquiryById = (id, collegeCourseId) => {
    return api.get(`/enquiry/get/${id}?collegeCourseId=${collegeCourseId}`);
};

// save enquiry 
export const saveEnquiry = (enquiry, collegeCourseId) => {
    return api.post(`/enquiry/save?collegeCourseId=${collegeCourseId}`, enquiry);
};

// update enquiry 
export const updateEnquiry = (id, enquiry, collegeCourseId) => {
    return api.put(`/enquiry/update/${id}?collegeCourseId=${collegeCourseId}`, enquiry);
};

// Delete enquiry 
export const deleteEnquiry = (id, collegeCourseId) => {
    return api.delete(`/enquiry/delete/${id}?collegeCourseId=${collegeCourseId}`);
};