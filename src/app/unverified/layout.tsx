"use client";
import { redirect, useSearchParams } from "next/navigation";

export default function Layout({ children }: any) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    redirect("/");
  }

  return <>{children}</>;
}
