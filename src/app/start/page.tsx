"use client";
import WebcamComponent from "@/components/webcam";

export default function Home() {
  return (
    <main className="text-[#FCFBF4] w-screen h-screen flex justify-center flex-col items-center">
      <div className="sm:w-[30%] w-[90%] rounded-[5px] flex flex-col justify-center items-center drop-shadow-lg gap-y-6">
        <h1 className="text-3xl font-bold text-center">
          First we need a comparison photo for Face Comparison
        </h1>
        <h1 className="text-xl text-rose-300 font-bold text-center">
          Please look directly at the camera!
        </h1>
        <WebcamComponent />
      </div>
    </main>
  );
}
