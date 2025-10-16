import {
  IconComment,
  IconDiscover,
  IconDollar,
  IconExplore,
  IconHome,
  IconOrder,
  IconStar,
  IconStudy,
  IconUsers,
} from "../components/icons";
import { MenuField } from "../types";

export const menuItems: MenuField[] = [
  {
    url: "/",
    title: "Trang chủ",
    icon: <IconHome className="shirk-0 size-6" />,
  },
  {
    url: "/explore",
    title: "Khám phá",
    icon: <IconDiscover className="shirk-0 size-6" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="shirk-0 size-6" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khoá học",
    icon: <IconExplore className="shirk-0 size-6" />,
  },
  {
    url: "/manage/user",
    title: "Quản lý thành viên",
    icon: <IconUsers className="shirk-0 size-6" />,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="shirk-0 size-6" />,
  },
  {
    url: "/manage/coupon",
    title: "Quản lý coupon",
    icon: <IconDollar className="shirk-0 size-6" />,
  },
  {
    url: "/manage/rating",
    title: "Quản lý đánh giá",
    icon: <IconStar className="shirk-0 size-6" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="shirk-0 size-6" />,
  },
];

export const menuItemUser: MenuField[] = [
  {
    url: "/",
    title: "Trang chủ",
    icon: <IconHome className="shirk-0 size-6" />,
  },
  {
    url: "/explore",
    title: "Khám phá",
    icon: <IconDiscover className="shirk-0 size-6" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="shirk-0 size-6" />,
  },
];
