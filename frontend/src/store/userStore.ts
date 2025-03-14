import { create } from 'zustand'

interface User {
    username: string;
    email: string;
  }

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        username: "bhuvan",
        email: "john@example.com",
      },
    setUser: (user) => set({ user }),
}));