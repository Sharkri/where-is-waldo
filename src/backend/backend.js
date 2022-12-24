import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import getFirebaseConfig from "./firebase-config";

async function getCollectionDocs(collectionName) {
  const { docs } = await getDocs(collection(getFirestore(), collectionName));
  return docs.map((document) => document.data());
}

async function getDocData(path) {
  // Get a doc in the Firebase database.
  const reference = doc(getFirestore(), path);
  const docInfo = await getDoc(reference);
  return docInfo.data();
}

async function getImage(url) {
  const storage = getStorage();
  const imageUrl = await getDownloadURL(ref(storage, url));
  return imageUrl;
}

async function updateCollectionDoc(path, value) {
  // Update an entry in the Firebase database.
  const reference = doc(getFirestore(), path);
  return updateDoc(reference, value);
}

initializeApp(getFirebaseConfig());
getPerformance();

export { getCollectionDocs, getImage, updateCollectionDoc, getDocData };
