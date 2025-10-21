"use client";
import { useUserContext } from "@/shared/contexts";

import CourseContinue from "./components/course-continue";
import CourseSuggestion from "./components/course-suggestion";

const CourseDashboardContainer = () => {
  const { userInfo } = useUserContext();

  // 🕐 Hàm xác định thời gian trong ngày
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "chào buổi sáng 🌤️";
    if (hour < 18) return "chào buổi chiều 🌇";

    return "chào buổi tối 🌙";
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-lg bg-primary p-5 text-white">
        <h2 className="text-2xl font-bold">
          Xin {getGreeting()}{" "}
          <strong className="ml-5">{userInfo?.name} 👋</strong>
        </h2>
        <p>Chúc bạn có một ngày học tập thật hiệu quả và vui vẻ nhé!</p>
        <div className="mt-3 flex gap-3">
          <div className="cursor-pointer rounded-lg bg-white px-5  py-2 text-sm font-bold text-primary">
            Tiếp tục học nhé
          </div>
        </div>
      </div>
      <CourseContinue />
      <CourseSuggestion />
    </div>
  );
};

export default CourseDashboardContainer;
