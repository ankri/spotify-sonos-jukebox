import classNames from "classnames";
import * as React from "react";

export interface InputProps {
  name: string;
  label: string | React.ReactNode;
}

export const Input: React.FC<
  InputProps &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ name, label, ...inputProps }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex flex-row space-x-2 items-center text-sm font-medium text-slate-200"
        style={{ fontVariant: "small-caps" }}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...inputProps}
          name={name}
          id={name}
          className={classNames(
            "shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-slate-50 bg-slate-800 rounded-md",
            inputProps?.className
          )}
        />
      </div>
    </div>
  );
};
