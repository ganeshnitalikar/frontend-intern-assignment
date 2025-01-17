import { db } from "../config/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const profilesRef = collection(db, "profiles");

export const fetchProfiles = async () => {
  const snapshot = await getDocs(profilesRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProfileToFirebase = async (profile) => {
  await addDoc(profilesRef, profile);
};

export const deleteProfileFromFirebase = async (id) => {
  await deleteDoc(doc(profilesRef, id));
};
export const updateProfileInFirebase = async (docId, profileData) => {
  const profileDocRef = doc(db, "profiles", docId);
  await updateDoc(profileDocRef, profileData);
};
