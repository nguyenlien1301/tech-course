"use client";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import { useUserContext } from "@/shared/contexts";

import CourseContinue from "./components/course-continue";
import CourseSuggestion from "./components/course-suggestion";

const CourseDashboardContainer = () => {
  const { userInfo } = useUserContext();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-lg bg-primary p-5 text-white">
        <h2 className="text-2xl font-bold">
          Hello 👋<strong className="ml-5">{userInfo?.name}</strong>
        </h2>
        <p>Chúc bạn có một ngày học tập thật hiệu quả và vui vẻ nhé!</p>
        <div className="mt-3 flex gap-3">
          <Link
            className="group flex cursor-pointer items-center gap-3 rounded-lg bg-white px-5  py-2 text-sm font-bold text-primary"
            href="/study"
          >
            Tiếp tục học nhé
            <ArrowRightCircle className="size-5 group-hover:animate-pulse" />
          </Link>
        </div>
      </div>
      <CourseContinue />
      <CourseSuggestion />
    </div>
  );
};

export default CourseDashboardContainer;
