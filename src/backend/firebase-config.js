const config = {
  apiKey: "AIzaSyArvGTZkx2p07ngm3xFp0GKnPN1_47xFqU",
  authDomain: "where-is-waldo-3e672.firebaseapp.com",
  projectId: "where-is-waldo-3e672",
  storageBucket: "where-is-waldo-3e672.appspot.com",
  messagingSenderId: "249584777200",
  appId: "1:249584777200:web:bc9c34e1abce201c408f35",
  measurementId: "G-LZR4MLGENM",
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
