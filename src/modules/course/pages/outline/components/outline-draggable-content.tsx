import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";

import { updateLesson, updateLessonOrder } from "@/modules/lesson/actions";
import {
  IconCancel,
  IconCheckCircle,
  IconDelete,
  IconEdit,
} from "@/shared/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
} from "@/shared/components/ui";
import { LectureItemData, LessonItemData } from "@/shared/types";

import OutlineAction from "./outline-action";
import OutlineDraggableHandle from "./outline-draggable-handle";
import OutlineDraggableItem from "./outline-draggable-item";
import OutlineItem from "./outline-item";

interface OutlineDraggableContentProps {
  lessonEdit: string;
  setLessonEdit: (value: string) => void;
  lessonIdEdit: string;
  lecture: LectureItemData;
  setLessonIdEdit: Dispatch<SetStateAction<string>>;
  courseSlug: string;
  id: string;
  courseId: string;
  //   lessons: LessonItemData[];
}

const OutlineDraggableContent = ({
  courseId,
  courseSlug,
  id,
  lecture,
  lessonEdit,
  //   lessons,
  lessonIdEdit,
  setLessonEdit,
  setLessonIdEdit,
}: OutlineDraggableContentProps) => {
  const [lessonList, setLessonList] = useState<LessonItemData[]>([]);
  // Ham cập nhật bài học
  const handleUpdateLesson = async (
    event: React.MouseEvent<HTMLSpanElement>,
    lectureId: string,
    courseId: string,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      const hasResult = await updateLesson({
        lectureId,
        courseId,
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[!"'()*+:@~]/g,
          }),
        },
        path: `/manage/course/update-content?slug=${courseSlug}`,
      });

      if (hasResult?.success) {
        toast.success("Cập nhật tiêu đề bài học thành công");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {
      console.log("🚀error handleUpdateLesson ---->", error);
    }
  };

  //   Hàm xoá bài học
  const handleDeleteLesson = (
    event: React.MouseEvent<HTMLSpanElement>,
    lectureId: string,
    courseId: string,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      Swal.fire({
        title: "Bạn có muốn xoá không?",
        text: "Bạn sẽ không thể hoàn tác đều này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Huỷ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasResult = await updateLesson({
            lectureId,
            courseId,
            lessonId,
            updateData: {
              _destroy: true,
            },
            path: `/manage/course/update-content?slug=${courseSlug}`,
          });

          if (hasResult?.success) {
            toast.success("Xoá bài học thành công");
          }
        }
      });
    } catch (error) {
      console.log("🚀error handleDeleteLecture ---->", error);
    }
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = lessonList.findIndex(({ _id }) => _id === active.id);
      const overIndex = lessonList.findIndex(({ _id }) => _id === over.id);

      const newLessons = arrayMove(lessonList, activeIndex, overIndex);

      setLessonList(newLessons);
      for (const [index, lesson] of newLessons.entries()) {
        await updateLessonOrder({
          lessonId: lesson._id,
          order: index + 1,
          path: `/manage/course/outline?slug=${courseSlug}`,
        });
      }
      toast.success("Thay đổi thứ tự bài học thành công");
    }
  };

  useEffect(() => {
    setLessonList(lecture.lessons || []);
  }, [lecture.lessons]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AccordionContent className="border-none !bg-transparent">
        <SortableContext items={lessonList.map((lesson) => lesson._id)}>
          <div className="flex flex-col gap-5">
            {lessonList.map((lesson) => (
              <OutlineDraggableItem key={lesson._id} id={lesson._id}>
                <Accordion
                  key={lesson._id}
                  collapsible={!lessonIdEdit}
                  type="single"
                >
                  <AccordionItem value={lesson._id}>
                    <AccordionTrigger>
                      <div className="flex w-full items-center justify-between gap-3 pr-5">
                        {lesson._id === lessonIdEdit ? (
                          <>
                            <div className="w-full">
                              <Input
                                defaultValue={lesson.title}
                                placeholder="Thêm bài học mới..."
                                onChange={(event) =>
                                  setLessonEdit(event.target.value)
                                }
                              />
                            </div>
                            <div className="flex gap-2">
                              <OutlineAction
                                variant="success"
                                onClick={(event) =>
                                  handleUpdateLesson(
                                    event,
                                    id,
                                    courseId,
                                    lesson._id,
                                  )
                                }
                              >
                                <IconCheckCircle />
                              </OutlineAction>
                              <OutlineAction
                                variant="danger"
                                onClick={(event) => (
                                  event.stopPropagation(),
                                  setLessonIdEdit("")
                                )}
                              >
                                <IconCancel />
                              </OutlineAction>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{lesson.title}</div>
                            <div className="flex gap-2">
                              <OutlineAction
                                variant="info"
                                onClick={(event) => (
                                  event.stopPropagation(),
                                  setLessonIdEdit(lesson._id)
                                )}
                              >
                                <IconEdit />
                              </OutlineAction>
                              <OutlineAction
                                variant="danger"
                                onClick={(event) =>
                                  handleDeleteLesson(
                                    event,
                                    id,
                                    courseId,
                                    lesson._id,
                                  )
                                }
                              >
                                <IconDelete />
                              </OutlineAction>
                              <OutlineDraggableHandle />
                            </div>
                          </>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <OutlineItem
                        courseId={courseId}
                        lectureId={id}
                        lesson={lesson}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </OutlineDraggableItem>
            ))}
          </div>
        </SortableContext>
      </AccordionContent>
    </DndContext>
  );
};

export default OutlineDraggableContent;
