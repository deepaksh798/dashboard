import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebaseConfig";
// import { assistantSchema } from "../validationSchema";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export const handleSubmit = async (values: any) => {
//   try {
//     const newDocRef = collection(db, "assistants"); // Use a unique key
//     const docRef = await addDoc(newDocRef, values);
//     console.log("Assistant saved to Firebase!");
//   } catch (error) {
//     console.error("Error saving assistant:", error);
//   }
// };

export const handleSubmit = async (values: any) => {
  try {
    // Upload image if it exists
    let imageUrl = "";
    if (values.image) {
      const imageRef = ref(storage, `assistants/${values.image.name}`);
      await uploadBytes(imageRef, values.image);
      imageUrl = await getDownloadURL(imageRef); // Get image URL
    }

    values.image = imageUrl;

    values.created_at = new Date();

    // Add data to Firestore
    const newDocRef = collection(db, "assistants");
    await addDoc(newDocRef, values);
    console.log("Assistant saved to Firebase!");
  } catch (error) {
    console.error("Error saving assistant:", error);
  }
};
