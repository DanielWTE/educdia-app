import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Not finished courses
export async function GET(req: NextRequest) {
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

    const sessions = await prisma.course_sessions.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        course_progresses: true,
        courses: {
          include: {
            categories: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    // Filter only courses that are not finished
    const unfinishedCourses = sessions
      .filter((session) => {
        const totalQuestions = session.courses.categories.reduce(
          (acc, category) => acc + category.questions.length,
          0
        );
        const answeredQuestions = session.course_progresses.length;
        return answeredQuestions < totalQuestions;
      })
      .map((session) => {
        const totalQuestions = session.courses.categories.reduce(
          (acc, category) => acc + category.questions.length,
          0
        );
        const answeredQuestions = session.course_progresses.length;

        return {
          course_id: session.course_id,
          name: session.courses.name,
          description: session.courses.description,
          totalQuestions: totalQuestions,
          answeredQuestions: answeredQuestions,
          session: session.session,
        };
      });

    return NextResponse.json({
      message: "Unfinished courses fetched",
      data: unfinishedCourses,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error: true },
      { status: 500 }
    );
  }
}
