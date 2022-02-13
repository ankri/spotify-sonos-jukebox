import * as React from "react";

export const EditInput: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}> = ({ name, label, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-200"
        style={{ fontVariant: "small-caps" }}
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-50 bg-slate-800 rounded-md"
      />
    </div>
  );
};
