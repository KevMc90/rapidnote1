import React from "react";
import ReviewForm from "./components/ReviewForm";

function App() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RapidNote Review Generator</h1>
      <ReviewForm />
    </div>
  );
}

export default App;
