"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
/* eslint-enable simple-import-sort/imports */
import Link from "next/link";
/* eslint-disable simple-import-sort/imports */
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import type { Editor as TinyMCEEditor } from "tinymce";
import { z } from "zod";

import { updateLesson } from "@/modules/lesson/actions";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/components/ui";
import { editorOptions } from "@/shared/constants";
import { LessonItemData } from "@/shared/types";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

// zodResolver: là để gàn buộc những tham số trong formSchema (title và slug)
interface LessonItemUpdateProps {
  lesson: LessonItemData;
  lectureId: string;
  courseId: string;
}
function OutlineItem({ courseId, lectureId, lesson }: LessonItemUpdateProps) {
  const editorRef = useRef<unknown>(null);
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const hasResult = await updateLesson({
        lessonId: lesson._id,
        lectureId,
        courseId,
        updateData: {
          slug: slugify(values.slug || "", {
            lower: true,
            locale: "vi",
            remove: /[!"'()*+:@~]/g,
          }),
          duration: values.duration,
          video_url: values.video_url,
          content: values.content,
        },
      });

      if (hasResult?.success) {
        toast.success("Cập nhật khoá học thành công");
      }
    } catch (error) {
      console.log("🚀error onSubmit course-add-new ---->", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn bài học</FormLabel>
                <FormControl>
                  <Input placeholder="bài-1-tong-quan-khoa-hoc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input
                    placeholder="30 phút"
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn video</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/abcdxyz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    value={field.value}
                    onInit={(_event, editor: TinyMCEEditor) => {
                      (editorRef.current = editor).setContent(
                        lesson.content || "",
                      );
                    }}
                    {...editorOptions(field, theme)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 flex items-center justify-end gap-5">
          <Button
            className="w-[120px]"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Cập nhật
          </Button>
          <Link className="text-sm text-slate-600" href="/">
            Xem trước
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default OutlineItem;
