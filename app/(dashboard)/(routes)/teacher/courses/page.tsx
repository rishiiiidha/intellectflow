import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
     
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Create a New Course</h3>
        <Link href="/teacher/create">
          <Button>New Course</Button>
        </Link>
      </div>
    </div>
  );
};

export default CoursesPage;
