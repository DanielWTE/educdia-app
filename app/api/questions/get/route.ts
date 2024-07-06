import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("cid");
  const courseSession = req.nextUrl.searchParams.get("cs");
  if (!courseId) {
    return NextResponse.json(
      { message: "Please provide a course id", error: true },
      { status: 400 }
    );
  }

  try {
    const session = await getKindeServerSession(req);
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { message: "You are not authenticated", error: true },
        { status: 401 }
      );
    }

    const course = await prisma.courses.findUnique({
      where: {
        course_id: Number(courseId),
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found", error: true },
        { status: 404 }
      );
    }

    const data = await prisma.categories.findMany({
      where: {
        course_id: course.course_id,
      },
      include: {
        questions: true,
      },
    });

    const questions = data.flatMap((category: any) =>
      category.questions.map((question: any) => ({
        ...question,
        category: category.name,
      }))
    );

    if (questions.length === 0) {
      return NextResponse.json(
        { message: "No questions found for this course", error: true },
        { status: 404 }
      );
    }

    const user = await session.getUser();
    if (!user) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 }
      );
    }

    let randomQuestion;

    if (courseSession) {
      const courseSessionData = await prisma.course_sessions.findUnique({
        where: {
          session: courseSession,
          user_id: user.id,
        },
      });

      if (courseSessionData) {
        const answeredQuestions = await prisma.course_progresses.findMany({
          where: {
            session_id: courseSessionData.course_session_id,
          },
        });

        const answeredQuestionIds = answeredQuestions.map(
          (answeredQuestion) => answeredQuestion.question_id
        );

        const unansweredQuestions = questions.filter(
          (question) => !answeredQuestionIds.includes(question.question_id)
        );

        if (unansweredQuestions.length === 0) {
          return NextResponse.json(
            { message: "No questions left to answer", error: true },
            { status: 404 }
          );
        }

        randomQuestion =
          unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
      } else {
        // If the session is not found, just return a random question
        randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      }
    } else {
      // If there's no session, just return a random question
      randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    }

    return NextResponse.json({
      message: "Question found",
      data: {
        question_id: randomQuestion.question_id,
        question: randomQuestion.question,
        category: randomQuestion.category,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error: true },
      { status: 500 }
    );
  }
}