import { useEffect, useState } from "react";
import { getSubjects } from "../APIs/SubjectsAxios";
import { addTeacher, updateTeacher } from "../APIs/TeachersAxios";
import { getDepartments } from "../APIs/DepartmentsAxios";

export default function TeacherModel({ open, closing, editData, refresh }) {
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [departments, setDepartments] = useState([]);

 useEffect(() => {
    if (open) {
        getSubjects().then(setSubjects);
        getDepartments().then(setDepartments);
    }
}, [open]);

    useEffect(() => {
        if (editData) {
            setName(editData.teacherName);
            setSalary(editData.teacherSalary);
            setSubjectId(editData.subjectId || "");
            setDepartmentId(editData.departmentId || "");
        } else {
            setName("");
            setSalary("");
            setSubjectId("");
            setDepartmentId("");
        }
    }, [editData]);

    if (!open) return null;

const handleSubmit = async () => {
    const payload = {
        teacherName: name,
        teacherSalary: Number(salary),
        subjectId: subjectId ? Number(subjectId) : null,
        departmentId: departmentId ? Number(departmentId): null,
    };

    try {
        if (editData) {
            await updateTeacher(editData.teacherId, payload);
        } else {
            await addTeacher(payload);
        }
        refresh();
        closing();
    } catch (error) {
        alert(error.response?.data?.detail || "Something went wrong while saving the teacher.");
    }
};

    return (
        <div className="fixed inset-0 bg-[#1B3A2F]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#FAF7F0] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1B3A2F]/10 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[#1B3A2F] to-[#E8B923]" />

                <div className="p-6 pb-4">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1B3A2F]/50 mb-1">
                        Faculty Record
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#1B3A2F]">
                        {editData ? "Update Teacher" : "Add Teacher"}
                    </h2>
                </div>

                <div className="px-6 pb-6 space-y-4">
                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Teacher Name
                        </label>
                        <input
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm text-[#1B3A2F] placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            placeholder="e.g. Ravi Kumar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Salary
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm font-mono text-[#1B3A2F] placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            placeholder="e.g. 30000"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Subject
                        </label>
                        <select
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm text-[#1B3A2F] focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((s) => (
                                <option key={s.subjectId} value={s.subjectId}>
                                    {s.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            department
                        </label>
                        <select
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm text-[#1B3A2F] focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            {subjects.map((d) => (
                                <option key={d.departmentId} value={d.departmentId}>
                                    {d.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#1B3A2F]/10 bg-[#1B3A2F]/[0.03]">
                    <button
                        onClick={closing}
                        className="px-4 py-2 rounded-lg border border-[#1B3A2F]/20 text-[#1B3A2F]/70 text-sm font-medium hover:bg-[#1B3A2F]/5 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-[#1B3A2F] text-[#FAF7F0] text-sm font-semibold shadow-sm hover:bg-[#14291F] transition"
                    >
                        {editData ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}