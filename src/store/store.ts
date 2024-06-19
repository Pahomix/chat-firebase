import { create } from "zustand";

interface StoreState {

}

const useStore = create<StoreState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	friends: [],
	setFriends: (friends) => set({ friends }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useStore;