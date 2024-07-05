"use client";

import { useGetQuestion } from "@/hooks/data/getQuestion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SimpleButton, SimpleButtonWithLoader } from "../elements/Buttons";
import { mutate } from "swr";

export default function CourseHandlerComponent({
  courseId,
}: {
  courseId: number;
}) {
  const { getQuestionData, getQuestionIsLoading, getQuestionError } =
    useGetQuestion({ courseId });
  const [questionData, setQuestionData] = useState([]) as any;
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!getQuestionIsLoading && getQuestionData?.data) {
      setQuestionData(getQuestionData?.data);
    }
  }, [getQuestionData]);

  // call submitAnswer when enter and control is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey) {
        submitAnswer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer]);


  const submitAnswer = async () => {
    if (!answer) {
      return;
    }

    const data = {
      question_id: questionData.question_id,
      answer,
    };

    setIsSubmitting(true);

    const checkAnswerRequest = await fetch("/api/questions/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // timeout because the server is too fast
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setAnswer("");
    setIsSubmitting(false);

    mutate(`/api/questions/get?cid=${courseId}`);
  }

  return (
    <div className="flex flex-col min-h-full justify-center items-center">
      <div className="border-b border-gray-200 bg-white p-6 rounded-lg shadow-sm md:w-[120vw] max-w-lg w-full">
        {getQuestionIsLoading && !questionData ? (
          <div>Loading...</div>
        ) : (
          <div key={questionData.question_id}>
            <div className="text-gray-500 text-sm">{questionData.category}</div>
            <div className="text-lg font-semibold mt-2 max-w-lg">
              {questionData.question}
            </div>
            <textarea
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Deine Antwort..."
              className="w-full mt-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-center mt-4">
              <SimpleButtonWithLoader
                text="Antwort abschicken"
                onClick={submitAnswer}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        )}
      </div>
      {/* small hint */}
      <div className="mt-4 text-xs text-gray-500">
        Drücke <kbd>Strg</kbd> + <kbd>Enter</kbd> um die Antwort abzuschicken
      </div>
      {/* text to go back to course overview */}
      <div className="bottom-0 fixed mb-4 text-center">
        <Link href="/app/overview" className="text-sm text-gray-500 underline">
          Kurs Pausieren und zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}
