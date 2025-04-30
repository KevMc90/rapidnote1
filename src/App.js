import React, { useState } from "react";
import axios from "axios";

function App() {
  const [reviewType, setReviewType] = useState("initial");
  const [hpi, setHpi] = useState("");
  const [careHistory, setCareHistory] = useState("");
  const [requestedVisits, setRequestedVisits] = useState("");
  const [poc, setPoc] = useState("");
  const [file, setFile] = useState(null);
  const [priorNote, setPriorNote] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) formData.append("file", file);

    try {
      const response = await axios.post("https://rapidnote-backend.onrender.com/api/generate-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          reviewType,
          hpi: hpi.trim(),
          careHistory: careHistory.trim(),
          requestedVisits: parseInt(requestedVisits),
          poc: poc.trim(),
          priorNote: priorNote.trim()
        }
      });

      setReview(response.data.review);
    } catch (err) {
      setReview("Error generating review: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RapidNote Review Generator</h1>

      <div className="mb-3">
        <label className="block font-semibold">Review Type</label>
        <select value={reviewType} onChange={(e) => setReviewType(e.target.value)} className="border px-2 py-1">
          <option value="initial">Initial</option>
          <option value="subsequent">Subsequent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input placeholder="HPI" value={hpi} onChange={(e) => setHpi(e.target.value)} className="border p-2" />
        <input placeholder="Care History" value={careHistory} onChange={(e) => setCareHistory(e.target.value)} className="border p-2" />
        <input placeholder="Requested Visits" type="number" value={requestedVisits} onChange={(e) => setRequestedVisits(e.target.value)} className="border p-2" />
        <input placeholder="Plan of Care (e.g. 2x6)" value={poc} onChange={(e) => setPoc(e.target.value)} className="border p-2" />
      </div>

      <div className="my-3">
        <label className="block font-semibold">Attach Supporting Documents (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="block" />
      </div>

      {reviewType === "subsequent" && (
        <textarea
          placeholder="Paste prior reviewer note here"
          value={priorNote}
          onChange={(e) => setPriorNote(e.target.value)}
          className="w-full border p-2 h-32 mb-3"
        />
      )}

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Generate Review</button>

      {review && (
        <div className="mt-6 whitespace-pre-wrap border p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Generated Review</h2>
          {review}
        </div>
      )}
    </div>
  );
}

export default App;
