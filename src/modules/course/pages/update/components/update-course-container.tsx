"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { z } from "zod";

import { useMutationUpdateCourse } from "@/modules/course/libs";
import { IconAdd } from "@/shared/components/icons";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/components/ui";
import { Courselevel, CourseStatus } from "@/shared/constants";
import { courseLevel, courseStatus } from "@/shared/constants/course-constant";
import { CourseItemData } from "@/shared/types";
import { UploadButton } from "@/shared/utils/uploadthing";

const formSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên khoá học không được bỏ trống" })
    .min(5, { message: "Tên khoá học phải ít nhất 5 kí tự" }),
  slug: z.string().optional(),
  desc: z.string().optional(),
  price: z.number().int().optional(),
  sale_price: z.number().int().optional(),
  intro_url: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([CourseStatus.APPROVED, CourseStatus.PENDING, CourseStatus.REJECTED])
    .optional(),
  level: z
    .enum([
      Courselevel.ADVANCED,
      Courselevel.BEGINNER,
      Courselevel.INTERMEDIATE,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

// zodResolver: là để gàn buộc những tham số trong formSchema (title và slug)
function UpdateCourseContainer({ course }: { course: CourseItemData }) {
  const mutationUpdateCourse = useMutationUpdateCourse();
  const router = useRouter();
  //   Vấn deè là trong courseInfo nó là một object và trong object đó có những property và trong property đó là. một mảng string và  mảng object nữa nên khá phức tạp.
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qa: course.info.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      price: course.price,
      sale_price: course.sale_price,
      desc: course.desc,
      intro_url: course.intro_url,
      image: course.image,
      views: course.views,
      status: course.status,
      level: course.level,
      info: {
        requirements: courseInfo.requirements,
        benefits: courseInfo.benefits,
        qa: courseInfo.qa,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const hasResult = await mutationUpdateCourse.mutateAsync({
      slug: course.slug,
      updateData: {
        title: values.title,
        slug: values.slug,
        price: values.price,
        sale_price: values.sale_price,
        intro_url: values.intro_url,
        desc: values.desc,
        views: values.views,
        status: values.status,
        level: values.level,
        image: values.image,
        info: {
          requirements: courseInfo.requirements,
          benefits: courseInfo.benefits,
          qa: courseInfo.qa,
        },
      },
    });

    if (values.slug !== course.slug) {
      router.replace(`/manage/course/update?slug=${values.slug}`);
    }
    if (hasResult?.success) {
      toast.success(hasResult.message);
    }
  }
  const imageWatch = form.watch("image");

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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="599.000"
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
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    placeholder="999.000"
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
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khoá học</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập nội dung..."
                    {...field}
                    className="h-[250px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <>
                    <div className="relative h-[250px] rounded-md border border-gray-200 bg-white">
                      {!!imageWatch && (
                        <Image
                          alt="poster"
                          className="size-full rounded-md object-cover"
                          fill
                          src={imageWatch}
                        />
                      )}
                    </div>
                    <UploadButton
                      endpoint="imageUploader"
                      appearance={{
                        button:
                          "bg-[#2c8fff] hover:bg-[#2c8fff]/40 text-white font-medium",
                        allowedContent: "text-gray-400 dark:text-white",
                      }}
                      onClientUploadComplete={(response) => {
                        // Do something with the response
                        form.setValue(
                          "image",
                          response[0].ufsUrl || response[0].url,
                        );
                        console.log("Files:", response);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        console.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn video</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/abcxyz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.requirements"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <span>Yêu cầu</span>
                  {/* draft: là bản sao thạm thời nó giống như giá trị prev vậy */}
                  {/* Khi nhấn sẽ thêm một chuỗi rỗng vào requirements giúp hiện 1 ô input mới */}
                  {/* Để có giá trị cộng dồn khi dùng state thì phải prev state. setState((prev)=> prev) */}
                  {/* Khi nhấn onclick sẽ setCourseInfo , dùng useImmer sẽ ko cần lo vấn đè prev state dùng thẳng  draft.requirements.push(""); luôn vào 1 mảng*/}
                  {/* draft.requirements.push(""): darft sẽ là prev gọi đến requiment là push từng giá trị vào requiment */}
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() =>
                      setCourseInfo((draft) => {
                        draft.requirements.push("");
                      })
                    }
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Yêu cầu số ${index + 1}`}
                        value={item}
                        // Dùng setCourseInfo: và draft.requiment tại vị trí index
                        onChange={(event) =>
                          setCourseInfo((draft) => {
                            draft.requirements[index] = event.target.value;
                          })
                        }
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.benefits"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <span>Lợi ích</span>
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() =>
                      setCourseInfo((draft) => {
                        draft.benefits.push("");
                      })
                    }
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Lợi ích số ${index + 1}`}
                        value={item}
                        onChange={(event) =>
                          setCourseInfo((draft) => {
                            draft.benefits[index] = event.target.value;
                          })
                        }
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.qa"
            render={() => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between">
                  <span>Câu hỏi/Câu trả lời</span>
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() =>
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: "",
                          answer: "",
                        });
                      })
                    }
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder={`Câu hỏi số ${index + 1}`}
                          value={item.question}
                          onChange={(event) =>
                            setCourseInfo((draft) => {
                              draft.qa[index].question = event.target.value;
                            })
                          }
                        />
                        <Input
                          placeholder={`Câu trả lời số ${index + 1}`}
                          value={item.answer}
                          onChange={(event) =>
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = event.target.value;
                            })
                          }
                        />
                      </div>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-[150px]"
          disabled={mutationUpdateCourse.isPending}
          isLoading={mutationUpdateCourse.isPending}
          type="submit"
          variant="primary"
        >
          Cập nhật khoá học
        </Button>
      </form>
    </Form>
  );
}

export default UpdateCourseContainer;
