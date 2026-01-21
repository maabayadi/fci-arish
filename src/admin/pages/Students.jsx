import { useState } from "react";
import * as XLSX from "xlsx";
import "./AdminPages.css";

export default function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", department: "CS" },
    { id: 2, name: "Mona Sami", email: "mona@example.com", department: "Math" },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [importMessage, setImportMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  // Add
  const handleAdd = () => {
    setEditing(null);
    setFormData({ name: "", email: "", department: "" });
    setShowForm(true);
  };

  // Edit
  const handleEdit = (student) => {
    setEditing(student);
    setFormData(student);
    setShowForm(true);
  };

  // Save
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      setStudents(
        students.map((s) =>
          s.id === editing.id ? { ...formData, id: s.id } : s
        )
      );
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
  };

  // Delete
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Excel Import Handler
  const handleExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setImportMessage("Excel file is empty!");
          setTimeout(() => setImportMessage(""), 3000);
          return;
        }

        // Map Excel columns to student data
        // Supports: Name, Email, Department (case-insensitive)
        const importedStudents = jsonData.map((row, index) => {
          const nameKey = Object.keys(row).find(
            (key) => key.toLowerCase().includes("name")
          );
          const emailKey = Object.keys(row).find(
            (key) => key.toLowerCase().includes("email")
          );
          const deptKey = Object.keys(row).find(
            (key) =>
              key.toLowerCase().includes("department") ||
              key.toLowerCase().includes("dept")
          );

          return {
            id: Date.now() + index,
            name: row[nameKey] || row[Object.keys(row)[0]] || `Student ${index + 1}`,
            email: row[emailKey] || row[Object.keys(row)[1]] || "",
            department: row[deptKey] || row[Object.keys(row)[2]] || "",
          };
        });

        setStudents([...students, ...importedStudents]);
        setImportMessage(
          `Successfully imported ${importedStudents.length} student(s)!`
        );
        setTimeout(() => setImportMessage(""), 3000);

        // Reset file input
        e.target.value = "";
      } catch (error) {
        setImportMessage("Error reading Excel file: " + error.message);
        setTimeout(() => setImportMessage(""), 3000);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Excel Export Handler
  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h1>Manage Students</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        <button className="btn-add" onClick={handleAdd}>
          Add Student
        </button>
        
        <label className="btn-import" style={{
          background: "#0d6efd",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "5px",
          cursor: "pointer",
          display: "inline-block",
        }}>
          Import Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelImport}
            style={{ display: "none" }}
          />
        </label>

        <button
          className="btn-export"
          onClick={handleExcelExport}
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Export Excel
        </button>
      </div>

      {importMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            background: importMessage.includes("Error")
              ? "#f8d7da"
              : "#d1e7dd",
            color: importMessage.includes("Error") ? "#721c24" : "#0f5132",
            border: `1px solid ${
              importMessage.includes("Error") ? "#f5c2c7" : "#badbcc"
            }`,
          }}
        >
          {importMessage}
        </div>
      )}

      <input
        className="search-input"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.department}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(s)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM */}
      {showForm && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleSubmit}>
            <h3>{editing ? "Edit Student" : "Add Student"}</h3>

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
              <button type="submit" className="btn-add">
                Save
              </button>
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
