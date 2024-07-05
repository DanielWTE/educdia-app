import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('id');
  if (!courseId) {
    return NextResponse.json({ message: 'Please provide a course id', error: true }, { status: 400 });
  }

  try {
    const session = getKindeServerSession(req);
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { message: "You are not authenticated", success: false, error: true },
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
        { message: "Course not found", success: false, error: true },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Course found",
      success: true,
      data: {
        course_id: course.course_id,
        name: course.name,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", success: false, error: true },
      { status: 500 }
    );
  }
}
