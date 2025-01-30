import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/Redux/Hook/hook";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DialogTitle } from "@radix-ui/react-dialog";

dayjs.extend(utc);

interface DialogBox {
  open: boolean;
  onClose: () => void;
}

const AppointmentPopup: React.FC<DialogBox> = ({ open, onClose }) => {
  const data = useAppSelector<any>(
    (state) => state.vapiCustomerData.userDetails
  );
  console.log("AppointmentPopup->", data);

  // Extract data from store
  const customerName = data?.customerName || "Appointment";
  const dateAndTime = data?.dateAndTime || "";

  // Format date for Google Calendar
  let googleCalendarLink = "#"; // Default link

  if (dateAndTime) {
    const startDate = dayjs(dateAndTime).utc().format("YYYYMMDDTHHmmss[Z]");
    const endDate = dayjs(dateAndTime)
      .add(1, "hour")
      .utc()
      .format("YYYYMMDDTHHmmss[Z]");

    googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      customerName
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      "Your scheduled appointment"
    )}`;
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="flex flex-col items-center bg-[#414141]">
        <DialogTitle className="text-white text-center">
          Click here to schedule your appointment on your Google Calendar
        </DialogTitle>
        <div>
          <a
            href={googleCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Schedule</Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentPopup;
