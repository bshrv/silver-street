"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useData, useImage, useHost } from "@/components/zustand";
import axios from "axios";

export default function Home() {
  const [comparison, setComparison] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(0);
  const [secondPhoto, setSecondPhoto] = useState("");
  const { serverLocal, serverTesting } = useHost();
  const { livenessData }: any = useData();
  const { images, setTheImage }: any = useImage();
  const [status, setStatus] = useState(true);
  const params = useParams<{ confidence: string }>();
  const confidence: any = params.confidence;
  const router = useRouter();

  const liveness = () => {
    setTheImage([]);
    router.push("/");
  };

  const checkStatus = () => {
    if (confidence > 70) {
      setStatus(true);
      return;
    } else {
      setStatus(false);
      return;
    }
  };

  function bytesToBase64(bytes: { [key: string]: number }): string {
    // Convert the object to an array of byte values
    const byteArray = Object.values(bytes);

    // Create a Buffer from the byte array
    const buffer = Buffer.from(byteArray);

    // Convert the Buffer to a base64 string
    return buffer.toString("base64");
  }

  function removeBase64Prefix(base64String: string) {
    const prefix = "data:image/jpeg;base64,";
    if (base64String.startsWith(prefix)) {
      return base64String.slice(prefix.length);
    }
    return base64String; // Return the original string if it doesn't start with the prefix
  }

  function removeSpace(base64String: string) {
    const prefix = " ";
    if (base64String.startsWith(prefix)) {
      return base64String.slice(prefix.length);
    }
    return base64String; // Return the original string if it doesn't start with the prefix
  }

  const fetchCompareFaces = async () => {
    try {
      const base64live = removeSpace(
        bytesToBase64(livenessData.ReferenceImage.Bytes)
      );
      const base64take = removeBase64Prefix(images);
      // const livenessPhoto = "data:image/jpeg;base64," + base64live;
      // console.log(livenessPhoto);

      console.log({ base64live, base64take });

      setSecondPhoto(base64live);

      const response = await axios.post(`${serverTesting}/compare`, {
        livenessPhoto: base64live,
        takenPhoto: base64take,
      });

      const data = response.data;

      console.log(data);

      setComparisonResult(Math.round(data.FaceMatches[0].Similarity));

      if (data.FaceMatches.length > 0) {
        setComparison(true);
      }

      if (data.FaceMatches.length === 0) {
        setComparison(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkStatus();
    fetchCompareFaces();
  }, []);

  const percent = Math.round(confidence);

  const fail = "text-rose-400";
  const success = "text-[#5cdb9a]";

  const failtext =
    "Failure, " +
    percent +
    "% possible spoof. Please try again and hold still.";
  const successtext = "Success, You are " + percent + "% likely to be real.";

  return (
    <main className="text-[#FCFBF4] w-screen h-screen flex flex-col justify-center items-center text-center">
      <div className="w-[40%] py-6 bg-[#460147]/30 rounded-md flex flex-col items-center justify-center gap-y-4 drop-shadow-lg px-12">
        <h1 onClick={fetchCompareFaces} className="text-xl">
          <u>The current confidence rating is:</u>
        </h1>
        <div className="flex gap-4">
          <h1 className="text-[80px] font-bold">{percent}%</h1>
          {comparison ? (
            <h1 className={`${status ? success : fail} text-[80px] font-bold`}>
              {comparisonResult}%
            </h1>
          ) : null}
        </div>

        <h1 className={`text-lg font-bold ${status ? success : fail}`}>
          {status ? successtext : failtext}
        </h1>

        {comparison ? (
          <h1 className={`text-lg font-bold ${status ? success : fail}`}>
            Your face comparison results are: {comparisonResult}%
          </h1>
        ) : (
          <h1 className={`${fail} text-xl font-black`}>
            The comparison results have failed. Your face does not match the
            PHOTO
          </h1>
        )}
        <div className="flex gap-6">
          <img className="w-[300px] h-auto" src={`${images}`} />
          <img
            className="w-[300px] h-auto"
            src={`data:image/jpeg;base64,${secondPhoto}`}
          />
        </div>

        <button
          onClick={liveness}
          className="border-[1px] px-3 py-2 rounded-md hover:scale-110 ease-in-out duration-300"
        >
          Click here to try Face liveness again
        </button>
      </div>
    </main>
  );
}
