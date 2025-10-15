"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IconOpen } from "@/shared/components/icons";
import { Button } from "@/shared/components/ui";
import { useGlobalStore } from "@/shared/store";
import { cn } from "@/shared/utils/common";

import LessonNavigation from "./lesson-navigation";
import RatingButton from "./rating-button";

interface VideoPlayerProps {
  courseId: string;
  prevLesson: string;
  playbackId: string;
  nextLesson: string;
}
const VideoPlayer = ({
  courseId,
  nextLesson,
  playbackId,
  prevLesson,
}: VideoPlayerProps) => {
  const duration = 5000;
  const [isEndedVideo, setIsEndedVideo] = useState(false);
  const { setShouldExpandedPlayer, shouldExpandedPlayer } = useGlobalStore();
  const router = useRouter();

  useEffect(() => {
    if (!isEndedVideo) return;
    const timer = setTimeout(() => {
      router.push(nextLesson);
    }, duration);

    return () => clearTimeout(timer);
  }, [isEndedVideo, nextLesson, router]);

  return (
    <>
      <div className="relative mb-5 aspect-video">
        {/* <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          //   title="Thám Tử Lừng Danh Conan Movie 11 Kho Báu Dưới Đáy Đại Dương | Conan Movie Lồng Tiếng | KinKin Michan"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-full object-fill rounded-lg"
        ></iframe> */}
        <div
          className={cn(
            "h-1.5 bg-gradient-to-r from-primary to-secondary absolute top-0 right-0 z-10",
            isEndedVideo ? "animate-bar" : "",
          )}
        />
        {!!playbackId && (
          <MuxPlayer
            metadataVideoTitle="Placeholder (optional)"
            metadataViewerUserId="Placeholder (optional)"
            playbackId={playbackId}
            primaryColor="#FFFFF"
            secondaryColor="#00000"
            streamType="on-demand"
            //   Khi video lết thúc sẽ chạy vào
            onEnded={() => setIsEndedVideo(true)}
            onPlay={() => setIsEndedVideo(false)}
          />
        )}
        {!playbackId && (
          <div className="flex aspect-video items-center justify-center bg-gray-300">
            No Video
          </div>
        )}
        {/* {!playbackId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            //   title="Thám Tử Lừng Danh Conan Movie 11 Kho Báu Dưới Đáy Đại Dương | Conan Movie Lồng Tiếng | KinKin Michan"
            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="h-full w-full rounded-lg object-fill"
         />} */}
      </div>
      <div className="mb-5 flex items-center justify-between">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <div className="flex gap-5">
          <Button
            onClick={() => setShouldExpandedPlayer(!shouldExpandedPlayer)}
          >
            <IconOpen />
            {shouldExpandedPlayer ? "Mặc định" : "Mở rộng"}
          </Button>
          <RatingButton courseId={courseId} />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
