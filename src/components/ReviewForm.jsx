import { useState } from "react";

export default function ReviewForm() {
  const [reviewType, setReviewType] = useState("initial");
  const [hpi, setHpi] = useState("");
  const [careHistory, setCareHistory] = useState("");
  const [requestedVisits, setRequestedVisits] = useState("");
  const [poc, setPoc] = useState("");
  const [priorNote, setPriorNote] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");

  const handleGenerateReview = async () => {
    const response = await fetch("http://localhost:5001/api/generate-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewType,
        hpi,
        careHistory,
        requestedVisits,
        poc,
        priorNote,
      }),
    });

    const data = await response.json();
    setGeneratedReview(data.review);
  };

  return (
    <div className="space-y-4">
      <label className="block font-semibold">Review Type</label>
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded border ${reviewType === "initial" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setReviewType("initial")}
          type="button"
        >
          Initial
        </button>
        <button
          className={`px-4 py-2 rounded border ${reviewType === "subsequent" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setReviewType("subsequent")}
          type="button"
        >
          Subsequent
        </button>
      </div>

      {reviewType === "initial" && (
        <>
          <label className="block font-semibold">HPI</label>
          <textarea className="w-full border p-2 rounded" value={hpi} onChange={(e) => setHpi(e.target.value)} />

          <label className="block font-semibold">Care History</label>
          <textarea className="w-full border p-2 rounded" value={careHistory} onChange={(e) => setCareHistory(e.target.value)} />
        </>
      )}

      {reviewType === "subsequent" && (
        <>
          <label className="block font-semibold">Prior Reviewer Note</label>
          <textarea className="w-full border p-2 rounded" value={priorNote} onChange={(e) => setPriorNote(e.target.value)} />
        </>
      )}

      <label className="block font-semibold">Requested Visits</label>
      <input className="w-full border p-2 rounded" value={requestedVisits} onChange={(e) => setRequestedVisits(e.target.value)} />

      <label className="block font-semibold">Plan of Care</label>
      <input className="w-full border p-2 rounded" value={poc} onChange={(e) => setPoc(e.target.value)} />

      <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded" onClick={handleGenerateReview}>
        Generate Review
      </button>

      {generatedReview && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Generated Review:</h3>
          <pre className="whitespace-pre-wrap text-sm">{generatedReview}</pre>
        </div>
      )}
    </div>
  );
}
