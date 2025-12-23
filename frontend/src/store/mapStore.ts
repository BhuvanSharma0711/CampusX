import { create } from "zustand";

type MapTarget = {
  id: string;
  name: string;
  lng: number;
  lat: number;
} | null;

type MapStore = {
  target: MapTarget;
  setTarget: (target: MapTarget) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));
