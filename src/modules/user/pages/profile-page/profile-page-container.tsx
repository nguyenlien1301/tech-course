"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";

import { Button, Input, Label } from "@/shared/components/ui";
import { useUserContext } from "@/shared/contexts";

import { useQueryFetchUserInfo } from "../../libs";
import ProfileForm from "./components/profile-form";

function ProfilePageContainer() {
  const { userInfo } = useUserContext();
  const { data } = useQueryFetchUserInfo(userInfo?.clerkId || "");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <main className="flex-1 space-y-6">
            <h2 className="text-xl font-semibold md:text-2xl">My Profile</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Image
                  alt="avatar"
                  className="size-20 rounded-full object-cover"
                  height={50}
                  src={data?.avatar || ""}
                  width={50}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {data?.name}
                  </h3>
                  <p className="text-sm text-gray-600 md:text-base">
                    Team Manager
                  </p>
                  <p className="text-sm text-gray-500">Leeds, United Kingdom</p>
                </div>

                <Button
                  className="gap-2 self-start sm:self-auto"
                  size="sm"
                  variant="outline"
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                <ProfileForm user={data || undefined} />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label className="mb-2 block text-sm text-gray-600">
                    Họ và tên
                  </Label>
                  <Input
                    className="border-0 bg-gray-50"
                    readOnly
                    value={data?.name}
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-sm text-gray-600">
                    Tên đăng nhập
                  </Label>
                  <Input
                    className="border-0 bg-gray-50"
                    readOnly
                    value={data?.username}
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-sm text-gray-600">
                    Email
                  </Label>
                  <Input
                    className="border-0 bg-gray-50"
                    disabled
                    readOnly
                    value={data?.email}
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-sm text-gray-600">
                    Phone
                  </Label>
                  <Input className="border-0 bg-gray-50" readOnly value="" />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2 block text-sm text-gray-600">
                    Bio
                  </Label>
                  <Input className="border-0 bg-gray-50" readOnly value="" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageContainer;
