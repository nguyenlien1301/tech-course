export interface QueryFilter {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
  active?: boolean;
  option?: string;
}

export interface QuerySearchParams {
  searchParams: QueryFilter;
}

export interface MenuField {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}

export type QuerySortFilter = "recent" | "oldest";
export type BadgeStatusVariant = "default" | "success" | "warning" | "danger";
export type RatingIcon = "awesome" | "good" | "meh" | "bad" | "terrible";
