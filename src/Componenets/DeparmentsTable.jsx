import React from 'react'
import { data } from 'react-router-dom'
import { deleteDepartment } from '../APIs/DepartmentsAxios'

export default function DeparmentsTable({ data, editing, refresh }) {
  return (
    <div className='rounded-xl overflow-hidden border border-[#1B3A2F] shadow-sm mt-6'>
      <table className='w-full'>
        <thead className='bg-[#1B3A2F]'>
          <tr>
            <th className='p-3 text-center font-mono text-xs tracking-widest text-[#F4EAC8] uppercase'>Department</th>
            <th className='p-3 text-center font-mono text-xs tracking-widest text-[#F4EAC8] uppercase'>Code</th>
            <th className='p-3 text-center font-mono uppercase text-xs tracking-widest text-[#F4EAC8]'>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className='py-8 text-center text-sm  text-[#1B3A2F] italic'>
                No Departmnets yet --Add one get started
              </td>
            </tr>
          )}

          {data.map((d) => (
            <tr
              key={d.departmentId}
              className='border-t border-[#1B3A2F]/10 even:bg-[#F4EAC8]/20 hover:bg-[#e8b923]/10 transition-colors'
            >
              <td className='p-3 text-[#1B3A2F] font-medium text-center'>{d.departmentName}</td>
              <td className='p-3 text-center'>
                <span className='font-mono text-xs bg-[#1B3A2F]/5 text-[#1B3A2F] px-2 py-1 rounded'>
                  {d.departmentCode}</span>
              </td>
              <td className='p-3 '>
                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => editing(d)}
                    className='px-4 py-1.5 bg-[#E8B923] text-[#1B3A2F] text-sm font-medium rounded lg hover:bg-[#d6a913] shadow-sm transition'>
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteDepartment(d.departmentId);
                      refresh();
                      alert("You cannot delete the deparment without permission of Teacher")
                    }}
                    className='px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg  hover:bg-red-500 shadow-sm transition'>
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


