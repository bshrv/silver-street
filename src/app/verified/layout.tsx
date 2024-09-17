"use client";
import { useToken } from "@/components/zustand";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: any) {
  const [token, setToken] = useState("");
  const { globalToken } = useToken();
  const router = useRouter();

  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }

  if (!globalToken && !token) {
    router.push("/");
  }

  return <>{children}</>;
}
