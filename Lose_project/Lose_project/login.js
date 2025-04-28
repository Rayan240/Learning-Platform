// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
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
const db = getFirestore(app); // Firestore Initialization ✅

// Function for email
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Handle Sign-in
document.querySelector(".sign-in-form")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector(".sign-in-form input[type='email']").value.trim();
  const password = document.querySelector(".sign-in-form input[type='password']").value.trim();

  if (!email || !password) {
    alert("⚠️ Please enter both email and password.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("⚠️ Invalid email format.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // alert("✅ Login successful!");
      window.location.href = "index.html"; // Redirect to main page
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Error: " + error.message);
    });
});

// Handle Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("✅ Logged out successfully!");
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("❌ Error logging out: ", error);
    });
});
