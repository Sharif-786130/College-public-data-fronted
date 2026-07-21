import Api from "./Axios";


export const getStudents = async() => {
    const res = await Api.get("/students/Getallstudents");
    return res.data;
}

export const saveStudents = async(data) => {
    const res=await Api.post("/students/Insert-student-details",data);
    return res.data;

}

export const updateStudents = async(studentId,data) => {
    try{
        const res = await Api.put(`/students/updatestudent/${studentId}`,data);
        return res.data;
    } catch(error){
        throw new Error(error.response?.data || "update Students failed");
    }
}

export const deleteStudent = async(studentId) => {
    const res = await Api.delete(`/students/deletestudent/${studentId}`);
    return res.data;
}