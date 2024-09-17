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
import { useHost, useData, useToken } from "@/components/zustand";
import toast from "react-hot-toast";
import * as dotenv from "dotenv";
Amplify.configure(outputs);
dotenv.config();

export default function Home() {
  // tokens and sessionids
  const { globalToken } = useToken();

  // server
  const { serverLocal, serverTesting } = useHost();
  const { setLiveData }: any = useData();

  // usestates
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [createLivenessApiData, setCreateLivenessApiData] = useState<any>();

  // router for pushing
  const router = useRouter();

  // environment and credentials

  const accessId = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
  const accessSecret = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;

  const credentialProvider: AwsCredentialProvider = async () => {
    return {
      accessKeyId: accessId || "fallback",
      secretAccessKey: accessSecret || "fallback",
    };
  };

  const onStart = () => {
    setStart(true);
  };

  if (!accessId && !accessSecret) {
    console.log("No environment variable found");
  }

  useEffect(() => {
    const fetchCreateLiveness: () => Promise<void> = async () => {
      if (!globalToken) {
        console.error("No token available");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${serverTesting}/create-liveness`, {
          token: globalToken,
        });
        setCreateLivenessApiData(response.data);
      } catch (error) {
        console.error("Error creating liveness:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreateLiveness();
  }, [globalToken, serverTesting, start]);

  const handleAnalysisComplete: () => Promise<void> = async () => {
    try {
      const res: any = await axios.post(`${serverTesting}/liveness-results`, {
        SessionId: createLivenessApiData,
      });

      const data = res.data;
      setLiveData(data);

      if (data.Confidence > 0) {
        router.push(`/liveness/${data.Confidence}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (start) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThemeProvider>
          {loading ? (
            <Loader />
          ) : (
            <FaceLivenessDetectorCore
              sessionId={createLivenessApiData.sessionId}
              region="ap-northeast-1"
              onAnalysisComplete={handleAnalysisComplete}
              onError={(error) => {
                console.log(error);
              }}
              config={{ credentialProvider }}
            />
          )}
        </ThemeProvider>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <button onClick={onStart} className="btn">
          Start
        </button>
      </div>
    );
  }
}
