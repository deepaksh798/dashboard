"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AIAssistant from "@/components/AIAssistant";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import AppointmentPopup from "@/components/AppointmentPopup";
import { fetchUserData } from "@/lib/Redux/Slice/vapiDataSlice";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [openCallAssistant, setOpenCallAssistant] = useState(false);
  const [events, setEvents] = useState<{ title: string; start: Date }[]>([]);
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Select userDetails from Redux
  const userDetails = useAppSelector(
    (state) => state.vapiCustomerData.userDetails
  );

  // handle Fetch User data
  const handleFetchUserData = () => {
    dispatch(fetchUserData());
  };

  // Update events when userDetails changes
  useEffect(() => {
    if (userDetails?.dateAndTime) {
      setEvents([
        { title: "Appointment", start: new Date(userDetails.dateAndTime) },
      ]);
      setOpenDialogBox(true);
    }
  }, [userDetails]);

  return (
    <div className="text-white flex h-full no-scrollbar overflow-hidden">
      <div className="w-full p-8 h-full">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="dayGridWeek"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
        {/* <Button onClick={handleFetchUserData}>Click</Button> */}
      </div>
      <div className="w-auto h-full">
        <AIAssistant
          handleOpenCallAssistant={() =>
            setOpenCallAssistant(!openCallAssistant)
          }
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
