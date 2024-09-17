import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const ubuntu = localFont({
  src: [
    {
      path: "./Ubuntu/Ubuntu-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Ubuntu/Ubuntu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Ubuntu/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Ubuntu/Ubuntu-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Ubuntu/Ubuntu-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Ubuntu/Ubuntu-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Ubuntu/Ubuntu-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Ubuntu/Ubuntu-BoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Rekognition",
  description: "Face liveness and rekognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-r from-cyan-500 to-blue-500 ${ubuntu.className}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
