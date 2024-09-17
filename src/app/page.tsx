"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [permissed, setPermissed] = useState(false);

  const router = useRouter();

  const start = () => {
    router.push("/start");
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      console.log("Permission granted");
      setPermissed(true);
    } catch (error) {
      console.log("Camera access denied: ", error);
      setPermissed(false);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <main className="text-[#FCFBF4] w-screen h-screen flex justify-center flex-col items-center">
      <div className="sm:w-[30%] w-[90%] rounded-[5px] flex flex-col justify-center items-center drop-shadow-lg gap-y-6">
        <h1 className="text-3xl font-bold text-center">
          Welcome to
          <br />
          <span>Face Liveness</span> and <span>Face Compare</span>
        </h1>
        <p className="">
          This is a test bench prepared to test out AWS face liveness.
        </p>
        <div className="sm:w-[80%] w-[90%] text-justify">
          <p>
            This is an HTTP test bench so the camera is secured, to enable it
            open this url in another tab:
          </p>
          <p className="text-rose-400 font-bold">
            chrome://flags/#unsafely-treat-insecure-origin-as-secure
          </p>
          <p>
            then please add{" "}
            <span className="text-rose-400 font-bold">
              http://172.29.2.35:3005/
            </span>{" "}
            as a trusted url, set the setting to enabled and then relaunch
            <b> CHROME </b>.
          </p>
        </div>
        {permissed ? (
          <button
            onClick={start}
            className="border-[1px] px-3 py-2 rounded-md hover:scale-110 ease-in-out duration-300"
          >
            Let&apos;s get started
          </button>
        ) : (
          <button
            onClick={requestCameraPermission}
            className="border-[1px] border-rose-500 text-rose-500 px-3 py-2 rounded-md hover:scale-110 ease-in-out duration-300"
          >
            Please provide camera permissions
          </button>
        )}
      </div>
    </main>
  );
}
