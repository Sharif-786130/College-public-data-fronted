import { useEffect, useState } from "react";
import { addSubjects, updateSubjects } from "../APIs/SubjectsAxios";
import { getDepartments } from "../APIs/DepartmentsAxios";

export default function SubjectModel({ open, editData, refresh, closing, }) {
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments().then(setDepartments);
    }, []);

    useEffect(() => {
        if (editData) {
            setSubjectName(editData.subjectName || "");
            setSubjectCode(editData.subjectCode || "");
            setDepartmentId(editData.departmentId || "");
        } else {
            setSubjectName("");
            setSubjectCode("");
            setDepartmentId("");
        }
    }, [editData]);

    if (!open) return null;

    const handleSubmit = async () => {
        const payload = {
            subjectName,
            subjectCode,
            departmentId: departmentId ? Number(departmentId) : null,
        };

        if (editData) {
            await updateSubjects(editData.subjectId, payload);
        } else {
            await addSubjects(payload);
        }

        refresh();
        closing();
    };

    return (
        <div className="fixed inset-0 bg-[#1B3A2F]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#FAF7F0] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1B3A2F]/10 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[#1B3A2F] to-[#E8B923]" />

                <div className="p-6 pb-4">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1B3A2F]/50 mb-1">
                        Subject Record
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#1B3A2F]">
                        {editData ? "Update Subject" : "Add Subject"}
                    </h2>
                </div>

                <div className="px-6 pb-6 space-y-4">
                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Subject Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm text-[#1B3A2F] placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            placeholder="e.g. Mathematics"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Subject Code
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm font-mono text-[#1B3A2F] placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            placeholder="e.g. MTH101"
                            value={subjectCode}
                            onChange={(e) => setSubjectCode(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#1B3A2F]/50 mb-1">
                            Department
                        </label>
                        <select
                            className="w-full rounded-lg border border-[#1B3A2F]/15 bg-white px-3 py-2 text-sm text-[#1B3A2F] focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            {departments.map((d) => (
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