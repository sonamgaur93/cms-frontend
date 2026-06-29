import api from "./api";

// get all enquiry
export const getAllEnquiry = (
    collegeCourseId,
    page = 0,
    size = 10,
    search = "",
    sortBy = "",
    sortOrder = ""
) => {
    let url = `/enquiry/get_all?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`

    if (collegeCourseId !== null && collegeCourseId !== undefined && collegeCourseId !== "") {
        url += `&collegeCourseId=${collegeCourseId}`;
    }

    return api.get(url);

};

// Get enquiry by id
export const getEnquiryById = (id, collegeCourseId) => {
    return api.get(`/enquiry/get/${id}`, {
        params: {
            collegeCourseId
        },
    });
};

// save enquiry 
export const saveEnquiry = (enquiry, collegeCourseId) => {
    return api.post("/enquiry/save",
        enquiry,
        {
            params: {
                collegeCourseId
            },
        }
    );
};

// update enquiry 
export const updateEnquiry = (id, enquiry, collegeCourseId) => {
    return api.put(`/enquiry/update/${id}`, enquiry, {
        params: {
            collegeCourseId
        },
    }
    );
};

// Delete enquiry 
export const deleteEnquiry = (id, collegeCourseId) => {
    return api.delete(`/enquiry/delete/${id}`, {
        params: {
            collegeCourseId
        },
    });
};