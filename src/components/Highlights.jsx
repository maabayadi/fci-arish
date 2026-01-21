import "./Highlights.css";

export default function DashboardHighlights() {
  return (
    <section className="highlights-section">
      <div className="highlights-container">

        <div className="highlight-card">
          <div className="icon-circle">📊</div>
          <h3>Admin Dashboard</h3>
          <p>
            Manage users, courses, schedules, and reports efficiently.
          </p>
        </div>

        <div className="highlight-card">
          <div className="icon-circle">📂</div>
          <h3>Lecture Materials</h3>
          <p>
            Upload and share course files in seconds.
          </p>
        </div>

        <div className="highlight-card">
          <div className="icon-circle">🎓</div>
          <h3>Grades & GPA</h3>
          <p>
            Instant grade view with automated GPA calculation.
          </p>
        </div>

        <div className="highlight-card">
          <div className="icon-circle">📝</div>
          <h3>Smart Registration</h3>
          <p>
            Register courses easily with real-time availability.
          </p>
        </div>

      </div>
    </section>
  );
}
