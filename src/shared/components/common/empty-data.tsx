import { TableCell, TableRow } from "../ui";

const EmptyData = ({ text }: { text?: string }) => {
  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flex h-20 items-center justify-center text-center">
          {text || "Không có dữ liệu"}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyData;
