// rapidnote-frontend/src/components/ReviewOutput.jsx

import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";

export default function ReviewOutput({ review }) {
  const pdfRef = useRef(null);

  const handleDownloadPDF = () => {
    if (!review) return;

    html2pdf()
      .set({ filename: "review.pdf", margin: 10, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 } })
      .from(pdfRef.current)
      .save();
  };

  if (!review) return null;

  return (
    <div className="space-y-4">
      <div ref={pdfRef} className="p-4 border rounded bg-white whitespace-pre-wrap">
        {review}
      </div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  );
}
