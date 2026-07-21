import React, { useEffect, useState } from 'react'
import { getDepartments } from '../APIs/DepartmentsAxios';
import { saveStudents, updateStudents } from '../APIs/StudentsAxios';

export default function StudentsModel({ open, editData, refresh, closing }) {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, [])

  useEffect(() => {
    if (editData) {
      setRollNumber(editData.rollNumber || "");
      setStudentName(editData.studentName || "");
      setGender(editData.gender || "");
      setAddress(editData.address || "");
      setDepartmentId(editData.departmentId || "")
    } else {
      setRollNumber("");
      setStudentName("");
      setGender("");
      setDepartmentId("");
      setAddress("")
    }
  }, [editData]);

  if (!open) return null;

  const handleSubmit = async () => {
    const payload = {
      studentName,
      rollNumber: rollNumber ? Number(rollNumber) : null,
      gender,
      address,
      departmentId: departmentId ? Number(departmentId) : null
    };

    if (editData) {
      await updateStudents(editData.studentId, payload)
    } else {
      await saveStudents(payload);
    }

    refresh();
    closing();
  }

  return (
    <div className='fixed inset-0 bg-[#1B3A2F]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-[#FAF7F0] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1B3A2F]/10 overflow-hidden'>
        <div className='h-1.5 bg-gradient-to-r from-[#1B3A2F] to-[#E8B923]' />

        <div className='p-6 pb-4'>
          <p className='text-[#1B3A2F]/50 font-mono text-[10px] tracking-wide uppercase'>
            Student Model
          </p>
          <h2 className='font-display font-semibold text-2xl text-[#1B3A2F]'>
            {editData ? "Update Student" : "Add Student"}
          </h2>
        </div>

        <div className='px-6 pb-6 space-y-4'>
          <div>
            <label className='block font-mono text-[11px] tracking-wide uppercase text-[#1B3A2F]/50 mb-1'>
              Student Name
            </label>
            <input type="text"
              placeholder='e.g. Ravi'
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className='w-full rounded-lg text-sm text-[#1B3A2F] border border-[#1B3A2F]/50 px-3 py-2 placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition'
            />
          </div>

          <div>
            <label className='block font-mono tracking-wide uppercase text-[11px] text-[#1B3A2F]/50 mb-1'>
              Roll Number
            </label>
            <input
              type="text"
              placeholder='e.g. 1'
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className='w-full rounded-lg px-3 py-2 border border-[#1B3A2F]/50 text-sm text-[#1B3A2F] placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition' />
          </div>

          <div>
            <label className='block font-mono text-[11px] text-[#1B3A2F]/50 tracking-wide uppercase mb-1'>
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='w-full rounded-lg text-sm text-[#1B3A2F] border border-[#1B3A2F]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition' >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className='w-full font-mono uppercase tracking-wide mb-1 text-[11px] text-[#1B3A2F]/50'>
              Department
            </label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className='w-full rounded-lg px-3 py-2 text-sm text-[#1B3A2F] border border-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition'
            >
              <option value="">Select Department</option>
              {departments.map((e) => (
                <option key={e.departmentId} value={e.departmentId}>
                  {e.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block font-mono uppercase tracking-wide mb-1 text-[11px] text-[#1B3A2F]/50'>
              Address
            </label>
            <input type="text"
              className='w-full rounded-lg px-3 py-2 text-sm text-[#1B3A2F] border border-[#1B3A2F]/30 placeholder:text-[#1B3A2F]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3A2F]/20 focus:border-[#1B3A2F] transition'
              placeholder='e.g. 1-23,kadapa'
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>

        <div className='flex justify-end gap-3 px-6 py-4 border-t border-[#1B3A2F]/10 bg-[#1B3A2F]/[0.03]'>
          <button
            onClick={closing}
            className='px-4 py-2 rounded-lg border border-[#1B3A2F]/20 text-[#1B3A2F]/70 text-sm font-medium hover:bg-[#1B3A2F]/5 transition'>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='rounded-lg text-sm bg-[#1B3A2F] text-[#F4F7F0] font-semibold px-4 py-2 shadow-sm hover:bg-[#14291F] transition'>
            {editData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}