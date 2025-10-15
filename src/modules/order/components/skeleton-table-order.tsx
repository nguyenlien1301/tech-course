import { TableCell, TableRow } from "@/shared/components/ui";

const SkeletonTableOrder = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-3 w-16  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-28  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-36  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-36  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-36  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-32  rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-3">
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SkeletonTableOrder;
