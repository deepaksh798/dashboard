"use client";

import React, { useEffect, useState } from "react";
import { RiVoiceprintFill } from "react-icons/ri";
import CreateNewAssistant from "@/components/CreateNewAssistant";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Assistants = () => {
  const [openForm, setOpenForm] = useState(false);
  const [assistants, setAssistants] = useState<any[]>([]);

  const fetchAssistants = async () => {
    try {
      const assistantsQuery = query(
        collection(db, "assistants"),
        orderBy("created_at", "desc")
      );
      const querySnapshot = await getDocs(assistantsQuery);

      const assistantsList: any[] = [];
      querySnapshot.forEach((doc) => {
        assistantsList.push({ id: doc.id, ...doc.data() });
      });
      setAssistants(assistantsList); // Store the fetched assistants in state
    } catch (error) {
      console.error("Error fetching assistants: ", error);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const handleCreateAssistant = () => {
    setOpenForm(false); // Close the form after submission
    fetchAssistants();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Assistants</h1>
      <div className="flex justify-between">
        <div className="relative w-[366px] h-full flex items-center mb-8 border rounded-lg">
          <span className="absolute left-[10px]">
            <IoIosSearch />
          </span>
          <Input
            type="text"
            placeholder="Search Something"
            className="h-full border-none pl-10 py-3"
          />
        </div>
        <Button
          className="flex h-11 bg-[#4C10BC] hover:bg-[#661EEB]"
          onClick={() => setOpenForm(true)}
        >
          <LuPlus />
          Create New
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        {assistants.map((assistant, index) => (
          <div
            key={index}
            className="w-[300px] h-auto border border-[#BBBBBB] p-6 space-y-4 rounded-lg"
          >
            <div className="flex justify-center ">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 bg-[#8848ff] flex items-center justify-center text-xl font-bold text-white rounded-lg overflow-hidden">
                  {assistant.image ? (
                    <Image
                      // src={URL.createObjectURL(assistant.image)}
                      src={assistant.image}
                      height={64}
                      width={64}
                      alt={assistant.name || "Assistant"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span>
                      {assistant.name
                        ?.split(" ")
                        .map((word: any) => word[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-medium">{assistant.name}</h2>
                  <span className="text-sm font-medium text-[#666666]">
                    {assistant.yourAgent}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RiVoiceprintFill className="h-6 w-6" />
                  <span>{assistant.voice}</span>
                </div>
              </div>
            </div>
            <hr className="bg-[#BBBBBB] h-[1.5px]" />
            <div className="flex justify-between">
              <Button className="bg-[#4C10BC] hover:bg-[#661EEB] w-full h-12">
                Test Call
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CreateNewAssistant
        open={openForm}
        onClose={() => setOpenForm(false)}
        afterSubmit={handleCreateAssistant}
      />
    </div>
  );
};

export default Assistants;
