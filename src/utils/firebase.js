import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqJy4S-ZSYaZeTQTJ-nftbUxKzVydpLw0",
  authDomain: "herbal-app-d6c60.firebaseapp.com",
  projectId: "herbal-app-d6c60",
  storageBucket: "herbal-app-d6c60.appspot.com",
  messagingSenderId: "733006173662",
  appId: "1:733006173662:web:23f46821046da50024f94f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a reference to the file we want to download
const storage = getStorage(app);

export const getDownloadURLFromFirebaseRef = async (firebaseRef) => {
  const storageRef = ref(storage, firebaseRef);
  const url = await getDownloadURL(storageRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error(error);
    });

  return url;
};
