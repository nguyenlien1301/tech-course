"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/shared/lib";
import { CourseModel, LectureModel, LessonModel } from "@/shared/schemas";
import { CreateLessonParams, UpdateLessonParams } from "@/shared/types";
import { Lesson } from "@/shared/types/models";

// lesson slug có thể trùng nhau vì vậy phải tìm theo course khoá học nữa thì mới chuẩn xác
export async function getLessonBySlug({
  course,
  slug,
}: {
  course: string;
  slug: string;
}): Promise<Lesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await LessonModel.findOne({ slug, course }).select(
      "title video_url content",
    );

    return JSON.parse(JSON.stringify(findLesson));
  } catch (error) {
    console.log("🚀error function getLessonBySlug ---->", error);
  }
}

export async function fetchAllLesson({
  course,
}: {
  course: string;
}): Promise<Lesson[] | undefined> {
  try {
    connectToDatabase();
    // const findCourse = await CourseModel.findById(course);

    // if (!findCourse) return;
    const lessons = await LessonModel.find({ course }).select(
      "slug title video_url content",
    );

    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    console.log("🚀error function fetchAllLesson ---->", error);
  }
}

export async function countLessonByCourseId({
  courseId,
}: {
  courseId: string;
}): Promise<number | undefined> {
  try {
    connectToDatabase();
    const count = await LessonModel.countDocuments({ course: courseId });

    return Math.trunc(count);
  } catch (error) {
    console.log("🚀error countAllLessonById ---->", error);
  }
}

export async function createLesson(params: CreateLessonParams) {
  try {
    connectToDatabase();
    // Tìm khoá học truyền vào id của khoá học
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return null;
    // Tìm chương truyền vào id của chương
    const findLecture = await LectureModel.findById(params.lecture);

    if (!findLecture) return null;
    // số lượng lesson
    const countLesson = await LessonModel.countDocuments();
    // tạo lesson
    const newLesson = await LessonModel.create({
      ...params,
      order: countLesson + 1,
    });

    // đẩy id vào lectures
    findLecture.lessons.push(newLesson._id);
    findLecture.save();
    revalidatePath(params.path || "/");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error function createLesson ---->", error);
  }
}

export async function updateLesson(params: UpdateLessonParams) {
  try {
    connectToDatabase();
    // // Tìm course
    const findCourse = await CourseModel.findById(params.courseId);

    if (!findCourse) return null;
    const findLecture = await LectureModel.findById(params.lectureId);

    if (!findLecture) return null;
    // Tìm lesson
    const findLesson = await LessonModel.findById(params.lessonId);

    if (!findLesson) return null;
    await LessonModel.findByIdAndUpdate(params.lessonId, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error function updateLesson---->", error);
  }
}

// Hàm updateLessonOrder để update lesson order khi kéo draggeable
export async function updateLessonOrder({
  lessonId,
  order,
  path,
}: {
  lessonId: string;
  order: number;
  path: string;
}) {
  try {
    connectToDatabase();
    const findLesson = await LessonModel.findById(lessonId);

    if (!findLesson) return;
    findLesson.order = order;
    findLesson.save();
    revalidatePath(path || "/");
  } catch (error) {
    console.log("🚀error updateLessonOrder ---->", error);
  }
}
