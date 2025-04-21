export function Button(props) {
  return (
    <button {...props} className="bg-blue-600 text-white rounded p-2">
      {props.children}
    </button>
  );
}
