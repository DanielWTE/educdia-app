import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("cid");
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

    const questions = data.flatMap((category) => 
      category.questions.map((question) => ({
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

    // get a random question from the list
    // TODO: don't repeat questions for the same user run session
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

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