"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/user";
import {
  errorNotification,
  loadingNotification,
  successNotification,
} from "@/helpers/notification";
import { axiosClient } from "@/axios";
import { useRouter } from "next/navigation";
import { parseError } from "@/helpers/general";

type AuthContextType = {
  user: User | null;
  login: (_data: { email: string; password: string }) => void;
  logout: () => void;
  signup: (_data: { email: string; password: string }) => void;
};

const AuthContextDefaultValues: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
};

const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);

export function useAuthContext() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();

  // State
  const [user, setUser] = useState<User | null>(null);

  // Functions
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      loadingNotification("Logging in...", { id: "login" });
      const { data } = await axiosClient.post<{
        message: string;
        user: User;
      }>("/login", { email, password });

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      successNotification("Logged in successfully!", { id: "login" });
      router.push("/");
    } catch (error) {
      errorNotification(parseError(error) || "Failed to login", {
        id: "login",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      loadingNotification("Signing up...", { id: "signup" });

      const { data } = await axiosClient.post<{
        message: string;
        userId: string;
      }>("/signup", { email, password });

      setUser({ id: data.userId, email, bookmarks: [] });
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.userId, email, bookmarks: [] }),
      );
      successNotification("Signed up successfully!", { id: "signup" });
      router.push("/");
    } catch (error) {
      errorNotification(parseError(error) || "Failed to signing up", {
        id: "signup",
      });
    }
  };

  // Effects
  // Effect to check if the user is already logged in and set the user state
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
