export function Label({ children, ...props }) {
  return (
    <label {...props} className="block font-semibold mb-1">
      {children}
    </label>
  );
}
