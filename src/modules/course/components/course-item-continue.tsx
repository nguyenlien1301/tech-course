"use client";
import Image from "next/image";
import Link from "next/link";

import { IconEye, IconStar } from "@/shared/components/icons";
import { formatCurrency, formatNumberToK } from "@/shared/helper";
import { CourseItemData } from "@/shared/types";

import CourseItemDuration from "./course-item-duration";

interface CourseItemContinueProps {
  data: CourseItemData;
  cta?: string;
  url?: string;
  layout: string;
}
const CourseItemContinue = ({
  cta = "Xem chi tiết",
  data,
  layout,
  url = "",
}: CourseItemContinueProps) => {
  // courseUrl: dùng 2 đường dẫn, 1 đường url là bên khu vực học tập để click vào trang bài học. còn đường dẫn kia là bên khám phá click vào trang chi tiết
  const courseUrl = url || `/course/${data.slug}`;
  const courseInfo = [
    {
      title: formatNumberToK(data.views),
      icon: <IconEye className="size-4" />,
    },
    {
      title: 5,
      icon: <IconStar className="size-4" />,
    },
  ];

  const isNew = (createdAt: Date | string) => {
    const days =
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);

    return days <= 15; // nhỏ hơn 7 ngày thì hiện New
  };

  if (layout === "row") {
    return (
      <div className="borderDarkMode bgDarkMode flex gap-5 rounded-2xl p-4">
        <Link className="relative block aspect-square h-32" href={courseUrl}>
          {!!data.image && (
            <Image
              alt="image"
              className="size-full rounded-lg object-cover"
              height={400}
              priority={true}
              sizes="@media (min-width: 640px) 300px, 100vw"
              src={data.image}
              width={600}
            />
          )}
        </Link>
        <div className="flex flex-1 flex-col">
          <h3 className="mb-3 text-base font-bold">{data.title}</h3>
          <div className="mt-auto">
            <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
              {courseInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 dark:text-graySlate"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              ))}
              <CourseItemDuration slug={data.slug} />
            </div>
            <div className="flex gap-3">
              {isNew(data.created_at) && (
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white">
                  Mới
                </span>
              )}
              {data.price !== 0 && (
                <span className="inline-block rounded-full bg-[#2c8fff] px-3 py-1 text-xs font-medium text-white">
                  Miễn phí
                </span>
              )}
            </div>
          </div>
          <Link
            className="btn hover-bg-btn-opacity mb-0 ml-auto mt-auto w-max px-5 text-sm font-bold"
            href={courseUrl}
          >
            {cta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-grayDark">
      <Link className="relative block h-[180px]" href={courseUrl}>
        {!!data.image && (
          <Image
            alt="image"
            className="size-full rounded-lg object-cover"
            height={400}
            priority={true}
            sizes="@media (min-width: 640px) 300px, 100vw"
            src={data.image}
            width={600}
          />
        )}

        <div className="z-2 absolute right-3 top-3 flex gap-3">
          {isNew(data.created_at) && (
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white">
              Mới
            </span>
          )}
          {data.price === 0 && (
            <span className="inline-block rounded-full bg-[#2c8fff] px-3 py-1 text-xs font-medium text-white">
              Khoá học miễn phí
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="mb-3 text-lg font-bold">{data.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
            {courseInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 dark:text-graySlate"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
            <CourseItemDuration slug={data.slug} />
            <span className="ml-auto rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-secondary">
              {formatCurrency(data.price)} đ
            </span>
          </div>
          <Link className="btn hover-bg-btn-opacity mt-10" href={courseUrl}>
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItemContinue;
