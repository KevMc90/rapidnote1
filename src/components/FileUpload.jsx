// rapidnote-frontend/src/components/FileUpload.jsx

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FileUpload({ label, onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please upload a PDF file.");
      e.target.value = null;
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
}
