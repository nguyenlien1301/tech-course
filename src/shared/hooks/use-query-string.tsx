"use client";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { allValue } from "@/shared/constants";

function useQueryString() {
  // pathname: Lấy ra đường dẫn hiện tại của trang
  const pathname = usePathname();
  // fucntion chức năng xoá khoá học
  const router = useRouter();
  // searchParams: Lấy ra queryString hiện tại dưới dạng URLSearchParams
  const searchParams = useSearchParams();
  // currentPage: lấy ra params page và truyền qua file Pagination
  const currentPage = Number(searchParams.get("page")) || 1;
  // createQueryString: Mục đích tạo mới một queryString dựa trên query hiện tại nhưng thay đổi hoặc thêm 1 params
  // useCallback: Để memoize hàm chỉ tạo lại hàm khi searchParams thay đổi
  // params.set(name, value): set params mới hoặc thay giá trị params cũ
  // trả về params và áp sang kiểu string
  // router.push(`${pathname}?${createQueryString("status", status)}`);: điều hướng sang url mới giữ nguyên pathnam nhưng thay query status bằng status biến của bạn.
  // URLSearchParams trong JS lại yêu cầu nhận vào string dạng "key=value&key2=value2"
  // Ở đây  (name: string, value: string): name là key còn value là value
  // VD:
  // Giả sử searchParams = { category: "tour", price: "1000" }
  // const params = new URLSearchParams(searchParams.toString());
  // Bây giờ params.get("category") => "tour"
  // params.get("price") => "1000"

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(name, value);
    if (value === "" || value === allValue) {
      params.delete(name);
    }
    // ?${params.toString(): cái này là createQueryString("status", "INACTIVE"))
    router.push(`${pathname}?${params ? params.toString() : ""}`, {
      scroll: false,
    });
  };

  const handleSearchData = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      createQueryString("search", event.target.value);
    },
    250,
  );
  const handleSelectStatus = <T extends string>(status: T | string) => {
    createQueryString("status", status);
  };
  const handleChangePage = (page: number) => {
    createQueryString("page", `${page}`);
  };
  const handleChangeQs = (key: string, value: string) => {
    createQueryString(key, value);
  };

  // hàm lấy status set defaultValue
  const handleSetDefaultStatus = (
    key: string = allValue,
    fallback: string = allValue,
  ) => {
    const value = searchParams.get(key) ?? fallback;

    return value ?? fallback;
  };

  return {
    createQueryString,
    pathname,
    router,
    handleSetDefaultStatus,
    handleSearchData,
    handleSelectStatus,
    handleChangePage,
    currentPage,
    handleChangeQs,
  };
}

export default useQueryString;
