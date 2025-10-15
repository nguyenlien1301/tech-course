import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui";
import { HistoryItemData, LectureItemData } from "@/shared/types";

import CourseOutlineItem from "./course-outline-item";

interface CourseOutlineProps {
  lectures: LectureItemData[];
  course?: string;
  lessonId?: string;
  histories?: HistoryItemData[];
}
const CourseOutline = ({
  course = "",
  histories = [],
  lectures = [],
  lessonId = "",
}: CourseOutlineProps) => {
  return (
    <div className="flex flex-col gap-2">
      {lectures.map((lecture) => (
        <Accordion key={lecture._id} collapsible type="single">
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between gap-3 pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none !bg-transparent p-0">
              <div className="flex flex-col gap-2">
                {lecture.lessons.map((lesson) => (
                  <CourseOutlineItem
                    key={lesson._id}
                    isActive={lessonId ? lessonId === lesson._id : false}
                    lesson={JSON.parse(JSON.stringify(lesson))}
                    url={course ? `/${course}/lesson?id=${lesson._id}` : ""}
                    // isChecked: đoạn này là dùng some(Kiểm tra có phần tử nào thoả điều kiện => boolean) để map histories ra và trong histories có lesson <=> lessonId so sánh với lesson._id có bằng nhau ko. Nếu = thì sẽ checked
                    isChecked={histories?.some(
                      (item) =>
                        item.lesson.toString() === lesson._id.toString(),
                    )}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default CourseOutline;
