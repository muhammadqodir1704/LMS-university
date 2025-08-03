"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Foydalanuvchi ma'lumotlarining interfeysi
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  roles: string[];
  profileImageId: string | null;
}

// 2. Context tipi
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// 3. Context yaratish
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Provider komponent
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Custom hook – useUser
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
