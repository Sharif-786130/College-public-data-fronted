import Api from "./Axios";

export const getSubjects = async () => {
  const res = await Api.get(`/Subjects/getallsubjects?_=${Date.now()}`);
  return res.data;
};

// add subject
export const addSubjects = async (data) => {
  const res = await Api.post("/Subjects/postsubject", data);
  return res.data;
};

// update subject
export const updateSubjects = async (subjectId, data) => {
  try {
    const res = await Api.put(`/Subjects/updatesubject/${subjectId}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data || "Update subject failed");
  }
};

// delete subject
export const deleteSubjects = async (subjectId) => {
  const res = await Api.delete(`/Subjects/deletesubject/${subjectId}`);
  return res.data;
};