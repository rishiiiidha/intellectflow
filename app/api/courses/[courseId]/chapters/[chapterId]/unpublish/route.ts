import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      chapterId: string;
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[chapter unpublish ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
