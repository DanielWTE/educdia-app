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

    const user = await session.getUser();
    if (!user) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 }
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

    let totalQuestions = questions.length;
    let answeredQuestions = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // get state ids for "correct" and "incorrect"
    const correctState = await prisma.course_progress_states.findFirst({
      where: {
        name: "correct",
      },
    });

    if (!correctState) {
      return NextResponse.json(
        { message: "State not found", error: true },
        { status: 404 }
      );
    }

    const incorrectState = await prisma.course_progress_states.findFirst({
      where: {
        name: "incorrect",
      },
    });

    if (!incorrectState) {
      return NextResponse.json(
        { message: "State not found", error: true },
        { status: 404 }
      );
    }

    if (courseSession) {
      const courseSessionData = await prisma.course_sessions.findUnique({
        where: {
          session: courseSession,
          user_id: user.id,
        },
      });

      if (courseSessionData) {
        const answeredQuestionsData = await prisma.course_progresses.findMany({
          where: {
            session_id: courseSessionData.course_session_id,
          },
        });

        answeredQuestions = answeredQuestionsData.length;

        answeredQuestionsData.forEach((answeredQuestion) => {
          if (
            answeredQuestion.state_id === correctState.course_progress_state_id
          ) {
            correctAnswers++;
          } else if (
            answeredQuestion.state_id ===
            incorrectState.course_progress_state_id
          ) {
            incorrectAnswers++;
          }
        });
      }
    }

    return NextResponse.json({
      message: "Course progress fetched",
      data: {
        totalQuestions: totalQuestions,
        answeredQuestions: answeredQuestions,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
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
