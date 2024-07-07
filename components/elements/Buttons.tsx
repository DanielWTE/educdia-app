import { ButtonLoader, ButtonLoaderWithoutMargin } from "./Loader";

export function FormSubmitButton({
  children,
  disabled,
  isSubmitting,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  isSubmitting: boolean;
  onClick: any;
}) {
  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all items-center ${
        disabled || isSubmitting
          ? "bg-gray-300 hover:bg-gray-200"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
      onClick={onClick}
      disabled={disabled || isSubmitting}
    >
      <ButtonLoader isSubmitting={isSubmitting} />
      {children}
    </button>
  );
}

export function SimpleButton({
  text,
  onClick,
}: {
  text: string;
  onClick: any;
  className?: string;
}) {
  return (
    <button
      type="button"
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function SimpleButtonWithLoader({
  text,
  onClick,
  isLoading,
}: {
  text: string;
  onClick: any;
  isLoading: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
      ${isLoading ? "bg-gray-300 hover:bg-gray-200" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoaderWithoutMargin isSubmitting={true} /> : text}
    </button>
  );
}

export function SimpleButtonDanger({
  text,
  onClick,
}: {
  text: string;
  onClick: any;
}) {
  return (
    <button
      type="button"
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function SimpleButtonWithLoaderSmall({
  text,
  onClick,
  isLoading,
}: {
  text: string;
  onClick: any;
  isLoading: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
      ${isLoading ? "bg-gray-300 hover:bg-gray-200" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoaderWithoutMargin isSubmitting={true} /> : text}
    </button>
  );
}