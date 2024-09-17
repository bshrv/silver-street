import { create } from "zustand";

export const useImage = create((set) => ({
  images: [],
  setTheImage: (image: any) => set(() => ({ images: image })),
  addImage: (image: any) =>
    set((state: any) => {
      return {
        ...state,
        images: [...state.images, image],
      };
    }),
}));

export const useData = create((set) => ({
  livenessData: [],
  setLiveData: (data: any) => set(() => ({ livenessData: data })),
  addLiveData: (data: any) =>
    set((state: any) => {
      return {
        ...state,
        livenessData: [...state.livenessData, data],
      };
    }),
}));

type Hosts = {
  serverLocal: string;
  serverTesting: string;
  serverProduction: string;
};

export const useHost = create<Hosts>((set) => ({
  serverLocal: "http://localhost:9090",
  serverTesting: "http://172.29.2.35:9091",
  serverProduction: "",
}));

type TokenType = {
  globalToken: string | null;
  setGlobalToken: (token: string | null) => void;
};

export const useToken = create<TokenType>((set) => ({
  globalToken: "",
  setGlobalToken: (token: string | null) => set(() => ({ globalToken: token })),
}));
