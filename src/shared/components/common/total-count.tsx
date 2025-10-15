interface TotalCountProps {
  total: number;
  text: string;
}

const TotalCount = ({ text, total }: TotalCountProps) => {
  return (
    <div className="mb-5 flex items-center gap-2 text-gray-600">
      <span className="text-nowrap text-lg font-medium dark:text-gray-300">
        {text}
      </span>
      <span className="inline-flex items-center rounded-full border border-blue bg-blue/15 px-3 py-1 text-lg font-semibold text-blue">
        {total}
      </span>
    </div>
  );
};

export default TotalCount;
