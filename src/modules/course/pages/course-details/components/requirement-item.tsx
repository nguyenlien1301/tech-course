import { IconCheck } from "@/shared/components/icons";

const RequirementItem = ({ title }: { title: string }) => {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-primary p-1 text-white">
        <IconCheck className="size-4" />
      </span>
      <span>{title}</span>
    </div>
  );
};

export default RequirementItem;
