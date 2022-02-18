import * as React from "react";

export const EditInput: React.FC<
  {
    name: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">
> = ({ name, label, value, onChange, ...props }) => {
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
        {...props}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="shadow-sm p-3 focus:ring-spotify focus:border-spotify block w-full sm:text-sm border-slate-50 bg-zinc-800 rounded-md"
      />
    </div>
  );
};
