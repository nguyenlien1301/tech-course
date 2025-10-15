const CourseItemSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-grayDark">
      <div className="h-[180px] animate-pulse bg-gray-100" />
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-3 h-14 w-full animate-pulse bg-gray-100" />
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
            <div className="h-5 w-full animate-pulse bg-gray-100" />
          </div>
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default CourseItemSkeleton;
