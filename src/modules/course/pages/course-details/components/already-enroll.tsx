"use client";

import Image from "next/image";
import Link from "next/link";

interface AlreadyEnrollProps {
  userInfo: {
    name: string;
    avatar: string;
  };
}
const AlreadyEnroll = ({ userInfo }: AlreadyEnrollProps) => {
  return (
    <div className="bgDarkMode borderDarkMode font-base rounded-lg bg-white p-5">
      <div className="flex flex-col items-center">
        <Image
          alt="avatar"
          className="shrink-0 rounded-full"
          height={60}
          src={userInfo.avatar}
          width={60}
        />
        <div className="mt-3">
          Xin chào 👋 <strong>{userInfo.name}.</strong> Bạn đã sở hữu khóa học
          này rồi. Vui lòng nhấn vào{" "}
          <Link className="font-bold text-primary" href="/study">
            Khu vực học tập{" "}
          </Link>
          để học hoặc
        </div>
        <Link
          className="btn mt-5 w-full transition-all hover:bg-primary/30 hover:text-primary"
          href="/study"
        >
          Nhấn vào đây
        </Link>
      </div>
    </div>
  );
};

export default AlreadyEnroll;
