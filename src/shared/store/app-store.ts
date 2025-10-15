import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// Khai báo ts
interface GlobalState {
  shouldExpandedPlayer: boolean;
  setShouldExpandedPlayer: (expanded: boolean) => void;
}

// useGlobalStore: Dùng để setState cho chức năng mở rộng video
export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        // shouldExpandedPlayer: set trạng thái ban đầu là false
        shouldExpandedPlayer: false,
        setShouldExpandedPlayer: (expanded) =>
          set({ shouldExpandedPlayer: expanded }),
      }),
      {
        name: "global-storage",
      },
    ),
  ),
);
