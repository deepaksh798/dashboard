"use client";

import { handleSubmit } from "@/lib/firebase/handleSubmit";
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

type Props = {
  open: boolean;
  onClose: () => void;
  afterSubmit: any;
};

const CreateNewAssistant = ({ open, onClose, afterSubmit }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    onSubmit: (values) => {
      handleSubmit(values);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assistant</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[100px] rounded-lg bg-[#8848ff] text-white flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span>AN</span>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
          <div className="space-y-4">
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
          <div className="space-y-4">
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
          <div className="space-y-4">
            <Label>Knowledge Base</Label>
            <Textarea
              name="knowledgeBase"
              placeholder="Write knowledge base here"
              value={formik.values.knowledgeBase}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-4">
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
          <div className="space-y-4">
            <Label>Greetings</Label>
            <Input
              name="greetings"
              placeholder="Starting words"
              value={formik.values.greetings}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-4">
            <Label>Farewell</Label>
            <Input
              name="farewell"
              placeholder="Ending words"
              value={formik.values.farewell}
              onChange={formik.handleChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#4C10BC] hover:bg-[#661EEB]"
          >
            Save Assistant
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAssistant;
