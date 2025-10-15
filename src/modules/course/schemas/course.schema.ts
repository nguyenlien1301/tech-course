import { z } from "zod";

export const courseCommentFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Vui lòng nhập vào nội dung bình luận" })
    .min(10, { message: "Nội dung ít nhất phải 10 kí tự" }),
});
