"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { createLecture, updateLecture } from "@/modules/lecture/actions";
import { createLesson } from "@/modules/lesson/actions";
import {
  IconCancel,
  IconCheckCircle,
  IconDelete,
  IconEdit,
} from "@/shared/components/icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
} from "@/shared/components/ui";
import { CourseItemData } from "@/shared/types";

import OutlineAction from "./outline-action";
import OutlineDraggableContent from "./outline-draggable-content";

const OutlineCourseContainer = ({ course }: { course: CourseItemData }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
  // const [lessonList, setLessonList] = useState<LessonItemData[]>([]);
  //   function thêm chương mới
  const handleAddNewLecture = async () => {
    try {
      const reponse = await createLecture({
        title: "Chương mới",
        course: course._id,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (reponse?.success) {
        toast.success("Tạo chương mới thành công");
      }
    } catch (error) {
      console.log("🚀error handleAddNewLecture ---->", error);
    }
  };
  //  Hàm cập nhật lecture
  const handleUpdateLecture = async (
    event: React.MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event.stopPropagation();
    try {
      const hasResult = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
        },
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (hasResult?.success) {
        toast.success("Cập nhật tên chương hiện tại thành công");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log("🚀error handleDeleteLecture ---->", error);
    }
  };
  //   Hàm xoá lecture
  const handleDeleteLecture = async (
    event: React.MouseEvent<HTMLSpanElement>,
    lectureId: string,
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
          const hasResult = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
            },
            path: `/manage/course/update-content?slug=${course.slug}`,
          });

          if (hasResult?.success) {
            toast.success("Xoá chương hiện tại thành công");
          }
        }
      });
    } catch (error) {
      console.log("🚀error handleDeleteLecture ---->", error);
    }
  };
  // Hàm thêm bài học
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    // foundLecture: Tìm khoá học
    const foundLecture = lectures.find((lecture) => lecture._id === lectureId);

    try {
      const hasResult = await createLesson({
        lecture: lectureId,
        course: courseId,
        title: "Bài học mới",
        slug: `tieu-de-bai-hoc-moi-${Date.now().toString().slice(-3)}`,
        path: `/manage/course/update-content?slug=${course.slug}`,
        order: (foundLecture?.lessons.length || 0) + 1,
      });

      if (hasResult?.success) {
        toast.success("Tạo bài học mới thành công");
      }
    } catch (error) {
      console.log("🚀error handleAddNewLesson ---->", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture) => (
          <div key={lecture._id}>
            <Accordion collapsible={!lectureIdEdit} type="single">
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-3 pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            defaultValue={lecture.title}
                            placeholder="Thêm chương mới..."
                            onChange={(event) =>
                              setLectureEdit(event.target.value)
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <OutlineAction
                            variant="success"
                            onClick={(event) =>
                              handleUpdateLecture(event, lecture._id)
                            }
                          >
                            <IconCheckCircle />
                          </OutlineAction>
                          <OutlineAction
                            variant="danger"
                            onClick={(event) => (
                              event.stopPropagation(),
                              setLectureIdEdit("")
                            )}
                          >
                            <IconCancel />
                          </OutlineAction>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lecture.title}</div>
                        <div className="flex gap-2">
                          <OutlineAction
                            variant="info"
                            onClick={(event) => (
                              event.stopPropagation(),
                              setLectureIdEdit(lecture._id)
                            )}
                          >
                            <IconEdit />
                          </OutlineAction>
                          <OutlineAction
                            variant="danger"
                            onClick={(event) =>
                              handleDeleteLecture(event, lecture._id)
                            }
                          >
                            <IconDelete />
                          </OutlineAction>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <OutlineDraggableContent
                  courseId={course._id}
                  courseSlug={course.slug}
                  id={lecture._id}
                  lecture={lecture}
                  lessonEdit={lessonEdit}
                  lessonIdEdit={lessonIdEdit}
                  setLessonEdit={setLessonEdit}
                  setLessonIdEdit={setLessonIdEdit}
                  // lessons={lessonList.filter(
                  //   (item) => item.lecture === lecture._id,
                  // )}
                />
              </AccordionItem>
            </Accordion>
            <Button
              className="mb-5 ml-auto block w-fit"
              variant="primary"
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
            >
              Thêm bài học mới
            </Button>
          </div>
        ))}
      </div>
      <Button className="mt-5" variant="primary" onClick={handleAddNewLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default OutlineCourseContainer;
