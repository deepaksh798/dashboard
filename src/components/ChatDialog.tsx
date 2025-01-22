"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import vapi from "@/lib/vapi";

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
  assistant: { name: string; id: string };
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  open,
  onClose,
  assistant,
}) => {
  const [callStatus, setCallStatus] = useState("Disconnected");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  console.log("assistant==>", assistant);

  useEffect(() => {
    if (open) {
      handleStartCall();
    }
    return () => {
      if (open) {
        handleStopCall();
      }
    };
  }, [open]);

  // handle Start Call
  const handleStartCall = async () => {
    try {
      setCallStatus("Connecting...");
      vapi.start("7b906e60-7542-4dd1-ad92-a4ca65866793");
      setCallStatus("Connected");

      vapi.on("call-start", () => setCallStatus("Call Started"));
      vapi.on("call-end", () => setCallStatus("Call Ended"));
      vapi.on("message", (message) => {
        if (
          message.type === "add-message" &&
          message.message.role === "assistant"
        ) {
          const response = message.message.content;
          setChatLog((prev) => [...prev, `Assistant: ${response}`]);
          speakText(response);
        }
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
    onClose();
  };

  const startListening = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setChatLog((prev) => [...prev, `You: ${transcript}`]);
      vapi.send({
        type: "add-message",
        message: {
          role: "user",
          content: transcript,
        },
      });
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-white">
          Chat with {assistant?.name}
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <div className="text-white">Status: {callStatus}</div>
          <div className="chat-log bg-[#333] p-4 rounded-lg h-64 overflow-y-auto">
            {chatLog.map((msg, idx) => (
              <div key={idx} className="text-white mb-2">
                {msg}
              </div>
            ))}
          </div>
          <Button onClick={startListening} disabled={isListening}>
            {isListening ? "Listening..." : "Talk"}
          </Button>
          <Button onClick={handleStopCall}>End Call</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
