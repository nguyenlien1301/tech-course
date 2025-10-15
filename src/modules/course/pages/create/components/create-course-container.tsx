"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { z } from "zod";

import { useMutationCreateCourse } from "@/modules/course/libs";
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
import { useUserContext } from "@/shared/contexts";

const formSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên khoá học không được bỏ trống" })
    .min(5, { message: "Tên khoá học phải ít nhất 5 kí tự" }),
  slug: z.string().optional(),
});

// zodResolver: là để gàn buộc những tham số trong formSchema (title và slug)
function CreateCourseContainer() {
  const mutationCreateCourse = useMutationCreateCourse();
  const { userInfo } = useUserContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userInfo) return;
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
            remove: /[!"'()*+:@~]/g,
          }),
        // author: user._id: này là id của user
        author: userInfo._id,
      };
      const hasResult = await mutationCreateCourse.mutateAsync(data);

      if (!hasResult?.success) {
        toast.warning(hasResult?.message);

        return;
      }
      if (hasResult?.success) {
        toast.success(hasResult.message);
        router.push(`/manage/course/update?slug=${hasResult.data.slug}`);
      }
    } catch (error) {
      console.log("🚀error onSubmit course-add-new ---->", error);
    }
  }

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khoá học *</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khoá học" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khoá học</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-[120px]"
          disabled={mutationCreateCourse.isPending}
          isLoading={mutationCreateCourse.isPending}
          type="submit"
          variant="primary"
        >
          Tạo khoá học
        </Button>
      </form>
    </Form>
  );
}

export default CreateCourseContainer;
