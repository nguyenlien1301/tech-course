import { TableCell, TableRow } from "@/shared/components/ui";
import { ITEM_PER_PAGE } from "@/shared/constants";

const SkeletonTableRating = () => {
  return Array.from({ length: ITEM_PER_PAGE })
    .fill(0)
    .map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 rounded-md bg-gray-200" />
            <div className="h-3 w-20 rounded-md bg-gray-200" />
          </div>
        </TableCell>
        <TableCell>
          <div className="h-3 w-48 rounded-md bg-gray-200" />
        </TableCell>
        <TableCell>
          <div className="h-3 w-36 rounded-md bg-gray-200" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-32 rounded-md bg-gray-200" />
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-center gap-3">
            <div className="size-8 animate-pulse rounded-md bg-gray-200" />
            <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          </div>
        </TableCell>
      </TableRow>
    ));
};

export default SkeletonTableRating;
