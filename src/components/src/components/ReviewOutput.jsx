// rapidnote-frontend/src/components/ReviewOutput.jsx

export default function ReviewOutput({ review }) {
  if (!review) return null;

  return (
    <div className="mt-8 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Generated Review</h2>
      <pre className="whitespace-pre-wrap text-sm">{review}</pre>
    </div>
  );
}
