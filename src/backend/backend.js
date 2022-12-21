import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import getFirebaseConfig from "./firebase-config";

async function getCollectionDocs(collectionName) {
  const { docs } = await getDocs(collection(getFirestore(), collectionName));

  return docs.map((document) => document.data());
}

async function getImage(url) {
  const storage = getStorage();
  const imageUrl = await getDownloadURL(ref(storage, url));
  return imageUrl;
}

initializeApp(getFirebaseConfig());
getPerformance();

export { getCollectionDocs, getImage };