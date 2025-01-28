import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import animationData from "../../public/lottie.json";
import Lottie from "react-lottie";
import vapi from "@/lib/vapi";

type Props = {
  handleOpenCallAssistant: () => void;
};

const AIAssistant = ({ handleOpenCallAssistant }: Props) => {
  const [callStatus, setCallStatus] = useState("Disconnected");
  const [callMute, setCallMute] = useState(true);

  useEffect(() => {
    handleStartCall();
  }, []);

  // vapi call
  const handleStartCall = async () => {
    console.log("running handleStartCall");

    try {
      setCallStatus("Connecting...");
      vapi.start("b091c4fe-079e-479c-83a6-89a3fad5fac4");
      setCallStatus("Connected");
      vapi.on("call-start", () => setCallStatus("Call Started"));
      vapi.on("call-end", () => setCallStatus("Call Ended"));
      vapi.on("message", (message) => {
        console.log("messages -->", message);
      });
      vapi.on("error", (e) => {
        console.error("VAPI Error:", e);
        setCallStatus("Error");
      });
    } catch (error) {
      console.error("Error starting VAPI call:", error);
      setCallStatus("Error");
    }
  };

  const handleStopCall = () => {
    vapi.stop();
    setCallStatus("Disconnected");
    handleOpenCallAssistant();
  };
  const handleCallMute = () => {
    const newMuteState = !callMute;
    setCallMute(newMuteState);
    vapi.setMuted(newMuteState);
  };

  // lottie animation
  const options = {
    loop: true,
    autoplay: true, // Change to false if you don't want auto play
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="inset-0 absolute h-full w-full flex justify-end z-10 bg-transparent/40">
      <div
        className="flex flex-col justify-between h-full max-h-[1200px] w-auto bg-[#141414]/30 backdrop-blur-lg fixed p-[60px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-[376px] bg-[#D7FE66]/60 h-[337px] rounded-3xl">
            <div className="relative h-[268px] w-[264px] bg-[#D7FE66] rounded-3xl">
              <Image src="/call_agent.png" alt="call-agent" fill />
            </div>
          </div>
          <div className="mt-2">status: {callStatus}</div>
        </div>
        <div>
          <Lottie options={options} height={200} width={200} />
        </div>
        <div className="w-full h-[84px] bg-[#585858] mb-[60px] rounded-full flex items-center justify-evenly">
          <div
            className="bg-[#E08A00] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleCallMute}
          >
            {callMute === true ? (
              <Icon icon="mingcute:volume-fill" width="24" height="24" />
            ) : (
              <Icon icon="streamline:volume-off" width="24" height="24" />
            )}
          </div>
          <div className="h-[70px] w-[70px] bg-gradient-to-r from-[#666666] via-[#a5a4a4] to-[#666666] rounded-full flex justify-center items-center cursor-pointer">
            <Icon icon="material-symbols:mic" width="30" height="30" />
          </div>
          <div
            className="bg-[#EB0000] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleStopCall}
          >
            <Icon icon="maki:cross" width="24" height="24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
