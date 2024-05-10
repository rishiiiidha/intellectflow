"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";

interface ChapterDescriptionFormProps {
  initialData: Chapter
  courseId: string;
  chapterId :string,
}
const formSchema = z.object({
  description: z.string().min(1)
});
export const ChapterDescriptionForm = ({ initialData, courseId ,chapterId}: ChapterDescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || "" },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter description updated");
      toggleEditing();
      router.refresh()
    }
    catch (error) {
      router.refresh()
    }
  };
 return (
   <div className="mt-6 border bg-slate-100 rounded-md p-4">
     <div className="font-medium flex items-center justify-between">
       Chapter description
       <Button onClick={toggleEditing} variant="ghost">
         {isEditing ? (
           <>Cancel</>
         ) : (
           <>
             <Pencil className="h-4 w-4 mr-2" />
             Edit description
           </>
         )}
       </Button>
     </div>

     {!isEditing && (
       <div
         className={cn(
           "text-sm mt-2",
           !initialData.description && "text-slate-500 italic"
         )}
       >
         {!initialData.description && "No description"}
         {initialData.description && (
           <Preview value={initialData.description} />
         )}
       </div>
     )}
     {isEditing && (
       <Form {...form}>
         <form
           onSubmit={form.handleSubmit(onSubmit)}
           className="space-y-4 mt-4"
         >
           <FormField
             name="description"
             control={form.control}
             render={({ field }) => (
               <FormItem>
                 <FormControl>
                   <Textarea
                     {...field}
                     placeholder="Add a description"
                     rows={4}
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           <div className="flex items-center gap-x-2">
             <Button type="submit" disabled={!isValid || isSubmitting}>
               Save
             </Button>
           </div>
           
         </form>
       </Form>
     )}
   </div>
 );
};
