import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Mỗi lần focus vào windown nó sẽ tự động fetch lại làm tốn tài nguyên --> false
        staleTime: 1000 * 60 * 10, // khi ng dùng truy cập vào trong 10p đó thì dữ liệu sẽ là mới và nó sẽ ko gọi api nữa lấy data trong cache ra hiển thị
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient(); // Server: luôn tạo client mới cho mỗi request (tránh share cache giữa user)
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(); // Browser: dùng chung một client duy nhất trong suốt vòng đời app

    return browserQueryClient;
  }
}
