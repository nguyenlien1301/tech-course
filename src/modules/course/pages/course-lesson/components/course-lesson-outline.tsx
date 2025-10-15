export interface CourseLessonOutlineProps {
  completeNumber: number;
  children?: React.ReactNode;
}

const CourseLessonOutline = ({
  children,
  completeNumber,
}: CourseLessonOutlineProps) => {
  return (
    <div className="max-h-[calc(100svh - 100px)] sticky right-0 top-5 overflow-x-auto">
      <div className="borderDarkMode bgDarkMode mb-5 h-3 w-full rounded-full">
        <div
          className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${completeNumber}%` }}
        />
      </div>
      {children}
    </div>
  );
};

export default CourseLessonOutline;
