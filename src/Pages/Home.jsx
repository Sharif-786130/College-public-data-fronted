

import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";

// axios services
import { getTeachers } from "../APIs/TeachersAxios";
import { getSubjects } from "../APIs/SubjectsAxios";
import Api from "../APIs/Axios";
import TeacherTable from "../Componenets/TeachersTable";
import TeacherModel from "../Componenets/TeachersModel";
import SubjectTable from "../Componenets/SubjectsTable";
import SubjectModel from "../Componenets/SubjectsModel";
import { getDepartments } from "../APIs/DepartmentsAxios";
import DeparmentsTable from "../Componenets/DeparmentsTable";
import DepartmentsModel from "../Componenets/DepartmentsModel";
import StudentsModel from "../Componenets/StudentsModel";
import StudentsTable from "../Componenets/StudentsTable";
import { getStudents } from "../APIs/StudentsAxios";


const values = ["Teachers", "Subjects", "Students", "Departments"];

export default function Home() {
  // auth
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  // ui state
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [activetab, setActivetab] = useState("Teachers");

  // data
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [students,setStudents] = useState([]);

  // 🔐 verify logged-in user
  useEffect(() => {
    Api.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => logout());
  }, []);

  // data loaders
  const loadTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  const loadSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  const loadDepartments =async () =>{
    const data = await getDepartments();
    setDepartments(data);
  }

  const loadStudents = async() => {
    const data = await getStudents();
    setStudents(data);
  }

  // load data on tab change
  useEffect(() => {
    if (activetab === "Teachers") loadTeachers();
    if (activetab === "Subjects") loadSubjects();
    if(activetab === "Departments") loadDepartments();
    if(activetab === "Students") loadStudents();
  }, [activetab]);

  const addButtonLabel = {
    Teachers: "+ Add Teachers",
    Subjects: "+ Add Subjects",
    Students: "+ Add Students",
    Departments: "+ Add Departments",
  };

  return (
  <div className="min-h-screen bg-gray-100">
    {/* Header */}
    {user && (
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user.fullName || user.email}
            </h1>
            <p className="text-blue-100">{user.email}</p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>
    )}

    <div className="max-w-7xl mx-auto p-8">

      {/* Tabs */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex gap-3">
          {values.map((value) => (
            <button
              key={value}
              onClick={() => setActivetab(value)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activetab === value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 shadow"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {addButtonLabel[activetab] && (
          <button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
          >
            {addButtonLabel[activetab]}
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        {activetab === "Teachers" && (
          <>
            <TeacherTable
              data={teachers}
              editing={(t) => {
                setEditData(t);
                setOpen(true);
              }}
              refresh={loadTeachers}
            />

            {open && (
              <TeacherModel
                open={open}
                closing={() => setOpen(false)}
                editData={editData}
                refresh={loadTeachers}
              />
            )}
          </>
        )}

        {activetab === "Subjects" && (
          <>
            <SubjectTable
              data={subjects}
              editing={(s) => {
                setEditData(s);
                setOpen(true);
              }}
              refresh={loadSubjects}
            />

            {open && (
              <SubjectModel
                open={open}
                closing={() => setOpen(false)}
                editData={editData}
                refresh={loadSubjects}
              />
            )}
          </>
        )}

        <div className="rounded-lg shadow-xs p-6 bg-white">

          {activetab === "Departments" && (
            <>
              <DeparmentsTable
                data={departments}
                editing = {(t) =>{
                  setEditData(t);
                  setOpen(true);
                }}
                refresh={loadDepartments}

              />

              {open &&(
              <DepartmentsModel
              open={open}
              closing={() => setOpen(false)}
              editData ={editData}
              refresh={loadDepartments}
              />
              )}
            </>
          )}
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">

          {activetab === "Students" &&(
            <>
            <StudentsTable
                data={students}
                editing={(s) => {
                  setEditData(s);
                  setOpen(true);
                }}
                refresh={loadStudents}
                />

                {open &&(
                  <StudentsModel
                    open={open}
                    closing={() => setOpen(false)}
                    editData={editData}
                    refresh={loadStudents}
                  />
                )}
                </>
          )}

        </div>

      </div>
    </div>
  </div>
);
}

