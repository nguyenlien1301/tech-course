import { TableCell, TableRow } from "@/shared/components/ui";

const SkeletonTableUser = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="size-16 animate-pulse rounded-full bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-36 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-40 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-32 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
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

export default SkeletonTableUser;
