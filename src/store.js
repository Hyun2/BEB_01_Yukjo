import create from 'zustand';

export const useStore = create((set) => ({
	web3: '',
	setWeb3: (web3) =>
		set(() => ({
			web3,
		})),
	account: '',
	setAccount: (account) => set(() => ({ account })),
	isLoading: false,
	setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));
