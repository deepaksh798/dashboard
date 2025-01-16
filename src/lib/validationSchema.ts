// utils/validationSchema.ts
import * as Yup from "yup";

export const assistantSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  yourAgent: Yup.string().required("Occupation is required"),
  knowledgeBase: Yup.string(),
  language: Yup.string(),
  greetings: Yup.string(),
  farewell: Yup.string(),
  // voice: Yup.string(),
});
