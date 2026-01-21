import { useState } from "react";
import "./AdminPages.css";

export default function Ads() {
  // Load ads from localStorage or use default
  const loadAds = () => {
    const savedAds = localStorage.getItem("homepageAds");
    if (savedAds) {
      try {
        return JSON.parse(savedAds);
      } catch (error) {
        console.error("Error loading ads:", error);
      }
    }
    return [
      {
        id: 1,
        title: "Welcome to FCI Arish",
        image: null,
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        link: "#",
        active: true,
        order: 1,
      },
    ];
  };

  const [ads, setAds] = useState(loadAds);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    imagePreview: null,
    link: "",
    active: true,
    order: 1,
  });

  const handleAdd = () => {
    setEditing(null);
    setFormData({
      title: "",
      image: null,
      imagePreview: null,
      link: "",
      active: true,
      order: ads.length + 1,
    });
    setShowForm(true);
  };

  const handleEdit = (ad) => {
    setEditing(ad);
    setFormData({
      ...ad,
      image: null,
      imagePreview: ad.imageUrl || null,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      const updatedAds = ads.filter((a) => a.id !== id);
      setAds(updatedAds);
      // Save to localStorage
      localStorage.setItem("homepageAds", JSON.stringify(updatedAds));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adData = {
      ...formData,
      imageUrl: formData.imagePreview || formData.imageUrl,
    };

    let updatedAds;
    if (editing) {
      updatedAds = ads.map((a) =>
        a.id === editing.id ? { ...adData, id: a.id } : a
      );
    } else {
      updatedAds = [...ads, { ...adData, id: Date.now() }];
    }

    setAds(updatedAds);
    // Save to localStorage for homepage display
    localStorage.setItem("homepageAds", JSON.stringify(updatedAds));
    setShowForm(false);
  };

  const toggleActive = (id) => {
    const updatedAds = ads.map((a) => (a.id === id ? { ...a, active: !a.active } : a));
    setAds(updatedAds);
    // Save to localStorage
    localStorage.setItem("homepageAds", JSON.stringify(updatedAds));
  };

  const sortedAds = [...ads].sort((a, b) => a.order - b.order);

  return (
    <div className="admin-page">
      <h1>Manage Homepage Ads</h1>

      <button className="btn-add" onClick={handleAdd}>
        Add New Ad
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Image</th>
            <th>Title</th>
            <th>Link</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedAds.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.order}</td>
              <td>
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  style={{
                    width: "80px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </td>
              <td>{ad.title}</td>
              <td>
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0d6efd", textDecoration: "none" }}
                >
                  {ad.link || "No link"}
                </a>
              </td>
              <td>
                <span
                  className={`status-badge ${
                    ad.active ? "status-active" : "status-inactive"
                  }`}
                >
                  {ad.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="btn-toggle"
                  onClick={() => toggleActive(ad.id)}
                  style={{
                    background: ad.active ? "#ffc107" : "#198754",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                >
                  {ad.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(ad)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(ad.id)}
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
            <h3>{editing ? "Edit Ad" : "Add New Ad"}</h3>

            <input
              placeholder="Ad Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <div style={{ margin: "10px 0" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Ad Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}
            </div>

            <input
              placeholder="Link URL (optional)"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Display Order"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              min="1"
              required
            />

            <label style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
                style={{ marginRight: "8px" }}
              />
              Active
            </label>

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
