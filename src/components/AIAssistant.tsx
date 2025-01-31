import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useState } from "react";
import animationData from "../../public/lottie.json";
import Lottie from "react-lottie";
import vapi from "@/lib/vapi";

type Props = {
  handleOpenCallAssistant: () => void;
  handleFetchUserData: () => void;
};

const AIAssistant = ({
  handleOpenCallAssistant,
  handleFetchUserData,
}: Props) => {
  const [callStatus, setCallStatus] = useState("Disconnected");
  const [callMute, setCallMute] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false); // State to control Lottie animation
  // vapi call
  const handleStartCall = async () => {
    console.log("running handleStartCall");

    try {
      setCallStatus("Connecting...");
      vapi.start("b091c4fe-079e-479c-83a6-89a3fad5fac4");
      setCallStatus("Connected");
      vapi.on("call-start", () => setCallStatus("Call Started"));
      vapi.on("speech-start", () => {
        setIsSpeaking(true);
      });
      vapi.on("speech-end", () => {
        setIsSpeaking(false);
      });
      vapi.on("call-end", () => {
        setCallStatus("Call Ended");
        setIsSpeaking(false);
        handleFetchUserData();
      });
      vapi.on("message", (message) => {
        console.log("messages -->", message.messages);
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
    console.log("newMuteState-------------->", newMuteState);

    setCallMute(newMuteState);
    if (newMuteState) {
      vapi.setMuted(false);
    } else {
      vapi.setMuted(true);
    }
  };
  // lottie animation
  const options = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-[#141414]/30 backdrop-blur-lg p-[60px]">
      {/* <div className="flex flex-col items-center"> */}
      <div className="flex justify-center items-center w-[376px] bg-[#D7FE66]/60 h-auto rounded-3xl p-7">
        <div className="bg-[#D7FE66] rounded-3xl">
          <Image
            src="/call_agent.png"
            alt="call-agent"
            height={268}
            width={264}
          />
        </div>
      </div>

      <div>
        <Lottie
          options={options}
          isStopped={!isSpeaking}
          isPaused={!isSpeaking}
          height={200}
          width={200}
        />
      </div>
      <div
        className={`border py-1 px-3 rounded-full flex gap-2 text-[16px] w-fit ${
          ["Call Started", "Connected"].includes(callStatus)
            ? "border-[#1FFF18] text-[#1FFF18]"
            : callStatus === "Connecting..."
            ? "border-[#FFD700] text-[#FFD700]"
            : ["Disconnected", "Error", "Call Ended"].includes(callStatus)
            ? "border-[#FF0000] text-[#FF0000]"
            : "border-[#FFFFFF] text-[#FFFFFF]"
        }`}
      >
        <Icon icon="material-symbols:call" width="24" height="24" />
        {callStatus}
      </div>
      <div className="w-full h-[84px] bg-[#585858] rounded-full flex items-center justify-evenly">
        <div
          className="bg-[#E08A00] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => handleCallMute()}
        >
          {callMute === true ? (
            <Icon icon="mingcute:volume-fill" width="24" height="24" />
          ) : (
            <Icon icon="streamline:volume-off" width="24" height="24" />
          )}
        </div>
        <div
          className="h-[70px] w-[70px] bg-gradient-to-r from-[#666666] via-[#a5a4a4] to-[#666666] rounded-full flex justify-center items-center cursor-pointer"
          onClick={handleStartCall}
        >
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
  );
};

export default AIAssistant;
