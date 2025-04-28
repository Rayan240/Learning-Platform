// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR7zwMD6FlGXiPIqnErr2IIV4pWHU8Djg",
  authDomain: "codehive-login.firebaseapp.com",
  projectId: "codehive-login",
  storageBucket: "codehive-login.appspot.com",
  messagingSenderId: "268589397490",
  appId: "1:268589397490:web:bbc40468c86c3efcca276b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to Fetch Only Username, User ID, and Email
async function fetchUserProfile(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();

    // Display Data in Profile Fields
    document.getElementById("user-name").innerHTML = `<u>${userData.username}</u>`;
    document.getElementById("profile-name").textContent = userData.username;
    document.getElementById("profile-id").textContent = userData.uid || "N/A";
    document.getElementById("profile-email").textContent = userData.email;
    document.getElementById("profile-email").href = `mailto:${userData.email}`;
  } else {
    console.log("User data not found.");
  }
}

// Check User Authentication
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchUserProfile(user.uid);
  } else {
    alert("Please log in to view your profile.");
    window.location.href = "login.html";
  }
});
