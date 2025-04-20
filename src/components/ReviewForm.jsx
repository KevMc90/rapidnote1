// src/components/ReviewForm.jsx

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <Label>Review Type</Label>
      <ToggleGroup type="single" value={reviewType} onValueChange={setReviewType}>
        <ToggleGroupItem value="initial">Initial</ToggleGroupItem>
        <ToggleGroupItem value="subsequent">Subsequent</ToggleGroupItem>
      </ToggleGroup>

      {reviewType === "initial" && (
        <>
          <Label>HPI</Label>
          <Textarea value={hpi} onChange={(e) => setHpi(e.target.value)} />
          <Label>Care History</Label>
          <Textarea value={careHistory} onChange={(e) => setCareHistory(e.target.value)} />
        </>
      )}

      {reviewType === "subsequent" && (
        <>
          <Label>Prior Reviewer Note</Label>
          <Textarea value={priorNote} onChange={(e) => setPriorNote(e.target.value)} />
        </>
      )}

      <Label>Requested Visits</Label>
      <Input value={requestedVisits} onChange={(e) => setRequestedVisits(e.target.value)} />
      <Label>Plan of Care</Label>
      <Input value={poc} onChange={(e) => setPoc(e.target.value)} />

      <Button className="mt-4" onClick={handleGenerateReview}>Generate Review</Button>

      {generatedReview && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Generated Review:</h3>
          <pre className="whitespace-pre-wrap text-sm">{generatedReview}</pre>
        </div>
      )}
    </div>
  );
}
