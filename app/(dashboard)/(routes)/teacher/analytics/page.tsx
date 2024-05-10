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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
        <DataTable columns={columns} data={courses} />
      </div>
    
  );
};

export default CoursesPage;
