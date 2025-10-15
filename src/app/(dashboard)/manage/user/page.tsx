import { UserManageContainer } from "@/modules/user/pages";
import { QuerySearchParams } from "@/shared/types";

const UserPageRoot = ({ searchParams }: QuerySearchParams) => {
  return <UserManageContainer searchParams={searchParams} />;
};

export default UserPageRoot;
