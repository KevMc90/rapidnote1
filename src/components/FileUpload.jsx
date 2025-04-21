// ----------- File: /src/components/FileUpload.jsx -----------

import { useRef } from "react";

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
    <div className="mt-4">
      <label className="block font-semibold">{label}</label>
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        onChange={handleFileChange}
        className="mt-1"
      />
    </div>
  );
}
