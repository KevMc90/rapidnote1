// ----------- File: /src/components/ReviewForm.jsx -----------

import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
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

      <FileUpload label="Attach Supporting Documents (PDF)" onFileSelect={setUploadedFile} />

      <Button className="mt-4" onClick={handleGenerateReview}>Generate Review</Button>

      <ReviewOutput review={generatedReview} />
    </div>
  );
}
