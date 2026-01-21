import { Routes, Route } from "react-router-dom";

/* ====== Website Components ====== */
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Academic from "./components/Academic";
import Footer from "./components/Footer";

/* ====== Admin Components ====== */
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Students from "./admin/pages/Students";
import Professors from "./admin/pages/Professors";
import Departments from "./admin/pages/Departments";
import Courses from "./admin/pages/Courses";
import News from "./admin/pages/News";
import Ads from "./admin/pages/Ads";
import Schedules from "./admin/pages/Schedules";
import Settings from "./admin/pages/Settings";

/* ====== Student Components ====== */
import StudentLayout from "./student/StudentLayout";
import StudentDashboard from "./student/pages/StudentDashboard";
import CourseRegistration from "./student/pages/CourseRegistration";
import MyGrades from "./student/pages/MyGrades";
import ClassSchedule from "./student/pages/ClassSchedule";

/* ====== Professor Components ====== */
import ProfessorLayout from "./professor/ProfessorLayout";
import ProfessorDashboard from "./professor/pages/ProfessorDashboard";
import MyCourses from "./professor/pages/MyCourses";
import MySchedule from "./professor/pages/MySchedule";
import SupervisorPanel from "./professor/pages/SupervisorPanel";
import DepartmentStudents from "./professor/pages/DepartmentStudents";

/* ====== Auth Components ====== */
import Login from "./auth/Login";

import "./index.css";

/* ====== Website Home Page ====== */
function WebsiteHome() {
  const sectionStyle = {
    paddingTop: "50px",
    minHeight: "50vh",
  };

  return (
    <>
      <Navbar />

      <section id="home" style={sectionStyle}>
        <Hero />
      </section>

      <section id="about" style={sectionStyle}>
        <About />
      </section>

      <section id="departments" style={sectionStyle}>
        <Highlights />
      </section>

      <section id="programs" style={sectionStyle}>
        <Academic />
      </section>

      <section id="news" style={sectionStyle}>
        <h2 style={{ marginBottom: "10px" }}>What’s New?</h2>
        <p style={{ marginBottom: "30px", color: "gray" }}>
          Discover recent highlights, important notices, and faculty achievements.
        </p>

        <div className="news-grid">
          <div className="news-card">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              className="news-img"
            />
            <h3>First Graduating Class of FCI Arish</h3>
            <span className="date">August 7, 2025</span>
            <p>
              Arish University celebrated the graduation of the first class of the
              Faculty of Computers and Information.
            </p>
            <button className="news-btn">Read More</button>
          </div>

          <div className="news-card">
            <img
              src="https://images.weserv.nl/?url=images.unsplash.com/photo-1581092160624-7f7c39c17c37"
              className="news-img"
            />
            <h3>Regional Conference – Tamkeen Initiative</h3>
            <span className="date">October 29, 2025</span>
            <p>
              A regional awareness conference within the presidential “Tamkeen”
              Initiative.
            </p>
            <button className="news-btn">Read More</button>
          </div>

          <div className="news-card">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
              className="news-img"
            />
            <h3>Admission Opportunities in CS & AI</h3>
            <span className="date">August 6, 2025</span>
            <p>
              New admission openings for Computer Science and AI programs.
            </p>
            <button className="news-btn">Read More</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ====== App Routes ====== */
function App() {
  return (
    <Routes>
      {/* Website */}
      <Route path="/" element={<WebsiteHome />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="professors" element={<Professors />} />
        <Route path="departments" element={<Departments />} />
        <Route path="courses" element={<Courses />} />
        <Route path="news" element={<News />} />
        <Route path="ads" element={<Ads />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Student */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<CourseRegistration />} />
        <Route path="grades" element={<MyGrades />} />
        <Route path="schedule" element={<ClassSchedule />} />
      </Route>

      {/* Professor */}
      <Route path="/professor" element={<ProfessorLayout />}>
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="schedule" element={<MySchedule />} />
        <Route path="supervisor" element={<SupervisorPanel />} />
        <Route path="department-students" element={<DepartmentStudents />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;



