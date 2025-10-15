"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/shared/lib";
import { CourseModel, LectureModel } from "@/shared/schemas";
import { CreateLectureParams, UpdateLectureParams } from "@/shared/types";

// Hàm tạo chương mới
export async function createLecture(params: CreateLectureParams) {
  try {
    connectToDatabase();
    // Tìm khoá học trước khi tạo chương
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return null;
    const count = await LectureModel.countDocuments();
    // Ở đây gán order bên đây là vì nên lấy số lượng từ mongo ko nên lấy số lượng từ UI sẽ dễ bị sai
    const newLecture = await LectureModel.create({
      ...params,
      order: count + 1,
    });

    // newLecture: trả ra lecture mới
    // Cách đẩy id của khoá học vào lecture
    // Khi nhấn tạo chương thì sẽ tạo ra một chương mới và sẽ thêm cái id của chương mới này vào lecture trong khoa học
    findCourse.lectures.push(newLecture._id);
    // lưu lại
    findCourse.save();
    revalidatePath(params.path || "/");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error function createLecture ---->", error);
  }
}

// Hàm cập nhật chương
export async function updateLecture(params: UpdateLectureParams) {
  try {
    connectToDatabase();
    const findLecture = await LectureModel.findById(params.lectureId);

    if (!findLecture) return null;
    const hasResult = await LectureModel.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.path || "/");
    if (!hasResult) return null;

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error function updateLecture ---->", error);
  }
}
