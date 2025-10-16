"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { CourseOptions, CourseStatus, RatingStatus } from "@/shared/constants";
import { connectToDatabase } from "@/shared/lib";
import {
  CourseModel,
  LectureModel,
  LessonModel,
  RatingModel,
  UserModel,
} from "@/shared/schemas";
import { CourseItemData, QueryFilter } from "@/shared/types";
import {
  CourseLessonData,
  CreateCourseParams,
  GetAllCourseParams,
  UpdateCourseParams,
} from "@/shared/types/course.type";

export async function fetchCourseSummary() {
  try {
    connectToDatabase();

    // Đếm theo trạng thái
    const [approved, pending, canceled] = await Promise.all([
      CourseModel.countDocuments({ status: CourseStatus.APPROVED }),
      CourseModel.countDocuments({ status: CourseStatus.PENDING }),
      CourseModel.countDocuments({ status: CourseStatus.REJECTED }),
    ]);

    console.log("🚀approved---->", approved);
    console.log("🚀pending---->", pending);
    console.log("🚀canceled---->", canceled);
    // Tính tổng doanh thu
    // (giả sử mỗi course có field price và số người học enrollCount)
    const allCourses = await CourseModel.find({
      status: CourseStatus.APPROVED,
    });

    // const totalRevenue = allCourses?.reduce((sum, acc) => {
    //   return sum + (Number(acc.price) || 0) * (Number(acc.enrollCount) || 0);
    // }, 0);
    const totalRevenue = allCourses?.reduce((sum, item) => {
      const total = sum + item.price;

      return total;
    }, 0);

    console.log("🚀totalRevenue---->", totalRevenue);

    return {
      approved,
      pending,
      canceled,
      totalRevenue,
    };
  } catch (error) {
    console.error("🚀 error fetchCourseSummary --->", error);
    throw error;
  }
}

// fetching lấy thông tin khoá học
// đây là tìm kiếm nên nên ko cần JSON.parse(JSON.stringify(newCourse)); chỉ khi thêm, sửa, xoá mới cần.
export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<CourseItemData | undefined> {
  try {
    connectToDatabase();
    // Ở đây khi dùng populate thì sẽ lấy đc dữ liệu của model lectures
    // .populate("lectures"): sẽ lấy tất cả dữ liệu của lectures
    // path: trỏ tới model đã định nghĩa là ref bên model Course
    // select: lấy cụ thể từng key mong muốn (dùng sẽ tốt hơn nhe hơn).
    // match: khi muốn lấy ra nhưng dữ liệu có điều kiện
    // Lưu ý: lectures: tên này phải đúng chính tả với lectures đc tạo bên Course model
    const findCourse = await CourseModel.findOne({ slug })
      // .select("_id slug lectures")
      .populate({
        path: "lectures",
        model: LectureModel,
        select: "_id title",
        match: {
          _destroy: false,
        },
        populate: {
          path: "lessons",
          model: LessonModel,
          select: "_id title slug duration video_url content course",
          match: {
            _destroy: false,
          },
          options: {
            sort: {
              order: 1,
            },
          },
        },
      })
      .populate({
        path: "rating",
        model: RatingModel,
        match: {
          status: RatingStatus.ACTIVE,
        },
      });

    return JSON.parse(JSON.stringify(findCourse)) as CourseItemData;
  } catch (error) {
    console.log("🚀error function getCourseInfo ---->", error);
  }
}

// Lấy ra tất cả khoá học để vào trang quản lí khoá học (hàm này xử lí phân trang)
export async function fetchCourses(params: QueryFilter): Promise<
  | {
      courses: CourseItemData[];
      total?: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    // params: này chứa dữ liệu từ trang page của manage truyền qua
    const { limit = 10, page = 1, search, status } = params;
    // skip: Khi nhấn phân trang qua trang mới thì nó sẽ phải skip qua những phần tử mà mình đã phân trang trước đó
    // Vd: đang ở page 1 thì sẽ lấy 1-1 thì nó sẽ là trang 0, qua page 2 thì 2-2 là trang 1, rồi 1 * cho limit là 10 lúc này nó sẽ skip đi 10 cái và nó sẽ lấy 10 cái tiếp theo, qua trang 3 là 2 * 10 thì là nó sẽ lấy 10 cái tiếp theo và nó sẽ skip qua 20 cái trước đó.
    const skip = (page - 1) * limit;
    // <typeof CourseModel>: Dùng typeof để lấy ra những cái type của model Course và nó math vào filterQuery của mongo
    const query: FilterQuery<typeof CourseModel> = {};

    // Nếu có search sẽ truyền vào $or (hoặc) và truyền vào một mảng object là điều kiện: title là title trong CourseModel. $regex: tương ứng với những gì mà mình rõ vào search.  $options: "i" tức là ko phân biệt hoa thường
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    if (status) {
      query.status = status;
    }
    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    const total = await CourseModel.countDocuments(query);

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      total,
    };
  } catch (error) {
    console.log("🚀error function fetchAllCourses ---->", error);
  }
}

// Chỉ lấy ra chứ ko có pagination
export async function fetchAllCoursesPublic(
  params: GetAllCourseParams,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    // params: này chứa dữ liệu từ trang page của manage truyền qua
    const { limit = 10, option, page = 1, search, status } = params;
    // skip: Khi nhấn phân trang qua trang mới thì nó sẽ phải skip qua những phần tử mà mình đã phân trang trước đó
    // Vd: đang ở page 1 thì sẽ lấy 1-1 thì nó sẽ là trang 0, qua page 2 thì 2-2 là trang 1, rồi 1 * cho limit là 10 lúc này nó sẽ skip đi 10 cái và nó sẽ lấy 10 cái tiếp theo, qua trang 3 là 2 * 10 thì là nó sẽ lấy 10 cái tiếp theo và nó sẽ skip qua 20 cái trước đó.
    const skip = (page - 1) * limit;
    // <typeof CourseModel>: Dùng typeof để lấy ra những cái type của model Course và nó math vào filterQuery của mongo
    const query: FilterQuery<typeof CourseModel> = {};

    // Nếu có search sẽ truyền vào $or (hoặc) và truyền vào một mảng object là điều kiện: title là title trong CourseModel. $regex: tương ứng với những gì mà mình rõ vào search.  $options: "i" tức là ko phân biệt hoa thường
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    if (status) {
      query.status = status;
    }

    if (option === CourseOptions.FREE) {
      query.price = 0;
    }
    // Latest (trong vòng 15 ngày gần nhất)
    if (option === CourseOptions.LATEST) {
      const now = new Date();
      const fifteenDaysAgo = new Date();

      fifteenDaysAgo.setDate(now.getDate() - 15);

      query.created_at = { $gte: fifteenDaysAgo };
    }

    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    console.log("🚀courses---->", courses);

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log("🚀error function fetchAllCoursesPublic ---->", error);
  }
}
// Lấy ra khoá học mà user đã mua
export async function fetchCourseOfUser(
  userId: string,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: LectureModel,
        select: "lessons",
        populate: {
          path: "lessons",
          model: LessonModel,
          select: "slug",
        },
      },
    });

    if (!findUser) return;

    return JSON.parse(JSON.stringify(findUser.courses));
  } catch (error) {
    console.log("🚀error getUserCourse ---->", error);
  }
}

// Tạo khoá học
export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    // existCourse: slug từ params.slug truyền vào, để tìm xem khoá học đó đã có slug đó chưa tránh trường hợp bị trùng slug.
    const existCourse = await CourseModel.findOne({ slug: params.slug });

    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khoá học đã tồn tại",
      };
    }
    const newCourse = await CourseModel.create(params);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCourse)),
      message: "Tạo khoá học thành công",
    };
  } catch (error) {
    console.log("🚀error function createCourse ---->", error);
  }
}
// Sửa khoá học
export async function updateCourse(params: UpdateCourseParams) {
  try {
    connectToDatabase();
    // Tìm khoá học trước khi cập nhật khoá học
    const findCourse = await CourseModel.findOne({ slug: params.slug });

    if (!findCourse) return null;
    // Cập nhật khoá học.
    // { slug: params.slug }: truyền vào slug cần cập nhật
    // params.updateData: Những dữ liệu cần cập nhật
    // new: true: mỗi lần cập nhật nó sẽ lưu bản ghi mới nhất vào, nếu ko có nó sẽ vần lấy cái trước đó.
    await CourseModel.findOneAndUpdate(
      { slug: params.slug },
      params.updateData,
      {
        new: true,
      },
    );
    // revalidatePath: khi cập nhật truyền trang muốn reload lại ra giao diện
    revalidatePath("/");

    return {
      success: true,
      message: "Cập nhật khoá học thành công",
    };
  } catch (error) {
    console.log("🚀error function updateCourse ---->", error);
  }
}
export async function deleteCourse(slug: string) {
  try {
    connectToDatabase();
    // Tìm khoá học trước khi cập nhật khoá học
    const findCourse = await CourseModel.findOne({ slug: slug });

    if (!findCourse) return null;
    // Cập nhật khoá học.
    // { slug: params.slug }: truyền vào slug cần cập nhật
    // params.updateData: Những dữ liệu cần cập nhật
    // new: true: mỗi lần cập nhật nó sẽ lưu bản ghi mới nhất vào, nếu ko có nó sẽ vần lấy cái trước đó.
    await CourseModel.findOneAndDelete({ slug: slug });
    // revalidatePath: khi cập nhật truyền trang muốn reload lại ra giao diện
    revalidatePath("/manage/course");

    return {
      success: true,
      message: "Cập nhật khoá học thành công",
    };
  } catch (error) {
    console.log("🚀error function updateCourse ---->", error);
  }
}

// updateCourseView: hàm update mỗi lần truy cập vào course slug sẽ tăng lên 1 view
export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    await CourseModel.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      },
    );
  } catch (error) {
    console.log("🚀error updateCourseView ---->", error);
  }
}

// getCourseLessonInfo: Hàm này mục đích để lấy ra thời lượng khoá học có trong bài học
export async function getCourseLessonInfo({
  slug,
}: {
  slug: string;
}): Promise<CourseLessonData | undefined> {
  try {
    connectToDatabase();
    // course: này là thông tin của khoá học lấy theo slug,
    //  .select("lectures"): là lấy cụ thể còn nếu ko có nó sẽ lấy hết tất cả
    // lấy xong thì select tới lectures và lessons để lấy ra đc duration
    const course: CourseItemData = await CourseModel.findOne({ slug })
      .select("lectures")
      .populate({
        path: "lectures",
        model: LectureModel,
        select: "lessons",
        populate: {
          path: "lessons",
          model: LessonModel,
          select: "duration",
        },
      });
    // lessons: này từ course.lectures map qua và lấy ra một mảng lesson và dùng flat() để làm phẳng tất cả mảng
    // Mục đích làm phẳng mảng là vì đẻ tính tổng thời lượng, vì trong mỗi bài học sẽ có thời lượng. Vì vậy phải lấy ra và làm phẳng mảng nhập chung các duration lại với nhau để dùng hàm reduce tính tổng thời lượng các bài học.
    const lessons = course?.lectures.flatMap((lecture) => lecture.lessons);
    // duration: này lấy lessons vừa làm phẳng bên trên dùng reduce để tính tổng các duration trong mỗi bài học đã đc làm phẳng
    const duration =
      lessons.reduce(
        (accumulator: number, current) => accumulator + current.duration,
        0,
      ) || 0;

    return {
      duration,
      lessons: lessons.length,
    };
  } catch (error) {
    console.log("🚀error getCourseLessonInfo ---->", error);
  }
}

export async function fetchUserCoursesContinue({
  clerkId,
}: {
  clerkId: string;
}): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: clerkId }).populate({
      path: "courses",
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: LectureModel,
        select: "lessons",
        populate: {
          path: "lessons",
          model: LessonModel,
          select: "_id slug",
        },
      },
    });

    if (!findUser) return;

    return JSON.parse(JSON.stringify(findUser.courses));
  } catch (error) {
    console.log("🚀error getUserCourse ---->", error);
  }
}
