import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getKindeServerSession(req);
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { message: "You are not authenticated", error: true },
        { status: 401 }
      );
    }

    const courses = await prisma.courses.findMany();

    const formattedCourses = courses.map((course: any) => {
      return {
        course_id: course.course_id,
        name: course.name,
        description: course.description,
      };
    });

    return NextResponse.json({
      message: "Courses fetched",
      data: formattedCourses,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error: true },
      { status: 500 }
    );
  }
}
