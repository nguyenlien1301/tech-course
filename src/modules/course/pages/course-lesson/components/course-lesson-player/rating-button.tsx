import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import { getRatingByUserId } from "@/modules/rating/actions";
import { useMutationCreateRating } from "@/modules/rating/libs";
import { IconStar } from "@/shared/components/icons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from "@/shared/components/ui";
import { ratingList } from "@/shared/constants/rating-constant";
import { useUserContext } from "@/shared/contexts";
import { cn } from "@/shared/utils/common";

interface RatingButtonProps {
  courseId: string;
}
const RatingButton = ({ courseId }: RatingButtonProps) => {
  const mutationCreateRating = useMutationCreateRating();
  const { userInfo } = useUserContext();
  const userId = userInfo?._id || "";
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState("");
  const handleRatingCourse = async () => {
    try {
      const isAlreadyRated = await getRatingByUserId(userId);

      // console.log("🚀isAlreadyRated---->", isAlreadyRated);
      if (isAlreadyRated) {
        toast.warning("Bạn đã đánh giá khoá học này rồi");

        return;
      }
      if (!ratingContent || ratingValue === -1) {
        toast.warning("Vui lòng chọn đánh giá và nhập nội dung đánh giá");

        return;
      }
      const hasResult = await mutationCreateRating.mutateAsync({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });

      if (hasResult) {
        setRatingValue(-1);
        setRatingContent("");
      }
    } catch (error) {
      console.log("🚀error handleRatingCourse---->", error);
    }
  };
  const isDisable =
    mutationCreateRating.isPending || ratingValue === -1 || !ratingContent;

  return (
    <Dialog>
      <DialogTrigger className="borderDarkMode bgDarkMode flex h-10 items-center gap-2 rounded-full border !border-primary px-4 text-sm font-semibold shadow-[0_0_10px_theme('colors.secondary')] transition-all hover:!border-secondary hover:bg-secondary hover:text-white">
        <IconStar className="size-4" />
        <span>Đánh giá khoá học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl font-bold tracking-tight">
            Đánh giá
          </DialogTitle>
          <DialogDescription>
            <div className="mb-10 flex items-center justify-between gap-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col items-center gap-3 text-center text-xs"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center size-10 rounded-full bg-gray-300",
                      ratingValue === rating.value && "bg-[#ffb86c]",
                    )}
                  >
                    <Image
                      alt={rating.title}
                      height={20}
                      src={`/rating/${rating.title}.png`}
                      width={20}
                    />
                  </span>
                  <strong className="capitalize">{rating.title}</strong>
                </button>
              ))}
            </div>
            <Textarea
              className="h-[200px] resize-none"
              placeholder="Cảm nhận của bạn về khoá học này..."
              onChange={(event) => setRatingContent(event.target.value)}
            />
            <Button
              className="mt-5 w-full"
              disabled={isDisable}
              isLoading={mutationCreateRating.isPending}
              variant="primary"
              onClick={handleRatingCourse}
            >
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
