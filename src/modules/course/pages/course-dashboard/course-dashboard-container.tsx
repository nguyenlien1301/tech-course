"use client";
import { useUserContext } from "@/shared/contexts";

import CourseContinue from "./components/course-continue";
import CourseSuggestion from "./components/course-suggestion";

const CourseDashboardContainer = () => {
  const { userInfo } = useUserContext();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-lg bg-primary p-5 text-white">
        <h2 className="text-2xl font-bold">
          Xin chào <strong>{userInfo?.name}</strong>
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="mt-3 flex gap-3">
          <div className="rounded-lg bg-white p-2 text-sm font-bold text-primary">
            resume last course
          </div>
        </div>
      </div>
      <CourseContinue />
      <CourseSuggestion />
    </div>
  );
};

export default CourseDashboardContainer;
