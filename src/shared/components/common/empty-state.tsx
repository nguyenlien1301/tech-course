import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-center justify-center gap-3 rounded-md border-2 border-blue p-10 font-bold">
      <span>Bạn chưa mua khoá học nào</span>
      <Link
        className="flex items-center gap-3 rounded-lg bg-blue px-4 py-2 text-white"
        href="/explore"
      >
        Nhấn vào đây để tham khảo các khoá học
        <ArrowBigRight className="animate-pulse" />
      </Link>
    </div>
  );
};

export default EmptyState;
