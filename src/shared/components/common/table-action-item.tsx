import Link from "next/link";

import {
  IconCancel,
  IconCheckCircle,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
  IconUturn,
} from "@/shared/components/icons";

type TableActionIcon =
  | "edit"
  | "delete"
  | "study"
  | "view"
  | "approve"
  | "cancel"
  | "back";

interface TableActionItemProps {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
  blank?: string;
}
const TableActionItem = ({
  blank,
  onClick,
  type,
  url,
}: TableActionItemProps) => {
  const icon: Record<TableActionIcon, JSX.Element> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    study: <IconStudy />,
    view: <IconEye />,
    approve: <IconCheckCircle />,
    cancel: <IconCancel />,
    back: <IconUturn />,
  };

  if (url)
    return (
      <Link className="action-buttons" href={url} target={blank}>
        {" "}
        {icon[type]}
      </Link>
    );

  return (
    <button className="action-buttons" type="button" onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
