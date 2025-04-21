// rapidnote-frontend/src/components/ReviewForm.jsx

import { useState } from "react";
import ReviewOutput from "./ReviewOutput";
import FileUpload from "./FileUpload";

export default function ReviewForm() {
  const [reviewType, setReviewType] = useState("initial");
  const [hpi, setHpi] = useState("");
  const [careHistory, setCareHistory] = useState("");
  const [requestedVisits, setRequestedVisits] = useState("");
  const [poc, setPoc] = useState("");
  const [priorNote, setPriorNote] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [generatedReview, setGeneratedReview] = useState("");

  const handleGenerateReview = async () => {
    const formData = new FormData();
    formData.append("reviewType", reviewType);
    formData.append("hpi", hpi);
    formData.append("careHistory", careHistory);
    formData.append("requestedVisits", requestedVisits);
    formData.append("poc", poc);
    formData.append("priorNote", priorNote);
    if (uploadedFile) formData.append("file", uploadedFile);

    const response = await fetch("https://rapidnote-backend.vercel.app/api/generate-review", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setGeneratedReview(data.review);
  };

  return (
    <div className="space-y-4 p-4">
      <label className="font-semibold">Review Type</label>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded border ${reviewType === "initial" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => setReviewType("initial")}
        >
          Initial
        </button>
        <button
          className={`px-4 py-2 rounded border ${reviewType === "subsequent" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => setReviewType("subsequent")}
        >
          Subsequent
        </button>
      </div>

      {reviewType === "initial" && (
        <>
          <label className="block font-semibold mt-4">HPI</label>
          <textarea
            className="w-full border p-2 rounded"
            value={hpi}
            onChange={(e) => setHpi(e.target.value)}
          />

          <label className="block font-semibold mt-4">Care History</label>
          <textarea
            className="w-full border p-2 rounded"
            value={careHistory}
            onChange={(e) => setCareHistory(e.target.value)}
          />
        </>
      )}

      {reviewType === "subsequent" && (
        <>
          <label className="block font-semibold mt-4">Prior Reviewer Note</label>
          <textarea
            className="w-full border p-2 rounded"
            value={priorNote}
            onChange={(e) => setPriorNote(e.target.value)}
          />
        </>
      )}

      <label className="block font-semibold mt-4">Requested Visits</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={requestedVisits}
        onChange={(e) => setRequestedVisits(e.target.value)}
      />

      <label className="block font-semibold mt-4">Plan of Care</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={poc}
        onChange={(e) => setPoc(e.target.value)}
      />

      <FileUpload label="Attach Supporting Documents (PDF)" onFileSelect={setUploadedFile} />

      <button
        onClick={handleGenerateReview}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Generate Review
      </button>

      <ReviewOutput review={generatedReview} />
    </div>
  );
}
