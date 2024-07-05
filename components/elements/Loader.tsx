import { LuLoader2 } from "react-icons/lu";

export function ButtonLoader({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <span>
      {isSubmitting && <LuLoader2 size={20} className="animate-spin mr-2" />}
    </span>
  );
}

export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center h-96 w-full flex-col gap-2">
      <LuLoader2 size={40} className="text-gray-900 animate-spin opacity-70" />
      <p className="text-gray-900 ml-2 text-xs opacity-70 animate-pulse">
        {text || "Lade Daten..."}
      </p>
    </div>
  );
}
