import Image from "next/image";
import React from "react";

import PageNotFound from "@/app/not-found";
import { getCourseLessonInfo } from "@/modules/course/actions";
import { CourseOutline } from "@/shared/components/course";
import { CourseStatus } from "@/shared/constants";
import { courseLevelTitle } from "@/shared/constants/course-constant";
import { formatMinutesToHour, formatNumberToK } from "@/shared/helper";
import { CourseItemData } from "@/shared/types";
import { CourseLessonData, CourseQAData } from "@/shared/types/course.type";

import BenefitItem from "./benefit-item";
import CourseWidget from "./course-widget";
import QaItem from "./qa-item";
import RatingItem from "./rating-item";
import RequirementItem from "./requirement-item";
import SectionInfoItem from "./section-info-item";
import SectionItem from "./section-item";

interface CourseDetailsContainerProps {
  courseDetails: CourseItemData | undefined;
  userId?: string | null;
}
const CourseDetailsContainer = async ({
  courseDetails,
}: CourseDetailsContainerProps) => {
  const isEmptyData =
    !courseDetails || courseDetails.status !== CourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;

  const lessonInfo: CourseLessonData = (await getCourseLessonInfo({
    slug: courseDetails.slug,
  })) || { duration: 0, lessons: 0 };
  //videoId:  .split("v="): Tách chuỗi URL thành mảng bằng cách dùng "v=" làm dấu cắt.
  //videoId: [1]: lấy phần sau dấu v=, chính là videoId.
  const videoId = courseDetails.intro_url?.split("v=")[1];
  const ratings = courseDetails.rating.map((item) => item.content);
  const requirements = courseDetails.info.requirements || [];
  const benefits = courseDetails.info.benefits || [];
  const questionAnswers = courseDetails.info.qa || [];
  const courseDetailsMeta: { title: string; content: React.ReactNode }[] = [
    {
      title: "Bài học",
      content: lessonInfo.lessons,
    },
    {
      title: "Lượt xem",
      content: formatNumberToK(courseDetails.views),
    },
    {
      title: "Trình độ",
      content: courseLevelTitle[courseDetails.level],
    },
    {
      title: "Thời lượng",
      content: formatMinutesToHour(lessonInfo.duration),
    },
  ];
  const courseDetailsInfo: { title: string; content: React.ReactNode }[] = [
    {
      title: "Mô tả khoá học",
      content: <div className="leading-normal">{courseDetails.desc}</div>,
    },
    {
      title: "Thông tin khoá học",
      content: (
        <div className="mb-10 grid grid-cols-4 gap-5">
          {courseDetailsMeta.map((item) => (
            <SectionInfoItem key={item.title} title={item.title}>
              {item.content}
            </SectionInfoItem>
          ))}
        </div>
      ),
    },
    {
      title: "Nội dung khoá học",
      content: <CourseOutline lectures={courseDetails.lectures} />,
    },
    {
      title: "Yêu cầu",
      content: requirements.map((item) => (
        <RequirementItem key={item} title={item} />
      )),
    },
    {
      title: "Lợi ích",
      content: benefits.map((item) => <BenefitItem key={item} title={item} />),
    },
    {
      title: "Câu hỏi/Câu trả lời",
      content: questionAnswers.map((item: CourseQAData) => (
        <QaItem key={item.question} item={item} />
      )),
    },
  ];

  return (
    <div className="grid min-h-screen items-start gap-10 lg:grid-cols-[2fr,1fr]">
      <div>
        <div className="relative aspect-video">
          {courseDetails.intro_url ? (
            <>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="size-full object-fill"
                height="480"
                src={`https://www.youtube.com/embed/${videoId}`}
                width="853"
              />
            </>
          ) : (
            <Image
              alt="image"
              className="size-full rounded-lg object-cover"
              fill
              src={courseDetails?.image}
            />
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {ratings.map((rating, index) => (
            <RatingItem key={index} rating={rating} />
          ))}
        </div>
        <h1 className="my-5 text-3xl font-bold">{courseDetails.title}</h1>
        {courseDetailsInfo.map((item) => (
          <SectionItem key={item.title} title={item.title}>
            {item.content}
          </SectionItem>
        ))}
      </div>
      <CourseWidget
        data={courseDetails}
        duration={formatMinutesToHour(lessonInfo.duration)}
      />
    </div>
  );
};

export default CourseDetailsContainer;
