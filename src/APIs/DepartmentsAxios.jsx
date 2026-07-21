import { data } from "react-router-dom";
import Api from "./Axios"

//GetAlldata
export const getDepartments = async () => {
    const res = await Api.get("/departments/Getalldepartments")
    return res.data;
}

export const postDepartment = async (data) => {
    const res = await Api.post("/departments/Insert-department-details", data)
    return res.data;
}

export const updateDepartment = async (departmentId, data) => {
    try {
        const res = await Api.put(`/departments/Updatedepartment/${departmentId}`,data)
        return res.data;
    } catch (error){
        throw new Error(error.response?.data || "update department failed")
    }
  
}

export const deleteDepartment =async(departmentId) =>{
    const res = await Api.delete(`/departments/DeleteDepartment/${departmentId}`)
    return res.data;
}