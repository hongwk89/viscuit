import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Info {
  company: string;
  country: string;
  address: string;
  address2?: string;
  city: string;
  zipCode: string;
  mobileCode?: string;
  mobileNumber?: string;
}

interface InfoState extends Info {
  password: string;
  email: string;
  phone?: string;
  bill_email: string;
  setContact: (info: Info) => void;
  setContactEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useContact = create<InfoState>()(
  persist(
    (set) => ({
      email: '',
      password: '',
      company: '',
      country: '',
      address: '',
      address2: '',
      city: '',
      zipCode: '',
      mobileCode: '',
      mobileNumber: '',
      bill_email: '',
      phone: '',
      setContact: (info: Info) => set((prev) => ({ ...prev, ...info })),
      setContactEmail: (email: string) => set((prev) => ({ ...prev, email })),
      setPassword: (password: string) => set((prev) => ({ ...prev, password })),
    }),
    {
      name: 'aedi-signUp', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useContact;
