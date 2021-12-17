import create from "zustand";

export const useStore = create((set) => ({
  web3: "",
  setWeb3: (web3) =>
    set(() => ({
      web3,
    })),
  account: "",
  setAccount: (account) => set(() => ({ account })),
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  erc721list: [],
  setErc721list: (erc721list) => set(() => ({ erc721list })),
  erc20list: [],
  setErc20list: (newToken) =>
    set((prevState) => {
      return { erc20list: [...prevState.erc20list, newToken] };
    }),
}));
