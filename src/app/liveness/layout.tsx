"use client";
import { useToken } from "@/components/zustand";
import { useRouter } from "next/navigation";

export default function Layout({ children }: any) {
  const { globalToken } = useToken();
  const router = useRouter();

  if (!globalToken) {
    router.push("/");
  }

  return <>{children}</>;
}
