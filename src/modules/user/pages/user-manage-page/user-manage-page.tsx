import { QuerySearchParams } from "@/shared/types";

import UserManageContainer from "./components";

const UserManagePage = async ({ searchParams }: QuerySearchParams) => {
  // const userData = await fetchUsers({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   status: searchParams.status,
  // });

  // if (!userData) return null;
  // const { total, users } = userData;

  return <UserManageContainer searchParams={searchParams} />;
};

export default UserManagePage;
