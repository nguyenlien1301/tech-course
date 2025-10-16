"use client";
import React from "react";

import { IconCube } from "@/shared/components/icons";
import { formatCurrency } from "@/shared/helper";

interface OrderSummaryProps {
  orders?: {
    completed: number;
    canceled: number;
    pending: number;
    totalRevenue: number;
  };
}
const OrderSummary = ({ orders }: OrderSummaryProps) => {
  const {
    canceled = 0,
    completed = 0,
    pending = 0,
    totalRevenue = 0,
  } = orders || {};
  const SummaryCardItem: {
    title: string;
    content: React.ReactNode;
    className: {
      bgColor: string;
      color: string;
    };
  }[] = [
    {
      title: "Đã duyệt",
      content: completed,
      className: {
        bgColor: "bg-green-500/10",
        color: "text-green-500",
      },
    },
    {
      title: "Chờ duyệt",
      content: pending,
      className: {
        bgColor: "bg-orange-500/10",
        color: "text-orange-500",
      },
    },
    {
      title: "Đã huỷ",
      content: canceled,
      className: {
        bgColor: "bg-red-500/10",
        color: "text-red-500",
      },
    },
    {
      title: "Tổng doanh thu",
      content: `${formatCurrency(totalRevenue)} vnd`,
      className: {
        bgColor: "bg-sky-500/10",
        color: "text-blue",
      },
    },
  ];

  return (
    <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4 ">
      {SummaryCardItem.map((item) => (
        <div
          key={item.title}
          className="bgDarkMode borderDarkMode rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.title}
              </p>
              <p className={`text-xl font-bold ${item.className.color}`}>
                {item.content}
              </p>
            </div>
            <div
              className={`flex size-10 items-center justify-center rounded-lg  ${item.className.bgColor}`}
            >
              <IconCube className={`size-5 ${item.className.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;
