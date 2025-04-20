import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    hpi: "",
    care_history: "",
    requested_visits: "",
    poc: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Replace this with your backend call)");
  };

  return (
    <div className="container" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>RapidNote Review Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>HPI:</label>
          <textarea name="hpi" onChange={handleChange} />
        </div>
        <div>
          <label>Care History:</label>
          <textarea name="care_history" onChange={handleChange} />
        </div>
        <div>
          <label>Requested Visits:</label>
          <input type="number" name="requested_visits" onChange={handleChange} />
        </div>
        <div>
          <label>Plan of Care:</label>
          <input type="text" name="poc" onChange={handleChange} />
        </div>
        <div>
          <label>Upload Note (PDF):</label>
          <input type="file" name="file" accept="application/pdf" onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Generate Review</button>
      </form>
    </div>
  );
}

export default App;
