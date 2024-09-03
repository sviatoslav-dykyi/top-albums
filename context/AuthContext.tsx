import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuthData, removeAuthData, storeAuthData } from "../utils/auth";

type AuthContext = {
  auth: string;
  handleLogout: () => Promise<void>;
  handleLogin: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContext>(undefined!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuthData();
      setAuth(data as string);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await removeAuthData();
    setAuth("");
  };

  const handleLogin = async (email: string) => {
    await storeAuthData(email);
    setAuth(email);
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
