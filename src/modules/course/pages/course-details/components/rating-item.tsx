import { colorList } from "@/shared/constants";

interface RatingItemProps {
  rating: string;
}
const RatingItem = ({ rating }: RatingItemProps) => {
  const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

  return (
    <div
      className={`borderDarkMode bgDarkMode rounded-full border px-4 py-2 text-sm font-medium ${randomColor}`}
    >
      {rating}
    </div>
  );
};

export default RatingItem;
