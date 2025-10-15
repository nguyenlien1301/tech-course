import Link from "next/link";

import { IconHome } from "@/shared/components/icons";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">404</h1>
      <h2 className="mb-5">Page Not Found</h2>
      <Link
        className="flex animate-bounce items-center gap-2 transition-all hover:text-primary"
        href="/"
      >
        <IconHome className="size-5" />
        Trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
