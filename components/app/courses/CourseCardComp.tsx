import { SimpleButton } from "@/components/elements/Buttons";
import Link from "next/link";

export function CourseCardComponent({
  id,
  name,
  description,
}: Readonly<{
  id: string;
  name: string;
  description: string;
}>) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-sm">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {name}
      </h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
      <hr className="border-gray-200 border-b mt-4 mb-4" />
      <Link href={`/course/${id}`}>
        <SimpleButton text="Kurs starten" onClick={() => {}} />
      </Link>
    </div>
  );
}

export function UnfinishedCourseCardComponent({
  id,
  name,
  description,
  totalQuestions,
  answeredQuestions,
  session,
}: Readonly<{
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  answeredQuestions: number;
  session: string;
}>) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-sm">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {name}
      </h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
      <hr className="border-gray-200 border-b mt-4 mb-4" />
      <p className="text-sm text-gray-500">
        {answeredQuestions}/{totalQuestions} Fragen beantwortet
      </p>
      <hr className="border-gray-200 border-b mt-4 mb-4" />
      <Link href={`/course/${id}?session=${session}`}>
        <SimpleButton text="Kurs fortsetzen" onClick={() => {}} />
      </Link>
    </div>
  );
}