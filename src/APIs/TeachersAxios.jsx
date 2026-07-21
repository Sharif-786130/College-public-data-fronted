import Api from "./Axios";


export const getTeachers = async () => {
  const res = await Api.get("/Teacher/getallteachers");
  return res.data;
};

// add teacher
export const addTeacher = async (data) => {
  const res = await Api.post("/Teacher/postteacher", data);
  return res.data;
};

// update teacher
export const updateTeacher = async (teacherId, data) => {
  try {
    const res = await Api.put(
      `/Teacher/updateteacher/${teacherId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data || "Update teacher failed");
  }
};


// delete teacher
export const deleteTeacher = async (teacherId) => {
  await Api.delete(`/Teacher/deleteteacher/${teacherId}`);
};