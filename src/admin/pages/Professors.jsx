import { useState } from "react";
import "./AdminPages.css";

export default function Professors() {
  const [professors, setProfessors] = useState([
    { id: 1, name: "Dr. Ali Hassan", email: "ali@uni.edu", department: "CS" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleAdd = () => {
    setEditing(null);
    setFormData({ name: "", email: "", department: "" });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProfessors(professors.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      setProfessors(
        professors.map((p) =>
          p.id === editing.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setProfessors([...professors, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <h1>Manage Professors</h1>

      <button className="btn-add" onClick={handleAdd}>
        Add Professor
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {professors.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.department}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleSubmit}>
            <h3>{editing ? "Edit Professor" : "Add Professor"}</h3>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            />

            <div className="modal-actions">
              <button className="btn-add">Save</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
