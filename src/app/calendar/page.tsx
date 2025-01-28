"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import AIAssistant from "@/components/AIAssistant";

export default function Calendar() {
  const [openCallAssistant, setOpenCallAssistant] = useState(false);
  const events = [{ title: "Meeting", start: new Date() }];

  const handleOpenCallAssistant = () => {
    setOpenCallAssistant(!openCallAssistant);
  };

  return (
    <div className="relative text-white p-8">
      <div className="w-full flex justify-end mb-4 ">
        {/* Assistent Call button */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => handleOpenCallAssistant()}
        >
          <div className="bg-[#D7FE66] gap-[10px] px-2 text-black flex items-center w-[200px] h-11 rounded-full">
            <Icon icon="material-symbols:call" width="24" height="24" />
            Call Agent
          </div>
          <span className="absolute right-0 h-[50px] w-[50px] bg-[#333333] flex justify-center rounded-full border border-[#D7FE66] overflow-hidden">
            <Image
              src="/call_agent.png"
              alt="call-agent"
              height={42}
              width={42}
              className="object-bottom "
            />
          </span>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        // Optionally, you can set some additional FullCalendar options here
        dayCellClassNames={() => "bg-gray-100"} // Example Tailwind class for day cells
      />

      {openCallAssistant && (
        <AIAssistant handleOpenCallAssistant={handleOpenCallAssistant} />
      )}
    </div>
  );
}
