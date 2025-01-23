"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const events = [{ title: "Meeting", start: new Date() }];
  return (
    <div>
      <div className="text-white">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          //   eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}
