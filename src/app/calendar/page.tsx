"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AIAssistant from "@/components/AIAssistant";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  const [openCallAssistant, setOpenCallAssistant] = useState(false);
  const [data, setData] = useState<any>();
  const [events, setEvents] = useState<{ title: string; start: Date }[]>([]);

  // const events = [{ title: "appointment", start: new Date() }];

  const handleOpenCallAssistant = () => {
    setOpenCallAssistant(!openCallAssistant);
  };

  const handleFetchUserData = () => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => {
        const date = data?.data[0].function?.arguments?.["Date and Time"];
        if (date) {
          console.log(date);

          setEvents([{ title: "appointment", start: new Date(date) }]);
        }
      });
  };
  // useEffect(() => {
  //   fetch("/api/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const date = data?.data[0].function?.arguments?.["Date and Time"];
  //       if (date) {
  //         console.log(date);

  //         setEvents([{ title: "appointment", start: new Date(date) }]);
  //       }
  //     });
  // }, []);

  // console.log("/calendar>data--", data);

  return (
    <div className=" text-white flex h-full">
      <div className="w-full p-8 h-full">
        <FullCalendar
          plugins={[timeGridPlugin, timeGridPlugin, dayGridPlugin]}
          initialView="dayGridWeek"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>

      <div className="w-auto h-full">
        <AIAssistant
          handleOpenCallAssistant={handleOpenCallAssistant}
          handleFetchUserData={handleFetchUserData}
        />
      </div>
    </div>
  );
}
