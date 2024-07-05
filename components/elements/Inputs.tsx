interface InputProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  required: boolean;
  placeholder: string;
  label: string;
  onChange: any;
  disabled: boolean;
  value?: string;
  maxLength?: number;
}

interface InputPropsCheckbox {
  id: string;
  name: string;
  onChange: any;
  disabled: boolean;
  children: React.ReactNode;
}

export function FormInput({
  id,
  name,
  type,
  autoComplete,
  required,
  placeholder,
  label,
  onChange,
  disabled,
  value,
  maxLength = 255,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
            disabled ? "bg-gray-100" : ""
          }`}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}

export function FormCheckbox({
  id,
  name,
  onChange,
  disabled,
  children,
}: InputPropsCheckbox) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${
          disabled ? "text-gray-400" : ""
        }`}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm leading-6 text-gray-900"
      >
        {children}
      </label>
    </div>
  );
}