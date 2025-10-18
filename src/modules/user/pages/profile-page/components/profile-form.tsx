"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/components/ui";
import { User } from "@/shared/types/models";

const formSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});
const ProfileForm = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("🚀user---->", user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      bio: "",
    },
  });

  //   useEffect(() => {
  //     if (user) {
  //       form.reset({
  //         name: user.name || "",
  //         username: user.username || "",
  //         phone: "",
  //         bio: "",
  //       });
  //     }
  //   }, [user?._id]);
  useEffect(() => {
    if (isOpen && user) {
      form.reset({
        name: user.name || "",
        username: user.username || "",
        phone: "",
        bio: "",
      });
    }
  }, [isOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀values---->", values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Thực hiện thay đổi cho hồ sơ của bạn ở đây. Nhấp vào lưu khi bạn
            hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên đầy đủ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input placeholder="Bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Huỷ</Button>
              </DialogClose>
              <Button type="submit" variant="primary">
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileForm;
