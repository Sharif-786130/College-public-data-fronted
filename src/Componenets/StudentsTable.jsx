import React from 'react'
import { deleteStudent } from '../APIs/StudentsAxios'

export default function StudentsTable({ data, editing, refresh }) {
  return (
    <div className='rounded-xl border border-[#1B3A2F]/10 overflow-hidden shadow-sm mt-6'>
      <table className='w-full'>
        <thead className='bg-[#1B3A2F]'>
          <tr>
            <th className='p-3 font-mono text-center text-[#F4EAC8] tracking-widest text-xs uppercase'>Name</th>
            <th className='p-3 text-center uppercase text-xs text-[#F4EAC8] tracking-widest font-mono'>Roll Num</th>
            <th className='p-3 text-center uppercase text-xs text-[#F4EAC8] tracking-widest font-mono'>Gender</th>
            <th className='p-3 text-center uppercase text-xs tracking-widest text-[#F4EAC8] font-mono'>Department</th>
            <th className='p-3 font-mono text-center tracking-widest text-xs text-[#F4EAC8] uppercase'>Address</th>
            <th className='p-3 text-center uppercase text-xs tracking-widest fonto-mono text-[#F4EAC8]'>Actions</th>
          </tr>
        </thead>

        <tbody className=''>
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className='text-center text-[#1B3A2F]/50 italic text-sm py-8'>
                No Students Yet add one to Get Started
              </td>
            </tr>
          )}

          {data.map((s) => (
            <tr
              key={s.studentId}
              className='border-t border-[#1B3A2F]/10 even:bg-[#F4EAC8]/20 hover:bg-[#E8B923]/10 transition-colors'>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{s.studentName}</td>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{s.rollNumber}</td>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{s.gender}</td>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{s.departmentName}</td>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{s.address}</td>
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>
                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => editing(s)}
                    className='px-4 py-1.5 font-medium bg-yellow-600 rounded-lg text-sm shadow-sm hover:bg-yellow-500 transition'>
                    Edit
                  </button>
                  <button
                    type='button'
                    onClick={async () => {
                      try {
                        await deleteStudent(s.studentId)
                        refresh();
                      } catch (error) {
                        alert(
                          error.response?.data.message ||
                          "You cannot the students details without permission of Teachers"
                        );
                      }
                    }}
                    className='px-4 py-1.5 text-sm shadow-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-500 transition'>
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}


