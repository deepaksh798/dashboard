"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AIAssistant from "@/components/AIAssistant";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppDispatch } from "@/lib/Redux/Hook/hook";
import { storeUserData } from "@/lib/Redux/Slice/vapiDataSlice";
import AppointmentPopup from "@/components/AppointmentPopup";

export default function Calendar() {
  const [openCallAssistant, setOpenCallAssistant] = useState(false);
  const [events, setEvents] = useState<{ title: string; start: Date }[]>([]);
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const events = [{ title: "appointment", start: new Date() }];

  const handleOpenCallAssistant = () => {
    setOpenCallAssistant(!openCallAssistant);
  };

  const handleFetchUserData = async () => {
    try {
      const response = await fetch("/api/");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Check if data structure is valid
      const userFunction = data?.data?.[0]?.function;
      if (!userFunction) {
        throw new Error("Invalid data format: Missing function key");
      }

      // Extract dateAndTime
      const date = userFunction?.arguments?.dateAndTime;
      if (date) {
        console.log(date);
        setEvents([{ title: "appointment", start: new Date(date) }]);
      }

      // Extract userData and dispatch
      const userData = userFunction.arguments;
      if (userData) {
        console.log("we are here");
        dispatch(storeUserData(userData)); // Dispatching to Redux
        setOpenDialogBox(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
      <AppointmentPopup
        open={openDialogBox}
        onClose={() => setOpenDialogBox(false)}
      />
    </div>
  );
}
