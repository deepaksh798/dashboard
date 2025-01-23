"use client";

// import { handleSubmit } from "@/lib/firebase/handleSubmit";
import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assistantSchema } from "@/lib/validationSchema";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "@/lib/Redux/Hook/hook";
import { createAssistant } from "@/lib/Redux/Slice/cardDataSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  afterSubmit: any;
};

const CreateNewAssistant = ({ open, onClose, afterSubmit }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      image: null,
      name: "",
      yourAgent: "",
      knowledgeBase: "",
      language: "english",
      voice: "michael",
      greetings: "",
      farewell: "",
    },
    validationSchema: assistantSchema,
    onSubmit: async (values) => {
      console.log("Assistent-values", values);
      const assistantData = {
        name: values.name,
        your_agent: values.yourAgent,
        description: values.knowledgeBase,
        language: values.language,
        voice: values.voice,
        first_message: values.greetings,
        end_call_message: values.farewell,
      };
      console.log("Final-values", assistantData);

      await dispatch(createAssistant(assistantData));
      // handleSubmit(values);
      formik.resetForm();
      onClose();
      afterSubmit();
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file);
    }
  };

  const handleCloseDialog = () => {
    formik.resetForm();
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="no-scrollbar flex flex-col items-center justify-center rounded-lg text-white bg-[#414141] border-none max-w-[700px] h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create New Assistant</DialogTitle>
        </DialogHeader>
        {/* <div className=" overflow-y-auto h-[80vh] w-full"> */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 items-center w-full"
        >
          {/* Image input */}
          <div className="relative ">
            <div className="w-[100px] h-[100px] rounded-3xl bg-[#616161] text-white flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="flex flex-col items-center text-[#D7FE66]">
                  {formik.values.name ? (
                    formik.values.name
                      .split(" ")
                      .map((word: any | null) => word[0])
                      .join("")
                      .toUpperCase()
                  ) : (
                    <>
                      <Icon
                        icon="mdi:image-add-outline"
                        width="24"
                        height="24"
                      />
                      <div className="underline underline-offset-2 text-sm">
                        Add Profile
                      </div>
                    </>
                  )}
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex gap-6 w-full">
            {/* Name input */}
            <div className="space-y-4 w-full">
              <Label>Your Name</Label>
              <Input
                name="name"
                placeholder="Assistant Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            {/* Agent input */}
            <div className="space-y-4 w-full">
              <Label>Your Agent</Label>
              <Input
                name="yourAgent"
                placeholder="Agent Type"
                value={formik.values.yourAgent}
                onChange={formik.handleChange}
              />
              {formik.touched.yourAgent && formik.errors.yourAgent && (
                <div className="text-red-500 text-sm">
                  {formik.errors.yourAgent}
                </div>
              )}
            </div>
          </div>
          {/* knowledge input */}
          <div className="space-y-4 w-full">
            <Label>Knowledge Base</Label>
            <Textarea
              name="knowledgeBase"
              placeholder="Write knowledge base here"
              value={formik.values.knowledgeBase}
              onChange={formik.handleChange}
            />
          </div>
          {/* ////// */}
          {/* Language input */}
          <div className="space-y-4 w-full">
            <Label>Select Language</Label>
            <Select
              value={formik.values.language}
              onValueChange={(value) => formik.setFieldValue("language", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-6 w-full">
            {/* Greetings input */}
            <div className="space-y-4 w-full">
              <Label>Greetings</Label>
              <Input
                name="greetings"
                placeholder="Starting words"
                value={formik.values.greetings}
                onChange={formik.handleChange}
              />
            </div>

            {/* Farewell input */}
            <div className="space-y-4 w-full">
              <Label>Farewell</Label>
              <Input
                name="farewell"
                placeholder="Ending words"
                value={formik.values.farewell}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full rounded-full h-10">
            Save Assistant
          </Button>
        </form>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAssistant;
