"use client";
import { CourseItem } from "@/modules/course/components";
import { useQueryFetchCoursesPublic } from "@/modules/course/libs";
import { CourseGrid, Heading } from "@/shared/components/common";
import { CourseStatus } from "@/shared/constants";
import { useUserContext } from "@/shared/contexts";

import { useQueryFavorites } from "../../libs/query";

const FavoritePageContainer = () => {
  const { data, isLoading } = useQueryFetchCoursesPublic({
    limit: 3,
    status: CourseStatus.APPROVED,
  });
  const courseList = data || [];
  const { userInfo } = useUserContext();
  const userId = userInfo?._id || "";
  const { data: favorites = [] } = useQueryFavorites(userId);

  return (
    <div className="flex flex-col">
      <Heading className="lg:text-xl">Danh sách khoá học yêu thích</Heading>
      <CourseGrid isLoading={isLoading}>
        {!!courseList &&
          courseList.length > 0 &&
          courseList.map((course, index) => {
            const isFavorite = favorites.includes(course?._id);

            return (
              isFavorite && (
                <CourseItem key={course.slug || index} data={course} />
              )
            );
          })}
      </CourseGrid>
    </div>
  );
};

export default FavoritePageContainer;
