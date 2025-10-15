import { TableCell, TableRow } from "@/shared/components/ui";

const SkeletonTableRows = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="size-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-36 animate-pulse bg-gray-200" />
            <div className="h-4 w-36 animate-pulse bg-gray-200" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-7 w-20 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-3">
          <div className="size-8 animate-pulse rounded-md bg-slate-200" />
          <div className="size-8 animate-pulse rounded-md bg-slate-200" />
          <div className="size-8 animate-pulse rounded-md bg-slate-200" />
          <div className="size-8 animate-pulse rounded-md bg-slate-200" />
        </div>
      </TableCell>
      <TableCell />
    </TableRow>
  );
};

export default SkeletonTableRows;
