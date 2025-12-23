import { create } from 'zustand'

interface User {
    username: string;
    email: string;
    id:string;
  }

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        username: "John Doe",
        email: "john@example.com",
        id: "cmc3rlmzr0000fuzger5gl0p2"
      },
    setUser: (user) => set({ user }),
}));