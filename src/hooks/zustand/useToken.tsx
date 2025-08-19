import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface login {
  token: string;
  setToken: (token: string) => void;
}

const useToken = create<login>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'aedi-token', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useToken;
