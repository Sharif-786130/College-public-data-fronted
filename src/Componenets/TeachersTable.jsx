import { deleteTeacher } from "../APIs/TeachersAxios";

export default function TeacherTable({ data, editing, refresh }) {
    return (
        <div className="rounded-xl overflow-hidden border border-[#1B3A2F]/10 shadow-sm mt-6">
            <table className="w-full">
                <thead className="bg-[#1B3A2F]">
                    <tr>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Name</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Salary</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Subject</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Department</th>
                        <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-[#F4EAC8]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-8 text-center text-[#1B3A2F]/40 text-sm italic">
                                No teachers yet — add one to get started.
                            </td>
                        </tr>
                    )}

                    {data.map((t) => (
                        <tr
                            key={t.teacherId}
                            className="border-t border-[#1B3A2F]/10 even:bg-[#F4EAC8]/20 hover:bg-[#E8B923]/10 transition-colors"
                        >
                            <td className="p-3 text-[#1B3A2F] font-medium text-center">{t.teacherName}</td>
                            <td className="p-3 font-mono text-[#1B3A2F] text-center">
                                ₹{Number(t.teacherSalary).toLocaleString("en-IN")}
                            </td>
                            <td className="p-3 text-center">
                                {t.subjectName ? (
                                    <span className="font-mono text-xs bg-[#1B3A2F]/5 text-[#1B3A2F] px-2 py-1 rounded">
                                        {t.subjectName}
                                    </span>
                                ) : (
                                    <span className="text-xs text-[#1B3A2F]/30 italic">N/A</span>
                                )}
                            </td>
                              <td className="p-3 text-center">
                                {t.departmentName ? (
                                    <span className="font-mono text-xs bg-[#1B3A2F]/5 text-[#1B3A2F] px-2 py-1 rounded ">
                                        {t.departmentName}
                                    </span>
                                ) : (
                                    <span className="text-xs text-[#1B3A2F]/30 italic">N/A</span>
                                )}
                            </td>
                            <td className="p-3">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => editing(t)}
                                        className="px-4 py-1.5 bg-[#E8B923] text-[#1B3A2F] text-sm font-medium rounded-lg hover:bg-[#d6a913] shadow-sm transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await deleteTeacher(t.teacherId);
                                            refresh();
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