import Image from "next/image";
import Link from "next/link";
import { IconClock, IconEye, IconStar } from "../icons";

const courseInfo = [
  {
    title: "1000",
    icon: (className: string) => <IconEye className={className} />,
  },
  {
    title: "5.0",
    icon: (className: string) => <IconStar className={className} />,
  },
  {
    title: "30h45p",
    icon: (className: string) => <IconClock className={className} />,
  },
];

const CourseItem = () => {
  return (
    <div className="p-4 bg-white dark:bg-grayDark border border-gray-200/10 rounded-2xl">
      <Link href="#" className="block h-[180px] relative">
        <Image
          src="https://plus.unsplash.com/premium_photo-1669377593274-41985c518d03?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="image"
          width={600}
          height={400}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px 100vw"
          priority={true}
        />
        <span className="inline-block absolute top-3 right-3 font-medium rounded-full bg-secondary text-xs py-1 px-3 text-white z-10">
          product
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          Khoá học NextJs Pro - Xây dựng Eleaning systeam hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
          {courseInfo.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 dark:text-graySlate"
            >
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-semibold ml-auto text-sm text-secondary bg-secondary/20 py-1 px-3 rounded-full">
            799.000
          </span>
        </div>
        <Link href="#" className="btn mt-10 hover-bg-btn-opacity">
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
