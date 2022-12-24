import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getCollectionDocs,
  getImage,
  updateCollectionDoc,
  ,
} from "../backend";

jest.mock("firebase/app", () => ({ initializeApp: jest.fn() }));
jest.mock("firebase/performance", () => ({ getPerformance: jest.fn() }));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));
jest.mock("../firebase-config.js", () => () => ({
  apiKey: "12345",
  authDomain: "google.com",
  projectId: "abc",
  storageBucket: "google.com",
  messagingSenderId: "54321",
  appId: "abcdef",
  measurementId: "test",
}));

it("should get collection docs", async () => {
  getDocs.mockReturnValueOnce(
    Promise.resolve({
      docs: [{ data: () => "fake data" }, { data: () => "fake data 2" }],
    })
  );
  const collectionName = "test";
  collection.mockReturnValueOnce(collectionName);
  getFirestore.mockReturnValueOnce("mock firestore instance");

  const result = await getCollectionDocs(collectionName);
  expect(collection).toBeCalledWith("mock firestore instance", collectionName);
  expect(getDocs).toBeCalledWith(collectionName);
  expect(result).toEqual(["fake data", "fake data 2"]);
});

it("should get image", async () => {
  getStorage.mockReturnValueOnce("mock storage");
  ref.mockReturnValueOnce("fake ref");
  getDownloadURL.mockReturnValueOnce("retrievedfake.png");

  const result = await getImage("fake.png");

  expect(getStorage).toHaveBeenCalledTimes(1);
  expect(ref).toHaveBeenCalledWith("mock storage", "fake.png");
  expect(getDownloadURL).toBeCalledWith("fake ref");
  expect(result).toBe("retrievedfake.png");
});

it("should update doc", async () => {
  // const reference = doc(getFirestore(), path);
  // await updateDoc(reference, value);
  doc.mockReturnValueOnce("fake doc");
  getFirestore.mockReturnValueOnce("fake firestore");

  await updateCollectionDoc("fake_path/12345", "new value");

  expect(doc).toHaveBeenCalledWith("fake firestore", "fake_path/12345");
  expect(updateDoc).toHaveBeenCalledWith("fake doc", "new value");
});
