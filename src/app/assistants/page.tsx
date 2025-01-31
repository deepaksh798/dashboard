"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LuPlus } from "react-icons/lu";
import CreateNewAssistant from "@/components/CreateNewAssistant";
import ChatDialog from "@/components/ChatDialog";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchData } from "@/lib/Redux/Slice/cardDataSlice";

const Assistants = () => {
  const [cardData, setCardData] = useState<any[]>([
    {
      image: "",
      name: "Rajat Saraswat",
      your_agent: "Developer",
      voice: "emily",
    },
    {
      image: "",
      name: "Deepak",
      your_agent: "Developer",
      voice: "james",
    },
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.cardData);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  //Handle test call
  const handleTestCall = (assistant: any) => {
    setCurrentAssistant(assistant);
    setOpenDialog(true);
  };

  // console.log("voice-->", data[1]?.voice);

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between my-10">
        <h1 className="text-2xl font-semibold mb-6">Assistants</h1>
        <Button
          className="flex h-11 rounded-full"
          onClick={() => setOpenForm(true)}
        >
          <LuPlus />
          Create New
        </Button>
      </div>

      <div className="flex flex-wrap gap-6">
        {cardData.map((assistant: any, index: any) => (
          <div
            key={index}
            className="w-[360px] h-auto bg-[#414141] hover:bg-[#6e6e6e] p-6 space-y-4 rounded-lg"
          >
            <div className="flex  ">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-[#D7FE66] flex items-center justify-center text-xl font-bold text-white rounded-lg overflow-hidden">
                  {assistant.image ? (
                    <Image
                      // src={URL.createObjectURL(assistant.image)}
                      src={assistant?.image}
                      height={64}
                      width={64}
                      alt={assistant?.name || "Assistant"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-[#333333]">
                      {assistant?.name
                        ?.split(" ")
                        .map((word: any) => word[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="">
                  <h2 className="text-xl font-medium">{assistant?.name}</h2>
                  <span className="text-sm font-medium text-[#BEBEBE]">
                    {assistant?.your_agent}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-medium text-[16px]">Agent:</div>
              <div className="flex items-center gap-[10px] text-[#D7FE66]">
                <span className="text-lg">{assistant?.voice?.voice_id}</span>
                <Icon icon="mynaui:play-waves-solid" width="24" height="24" />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                className=" w-full h-12 rounded-full"
                onClick={() => handleTestCall(assistant)}
              >
                Test Call
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ChatDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        assistant={currentAssistant}
      />

      <CreateNewAssistant
        open={openForm}
        onClose={() => setOpenForm(false)}
        afterSubmit={() => dispatch(fetchData())}
      />
    </div>
  );
};

export default Assistants;
