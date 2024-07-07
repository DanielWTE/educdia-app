"use client";

import { useGetQuestion } from "@/hooks/data/getQuestion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SimpleButtonWithLoader,
  SimpleButtonWithLoaderSmall,
} from "../elements/Buttons";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useGetCourseProgress } from "@/hooks/data/getCourseProgress";
import { AnimatePresence, motion } from "framer-motion";
import { Cross, Checkmark } from "./Animations";

export default function CourseHandlerComponent({
  courseId,
}: {
  courseId: number;
}) {
  // get session from search params
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams.toString());
  const session = urlParams.get("session") as string;
  const { getQuestionData, getQuestionIsLoading, getQuestionError } =
    useGetQuestion({ courseId, session });
  const {
    getCourseProgressData,
    getCourseProgressIsLoading,
    getCourseProgressError,
  } = useGetCourseProgress({ courseId, session });
  const [questionData, setQuestionData] = useState([]) as any;
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseProgress, setCourseProgress] = useState([]) as any;
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  useEffect(() => {
    if (!getQuestionIsLoading && getQuestionData?.data) {
      setQuestionData(getQuestionData?.data);
    }
  }, [getQuestionData, getQuestionIsLoading]);

  useEffect(() => {
    if (!getCourseProgressIsLoading && getCourseProgressData?.data) {
      setCourseProgress(getCourseProgressData?.data);
    }
  }, [getCourseProgressData, getCourseProgressIsLoading]);

  // call submitAnswer when enter and control is pressed ignore if correctAnswer is set
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey && !correctAnswer) {
        submitAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer, correctAnswer, isSubmitting]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (isCorrect || isIncorrect) {
      const timeout = setTimeout(() => {
        setIsCorrect(false);
        setIsIncorrect(false);
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCorrect, isIncorrect]);

  const submitAnswer = async () => {
    if (!answer) {
      return;
    }

    const data = {
      session,
      question_id: questionData.question_id,
      answer,
    };

    setIsSubmitting(true);

    const checkAnswerRequest = await fetch("/api/answer/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const checkAnswerResponse = await checkAnswerRequest.json();

    if (!checkAnswerRequest.ok) {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      setIsCorrect(false);
      setIsIncorrect(false);
      setIsSubmitting(false);
      return;
    }

    if (checkAnswerResponse.correct) {
      setIsCorrect(true);
      setIsIncorrect(false);
      setAnswer("");
      setIsSubmitting(false);
      mutate(`/api/questions/get?cid=${courseId}&cs=${session}`);
      mutate(`/api/courses/progress?cid=${courseId}&cs=${session}`);
    } else {
      setIsCorrect(false);
      setIsIncorrect(true);
      setCorrectAnswer(checkAnswerResponse.correctAnswer);
      setIsSubmitting(false);
    }
  };

  const getNewQuestion = () => {
    setIsCorrect(false);
    setIsIncorrect(false);
    setCorrectAnswer("");
    setAnswer("");
    mutate(`/api/questions/get?cid=${courseId}&cs=${session}`);
    mutate(`/api/courses/progress?cid=${courseId}&cs=${session}`);
  };

  return (
    <div className="flex flex-col min-h-full justify-center items-center">
      <motion.div
        className={`relative p-6 rounded-lg shadow-sm md:w-[120vw] max-w-lg w-full border-b border-gray-200`}
        initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
        animate={{
          boxShadow: isCorrect
            ? "0px 0px 50px rgba(0, 255, 0, 0.4)"
            : isIncorrect
            ? "0px 0px 50px rgba(255, 0, 0, 0.4)"
            : "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.5 }}
      >
        {getQuestionIsLoading &&
        !questionData &&
        !courseProgress &&
        getCourseProgressIsLoading ? (
          <div>Loading...</div>
        ) : (
          <div key={questionData.question_id}>
            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm max-w-xs line-clamp-2">
                {questionData.category}
              </div>
              <div className="text-gray-500 text-sm">
                {parseInt(courseProgress?.answeredQuestions)} /{" "}
                {parseInt(courseProgress?.totalQuestions)} Fragen
              </div>
            </div>
            <div className="text-lg font-semibold mt-2 max-w-lg">
              {questionData.question}
            </div>
            <textarea
              autoFocus
              disabled={isSubmitting || !!correctAnswer}
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Deine Antwort..."
              className="w-full mt-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {correctAnswer && (
              <div className="mt-4">
                <div className="text-red-500">Richtige Antwort:</div>
                <div>{correctAnswer}</div>
              </div>
            )}
            <div className="flex justify-center mt-4">
              {correctAnswer ? (
                <SimpleButtonWithLoader
                  text="Nächste Frage"
                  onClick={getNewQuestion}
                  isLoading={isSubmitting}
                />
              ) : (
                <SimpleButtonWithLoader
                  text="Antwort abschicken"
                  onClick={submitAnswer}
                  isLoading={isSubmitting}
                />
              )}
            </div>
            {!correctAnswer && (
              <>
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center mt-4">
                    <span className="bg-slate-100 px-2 text-sm text-gray-500">
                      Mehr Aktionen &darr;
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <SimpleButtonWithLoaderSmall
                    text="Neue Frage"
                    onClick={getNewQuestion}
                    isLoading={false}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <AnimatePresence>
          {isCorrect && <Checkmark />}
          {isIncorrect && <Cross />}
        </AnimatePresence>
      </motion.div>
      {/* small hint */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Drücke <kbd>Strg</kbd> + <kbd>Enter</kbd> um die Antwort abzuschicken
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">
        In dieser Session hast du {parseInt(courseProgress?.correctAnswers)}{" "}
        richtige und {parseInt(courseProgress?.incorrectAnswers)} falsche
        Antworten gegeben.
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
