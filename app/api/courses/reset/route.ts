import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Reset one course
export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("cid");
  const courseSession = req.nextUrl.searchParams.get("cs");
  try {
    if (!courseId) {
      return NextResponse.json(
        { message: "Please provide a course id", error: true },
        { status: 400 }
      );
    }

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

    const courseSessionData = await prisma.course_sessions.findFirst({
      where: {
        course_id: Number(courseId),
        session: courseSession as string,
        user_id: user.id,
      },
    });

    if (!courseSessionData) {
      return NextResponse.json(
        { message: "Course session not found", error: true },
        { status: 404 }
      );
    }

    // delete in course_progresses
    await prisma.course_progresses.deleteMany({
      where: {
        session_id: courseSessionData.course_session_id,
      },
    });

    // delete in course_sessions
    await prisma.course_sessions.delete({
      where: {
        course_session_id: courseSessionData.course_session_id,
      },
    });

    return NextResponse.json({
      message: "Course progress reset",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error: true },
      { status: 500 }
    );
  }
}
