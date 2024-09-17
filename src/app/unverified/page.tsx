"use client";
import { useToken } from "@/components/zustand";
import axios from "axios";
import { useSearchParams, redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type VerifyToken = {
  status: string;
  message: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [permissed, setPermissed] = useState(false);
  const [verification, setVerification] = useState(false);
  const { setGlobalToken } = useToken();
  const router = useRouter();

  const host = process.env.NEXT_PUBLIC_API_HOST;
  const port = process.env.NEXT_PUBLIC_API_PORT;

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissed(true);
    } catch (error) {
      console.log("Camera access denied: ", error);
      setPermissed(false);
    }
  };

  const verifyToken = async () => {
    try {
      const response: VerifyToken = await axios.get(
        `${host}:${port}/verify?token=${token}`
      );

      if (response.status === "Verified") {
        // Token verified successfully
        console.log("Token verified");
        setVerification(true);
        // You can add additional logic here, such as redirecting the user
      } else {
        console.error("Token verification failed");
        setVerification(false);
        redirect("/");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
    }
  };

  useEffect(() => {
    requestCameraPermission();
    verifyToken();
  }, []);

  useEffect(() => {
    if (permissed && verification) {
      localStorage.setItem("token", token || "null");
      setGlobalToken(token);
      router.push(`/verified?token=${token}`);
    }
  }, [verification, permissed]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-[#FFFFFF] gap-4">
      <h1 className="font-bold sm:text-[30px]">Verification in progress</h1>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}
