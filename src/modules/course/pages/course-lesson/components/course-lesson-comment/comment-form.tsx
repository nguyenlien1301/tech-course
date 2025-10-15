"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useMutationCreateComment } from "@/modules/comment/libs";
import { courseCommentFormSchema } from "@/modules/course/schemas";
import { CourseCommentFormValues } from "@/modules/course/types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from "@/shared/components/ui";
import { useUserContext } from "@/shared/contexts";
import { CommentItemData } from "@/shared/types";

interface CommentFormProps {
  // comment: này ko bắt buộc vì khi tạo lần đầu tiên thì nó chưa có comment, nếu để bắt buộc thì nó sẽ lỗi vì nó ko biết lấy comment ở đâu.
  comment?: CommentItemData;
  lessonId: string;
  isReply?: boolean;
  closeReply?: () => void;
}

const CommentForm = ({
  closeReply,
  comment,
  isReply,
  lessonId,
}: CommentFormProps) => {
  const muationCreateComment = useMutationCreateComment();
  const [isPending, startTransition] = useTransition();
  const { userInfo } = useUserContext();
  const userId = userInfo?._id.toString() || "";
  const pathname = usePathname();
  const slug = useSearchParams().get("slug");
  const path = `${pathname}?slug=${slug}`;
  const commentForm = useForm<CourseCommentFormValues>({
    resolver: zodResolver(courseCommentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: CourseCommentFormValues) {
    try {
      const hasResult = await muationCreateComment.mutateAsync({
        content: values.content,
        user: userId,
        lesson: lessonId,
        // Nếu có comment.level thì comment.level sẽ tăng lên là level 1, reply lần nữa sẽ là 2 và ngc lại ko có thì sẽ là 0
        // TypeScript narrowing
        level: comment && comment?.level >= 0 ? comment?.level + 1 : 0,
        // parentId: chính ra id của comment đó
        parentId: comment?._id,
        path,
      });

      startTransition(() => {
        if (!hasResult) {
          toast.error("Đăng bình luận thất bại");

          return;
        }
        toast.success("Đăng bình luận thành công");
        commentForm.setValue("content", "");
        closeReply?.();
      });
    } catch (error) {
      console.log("🚀error onSubmit CommentForm ---->", error);
    }
  }

  return (
    <Form {...commentForm}>
      <form
        autoComplete="off"
        className="mt-5 flex flex-col gap-5"
        onSubmit={commentForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={commentForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className={isReply ? "min-h-[100px]" : "min-h-[150px]"}
                  placeholder="Nhập bình luận..."
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <Button
          className="ml-auto w-[140px]"
          isLoading={isPending}
          type="submit"
          variant="primary"
        >
          {isReply ? "Trả lời bình luận" : "Đăng bình luận"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
