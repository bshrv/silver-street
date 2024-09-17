"use client";
import { useState, useEffect } from "react";
import {
  FaceLivenessDetectorCore,
  AwsCredentialProvider,
} from "@aws-amplify/ui-react-liveness";
import { Loader, ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useHost, useData } from "@/components/zustand";
import toast from "react-hot-toast";
import * as dotenv from "dotenv";
Amplify.configure(outputs);
dotenv.config();

export default function Home() {
  const { serverLocal, serverTesting } = useHost();
  const { setLiveData }: any = useData();

  const [loading, setLoading] = useState(true);
  const [createLivenessApiData, setCreateLivenessApiData] = useState<any>();

  const router = useRouter();

  const accessId = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
  const accessSecret = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;

  if (!accessId && !accessSecret) {
    console.log("No environment variable found");
  }

  const backHome = () => {
    toast.error((t) => (
      <div className="flex gap-x-4 items-center">
        <h1 className="font-medium">Are you sure?</h1>
        <button
          className="bg-rose-500 py-1 px-3 rounded-lg text-[#FCFBF4] font-bold"
          onClick={() => {
            toast.dismiss(t.id);
            router.push("/");
          }}
        >
          ✅Yes✅
        </button>
      </div>
    ));
  };

  const credentialProvider: AwsCredentialProvider = async () => {
    return {
      accessKeyId: accessId || "fallback",
      secretAccessKey: accessSecret || "fallback",
    };
  };

  useEffect(() => {
    const fetchCreateLiveness: () => Promise<void> = async () => {
      try {
        await axios
          .post(`${serverTesting}/create-liveness`)
          .then((response) => {
            setCreateLivenessApiData(response.data);
            console.log("Fetch create liveness: ", response.data);
          });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete: () => Promise<void> = async () => {
    console.log(createLivenessApiData);

    try {
      const res: any = await axios.post(
        `${serverTesting}/get-liveness-results`,
        {
          SessionId: createLivenessApiData,
        }
      );

      const data = res.data;
      setLiveData(data);

      if (data.Confidence > 0) {
        router.push(`/liveness/${data.Confidence}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <ThemeProvider>
        {loading ? (
          <Loader />
        ) : (
          <FaceLivenessDetectorCore
            sessionId={createLivenessApiData.SessionId}
            region="ap-northeast-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={(error) => {
              console.log(error);
            }}
            config={{ credentialProvider }}
          />
        )}
      </ThemeProvider>
      <button
        onClick={backHome}
        className="text-[#FCFBF4] border-[1px] border-rose-500 px-3 py-2 rounded-md hover:scale-110 ease-in-out duration-300"
      >
        Click here if the liveness isn&apos;t working
      </button>
    </div>
  );
}
