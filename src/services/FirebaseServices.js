import { db } from "../config/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const profilesRef = collection(db, "profiles");

export const fetchProfiles = async () => {
  const snapshot = await getDocs(profilesRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProfileToFirebase = async (profile) => {
  await addDoc(profilesRef, profile);
};

export const deleteProfileFromFirebase = async (profileId) => {
  try {
    const q = query(collection(db, "profiles"), where("id", "==", profileId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;

      await deleteDoc(docRef);
      console.log("Profile deleted successfully.");
    } else {
      console.error("No document found with the provided profileId.");
    }
  } catch (error) {
    console.error("Error deleting profile from Firebase:", error);
    throw error;
  }
};

export const updateProfileInFirebase = async (docId, profileData) => {
  const profileDocRef = doc(db, "profiles", docId);
  await updateDoc(profileDocRef, profileData);
};
