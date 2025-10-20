import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { Favorite } from "@/shared/types/models";

import { fetchFavorites } from "../../actions";

export const useQueryFavorites = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_FAVORITES, userId],
    queryFn: async () => {
      if (!userId) return []; // tránh lỗi khi user chưa đăng nhập
      const response: Favorite[] = await fetchFavorites(userId);

      // Trả về danh sách courseId cho dễ xử lý
      return response.map((fav) => fav.course.toString());
    },
    enabled: !!userId, // chỉ chạy khi có userId
  });
};
