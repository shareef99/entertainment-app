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
import { MovieOrShow } from "@/types/tmdb";

type AuthContextType = {
  user: User | null;
  login: (_data: { email: string; password: string }) => void;
  logout: () => void;
  signup: (_data: { email: string; password: string }) => void;
  addBookmark: (_movieOrShow: MovieOrShow) => void;
  removeBookmark: (_id: number) => void;
};

const AuthContextDefaultValues: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  addBookmark: () => {},
  removeBookmark: () => {},
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
      }>("/api/login", { email, password });

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
      }>("/api/signup", { email, password });

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

  const addBookmark = async (movieOrShow: MovieOrShow) => {
    try {
      loadingNotification("Adding bookmark...", {
        id: `addBookmark ${movieOrShow.id}`,
      });

      if (!user) {
        errorNotification("Please login to add bookmark", {
          id: `addBookmark ${movieOrShow.id}`,
        });
        return;
      }

      const updatedUser = {
        ...user,
        bookmarks: [...user.bookmarks, movieOrShow],
      };

      await axiosClient.put("/api/bookmark", {
        email: user.email,
        bookmarks: updatedUser.bookmarks,
      });

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      successNotification("Added bookmark successfully!", {
        id: `addBookmark ${movieOrShow.id}`,
      });
    } catch (error) {
      errorNotification(parseError(error) || "Failed to add bookmark", {
        id: `addBookmark ${movieOrShow.id}`,
      });
    }
  };

  const removeBookmark = async (id: number) => {
    try {
      loadingNotification("Removing bookmark...", {
        id: `removeBookmark ${id}`,
      });

      if (!user) {
        errorNotification("Please login to remove bookmark", {
          id: `removeBookmark ${id}`,
        });
        return;
      }

      const updatedUser = {
        ...user,
        bookmarks: user.bookmarks.filter((x) => x.id !== id),
      };

      await axiosClient.put("/api/bookmark", {
        email: user.email,
        bookmarks: updatedUser.bookmarks,
      });

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      successNotification("Removed bookmark successfully!", {
        id: `removeBookmark ${id}`,
      });
    } catch (error) {
      errorNotification(parseError(error) || "Failed to remove bookmark", {
        id: `removeBookmark ${id}`,
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
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
