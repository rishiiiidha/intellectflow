import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16 ">
      <h1 className="text-3xl font-bold mb-8">
        Welcome to the Learning Management System
      </h1>
      <p className="text-lg text-center mb-8">
        This project is a management system where teachers upload courses and
        manage them within the learning management system.
      </p>
      
    </div>
  );
}
