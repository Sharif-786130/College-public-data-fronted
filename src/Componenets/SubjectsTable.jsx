import { deleteSubjects } from "../APIs/SubjectsAxios";

export default function SubjectTable({ data, editing, refresh }) {
    return (
        <div className="rounded-xl overflow-hidden border border-[#1B3A2F]/10 shadow-sm mt-6">
            <table className="w-full">
                <thead className="bg-[#1B3A2F]">
                    <tr>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Subject</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">SubjectCode</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Department</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-8 text-center text-[#1B3A2F]/40 text-sm italic">
                                No subjects yet — add one to get started.
                            </td>
                        </tr>
                    )}

                    {data.map((s) => (
                        <tr
                            key={s.subjectId}
                            className="border-t border-[#1B3A2F]/10 even:bg-[#F4EAC8]/20 hover:bg-[#E8B923]/10 transition-colors"
                        >
                            <td className="p-3 text-[#1B3A2F] font-medium text-center">{s.subjectName}</td>
                            <td className="p-3 text-center">
                                <span className="font-mono text-xs bg-[#1B3A2F]/5 text-[#1B3A2F] px-2 py-1 rounded text-center">
                                    {s.subjectCode}
                                </span>
                            </td>
                            <td className="p-3 text-[#1B3A2F] font-medium text-center">{s.departmentName}</td>

                            <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => editing(s)}
                                        className="px-4 py-1.5 bg-[#E8B923] text-[#1B3A2F] text-sm font-medium rounded-lg hover:bg-[#d6a913] shadow-sm transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            try {
                                                await deleteSubjects(s.subjectId);
                                                refresh();
                                            } catch (error) {
                                                alert(
                                                    error.response?.data?.message ||
                                                    "You cannot delete the Subject without permission of Teacher"
                                                );
                                            }
                                        }}
                                        className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 shadow-sm transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}