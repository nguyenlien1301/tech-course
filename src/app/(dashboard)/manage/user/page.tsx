import { UserManagePage } from "@/modules/user/pages";
import { QuerySearchParams } from "@/shared/types";

const UserPageRoot = ({ searchParams }: QuerySearchParams) => {
  return <UserManagePage searchParams={searchParams} />;
};

export default UserPageRoot;
