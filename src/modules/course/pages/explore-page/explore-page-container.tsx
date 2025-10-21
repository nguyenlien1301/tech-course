"use client";

import { CourseGrid, Heading } from "@/shared/components/common";
import { IconSearch } from "@/shared/components/icons";
import { Input } from "@/shared/components/ui";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { allValue, CourseOptions } from "@/shared/constants";
import { courseSortOptions } from "@/shared/constants/course-constant";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

import { CourseItem } from "../../components";
import { useQueryFetchCoursesPublic } from "../../libs";

const ExplorePageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleChangeQs, handleSearchData, handleSetDefaultStatus } =
    useQueryString();
  // const { handleSearchData } = useQueryString();

  const { data, isFetching, isLoading } = useQueryFetchCoursesPublic({
    search: searchParams.search,
    option: searchParams.option,
  });
  const courseList = data || [];

  return (
    <div className="flex flex-col">
      <Heading>Khám phá</Heading>
      <div className="mb-10 flex items-center justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="relative w-full lg:w-[300px] xl:w-[600px]">
          <Input
            className="rounded-full pl-5 pr-10" // chừa chỗ cho icon
            placeholder="Tìm kiếm khoá học..."
            onChange={handleSearchData}
          />
          <IconSearch className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500" />
        </div>
        <div className="w-full max-w-sm">
          <Tabs
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-0.5 sm:py-2"
            defaultValue={handleSetDefaultStatus("option")}
            onValueChange={(value) =>
              handleChangeQs("option", value as CourseOptions)
            }
          >
            <TabsList className="flex flex-wrap gap-5">
              <TabsTrigger value={allValue}>Tất cả</TabsTrigger>
              {courseSortOptions.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <CourseGrid isFetching={isFetching} isLoading={isLoading}>
        {!!courseList &&
          courseList.length > 0 &&
          courseList.map((course, index) => (
            <CourseItem key={course.slug || index} data={course} />
          ))}
      </CourseGrid>
    </div>
  );
};

export default ExplorePageContainer;
