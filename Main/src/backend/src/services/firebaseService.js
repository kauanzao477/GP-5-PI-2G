import { db } from "../config/firebase.js";

export const saveSiteData = async (data) => {
  const docRef = await db.collection("sites").add({
    ...data,
    createdAt: new Date(),
  });

  return docRef.id;
};