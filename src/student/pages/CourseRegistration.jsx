import { useState, useEffect } from "react";
import "../../admin/pages/AdminPages.css";

export default function CourseRegistration() {
  const [availableCourses, setAvailableCourses] = useState([
    { id: 1, name: "Data Structures", code: "CS201", department: "CS", credits: 3, professor: "Dr. Ali Hassan", schedule: "Sunday 10:00-12:00" },
    { id: 2, name: "Database Systems", code: "CS202", department: "CS", credits: 3, professor: "Dr. Mona Sami", schedule: "Monday 10:00-12:00" },
    { id: 3, name: "Web Development", code: "CS203", department: "CS", credits: 3, professor: "Dr. Ahmed Mostafa", schedule: "Tuesday 10:00-12:00" },
    { id: 4, name: "Operating Systems", code: "CS204", department: "CS", credits: 3, professor: "Dr. Ali Hassan", schedule: "Wednesday 10:00-12:00" },
  ]);

  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentCourses") || "[]");
    setRegisteredCourses(saved);
  }, []);

  const handleRegister = (course) => {
    if (registeredCourses.find((c) => c.id === course.id)) {
      alert("You are already registered for this course!");
      return;
    }

    const newRegistration = [...registeredCourses, course];
    setRegisteredCourses(newRegistration);
    localStorage.setItem("studentCourses", JSON.stringify(newRegistration));
    alert(`Successfully registered for ${course.name}!`);
  };

  const handleDrop = (courseId) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      const updated = registeredCourses.filter((c) => c.id !== courseId);
      setRegisteredCourses(updated);
      localStorage.setItem("studentCourses", JSON.stringify(updated));
    }
  };

  const available = availableCourses.filter(
    (c) => !registeredCourses.find((rc) => rc.id === c.id)
  );

  return (
    <div className="admin-page">
      <h1>Course Registration</h1>

      <div style={{ marginBottom: "30px" }}>
        <h2>Available Courses</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Professor</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {available.map((course) => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>{course.professor}</td>
                <td>{course.schedule}</td>
                <td>
                  <button
                    className="btn-add"
                    onClick={() => handleRegister(course)}
                    style={{ padding: "6px 12px", margin: 0 }}
                  >
                    Register
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>My Registered Courses ({registeredCourses.length})</h2>
        {registeredCourses.length === 0 ? (
          <p>No courses registered yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Professor</th>
                <th>Schedule</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>{course.professor}</td>
                  <td>{course.schedule}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDrop(course.id)}
                      style={{ padding: "6px 12px", margin: 0 }}
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
