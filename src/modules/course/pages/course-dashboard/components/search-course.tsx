"use client";

import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { allValue, CourseStatus } from "@/shared/constants";
import { commentStatus } from "@/shared/constants/comment-constant";
import { useQueryString } from "@/shared/hooks";

const SearchCourse = () => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();

  return (
    <div className="flex gap-3">
      <div className="w-full lg:ml-7 lg:w-[300px] xl:w-[400px]">
        <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
      </div>
      <Select
        defaultValue={handleSetDefaultStatus("status")}
        onValueChange={(value) => handleSelectStatus(value as CourseStatus)}
      >
        <SelectTrigger className="w-[150px] lg:w-[160px]">
          <SelectValue placeholder="Chọn trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={allValue}>Tất cả</SelectItem>
            {commentStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchCourse;
