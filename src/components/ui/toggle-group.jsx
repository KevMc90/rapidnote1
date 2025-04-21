import React from "react";

export function ToggleGroup({ value, onValueChange, children }) {
  return (
    <div className="flex gap-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          selected: child.props.value === value,
          onClick: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
}

export function ToggleGroupItem({ value, children, selected, onClick }) {
  return (
    <button
      type="button"
      className={`border px-3 py-1 rounded ${
        selected ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
