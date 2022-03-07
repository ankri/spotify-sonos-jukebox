import * as React from "react";
import classNames from "classnames";
import { MdRefresh } from "react-icons/md";

export const EditInput: React.FC<
  {
    name: string;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    onReset?: () => void;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">
> = ({ name, label, value, onChange, onReset, ...props }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-slate-200"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            {...props}
            type="text"
            name={name}
            id={name}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            className={classNames(
              "focus:ring-spotify focus:border-spotify block w-full rounded-none rounded-l-md sm:text-sm border-slate-50 bg-zinc-800",
              {
                "rounded-r-md": typeof onReset === "undefined",
              }
            )}
          />
        </div>
        {onReset ? (
          <button
            onClick={() => {
              onReset();
            }}
            type="button"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-slate-50 bg-zinc-900 text-sm font-medium rounded-r-md text-white  hover:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-spotify focus:border-spotify"
          >
            <MdRefresh />
          </button>
        ) : null}
      </div>
    </div>
  );
};

{
  /* <div>
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
</div> */
}
