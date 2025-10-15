"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useMutationCreateCoupon } from "@/modules/coupon/libs";
import { couponCreateSchema } from "@/modules/coupon/schemas";
import { CouponCreateFormValues } from "@/modules/coupon/types";
import { fetchAllCoursesPublic } from "@/modules/course/actions";
import { IconCalendar, IconClose } from "@/shared/components/icons";
import {
  Button,
  Calendar,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputFormatCurrency,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@/shared/components/ui";
import { CouponType, couponTypes } from "@/shared/constants";
import { CourseItemData } from "@/shared/types";

const CreateCouponContainer = () => {
  const mutationCreateCoupon = useMutationCreateCoupon();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [findCourse, setFindCourse] = useState<CourseItemData[] | undefined>(
    [],
  );
  const [selectedCourses, setSelectedCourses] = useState<CourseItemData[]>([]);
  const form = useForm<CouponCreateFormValues>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      title: "",
      code: "",
      start_date: "",
      end_date: "",
      active: true,
      value: "0",
      limit: 0,
      type: CouponType.PERCENT,
      courses: [],
    },
  });

  async function onSubmit(values: CouponCreateFormValues) {
    const couponType = values.type;
    const couponValue = Number(values.value?.replace(/,/g, ""));

    if (
      (couponType === CouponType.PERCENT && couponValue > 100) ||
      couponValue < 0
    ) {
      form.setError("value", {
        message: "Giá trị không hợp lệ",
      });
    }
    await mutationCreateCoupon.mutateAsync({
      ...values,
      value: couponValue,
      start_date: startDate,
      end_date: endDate,
      courses: selectedCourses.map((course) => course._id),
    });

    // if (newCoupon.code) {
    //   router.push("/manage/coupon");
    // }
  }

  //   handleSearchCourse: hàm để tìm khoá học
  const handleSearchCourse = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      //   khi search trong input tìm khoá học lấy event.target.value bỏ vào hàm fetchAllCourses truyền vào key search là sẽ ra
      const courseList = await fetchAllCoursesPublic({ search: value });

      setFindCourse(courseList);
      if (!value) setFindCourse([]);
    },
    300,
  );

  const handleSelectCourse = (
    checked: boolean | string,
    course: CourseItemData,
  ) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course]);
    } else {
      setSelectedCourses((prev) =>
        prev.filter((item) => item._id !== course._id),
      );
    }
  };
  //  form.watch: theo dõi sự thay đổi của type
  const couponTypeWatch = form.watch("type");

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    className="font-bold"
                    placeholder="Mã giảm giá"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full bg-white dark:bg-grayDark"
                        variant={"outline"}
                      >
                        <IconCalendar className="mr-2 size-4" />
                        {startDate ? (
                          format(startDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full bg-white dark:bg-grayDark"
                        variant={"outline"}
                      >
                        <IconCalendar className="mr-2 size-4" />
                        {endDate ? (
                          format(endDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    className="flex gap-5"
                    defaultValue={CouponType.PERCENT}
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((item) => (
                      <div
                        key={item.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem id={item.value} value={item.value} />
                        <Label className="cursor-pointer" htmlFor={item.value}>
                          {item.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  {couponTypeWatch === CouponType.PERCENT ? (
                    <Input
                      placeholder="50%"
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  ) : (
                    <InputFormatCurrency
                      {...field}
                      placeholder="100"
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khoá học..."
                      onChange={handleSearchCourse}
                    />
                    {!!findCourse && findCourse.length > 0 && (
                      <div className="!mt-5 flex flex-col gap-3">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              checked={selectedCourses.some(
                                (item) => item._id === course._id,
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                              //   checked Nếu cái mình chọn some chỉ cần 1 điều kiện đúng là đc
                            />
                            <div>{course.title}</div>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="!mt-5 flex flex-wrap items-start gap-2">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="borderDarkMode bgDarkMode inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <IconClose className="size-5 text-gray-500 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="ml-auto flex w-[150px]" variant="primary">
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default CreateCouponContainer;
