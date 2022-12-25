import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getCollectionDocs, getImage, pushToDocArray } from "../backend";

jest.mock("firebase/app", () => ({ initializeApp: jest.fn() }));
jest.mock("firebase/performance", () => ({ getPerformance: jest.fn() }));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
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

it("should push to array using arrayUnion", async () => {
  doc.mockReturnValueOnce("mock reference");
  getFirestore.mockReturnValueOnce("fake firestore");
  arrayUnion.mockReturnValueOnce("some array value");

  await pushToDocArray("fake_path/12345", "array_name", "some array value");

  // should be called with the firestore instance and doc path
  expect(doc).toHaveBeenCalledWith("fake firestore", "fake_path/12345");

  // should be called with reference and new changes
  expect(updateDoc).toHaveBeenCalledWith("mock reference", {
    array_name: "some array value",
  });
});
