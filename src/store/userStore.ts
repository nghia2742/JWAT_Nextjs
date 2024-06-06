import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    count: number;
    increment: () => void;
}

const useUserStore = create<State>()(
    persist(
        (set) => {
            return {
                count: 0,
                increment: () => set((state) => ({ count: state.count + 1 })),
            };
        },
        {
            name: 'userStore',
        }
    )
);

export default useUserStore;
