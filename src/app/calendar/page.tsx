"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const events = [{ title: "Meeting", start: new Date() }];

  return (
    <div className="text-white">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        // Optionally, you can set some additional FullCalendar options here
        dayCellClassNames={() => "bg-gray-100"} // Example Tailwind class for day cells
      />
    </div>
  );
}
