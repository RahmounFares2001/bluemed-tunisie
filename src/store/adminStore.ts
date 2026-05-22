import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_PASSWORD } from "@/constants/strings";

interface AdminState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "bmg_admin_auth", skipHydration: true }
  )
);
