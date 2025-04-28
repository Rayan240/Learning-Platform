// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
const db = getFirestore(app);  // ✅ Initialize Firestore

// Function for email validation
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Handle Sign-up
document.querySelector(".sign-up-form")?.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Select form inputs correctly
  const nameInput = document.querySelector(".sign-up-form input[placeholder='Username']");
  const emailInput = document.querySelector(".sign-up-form input[placeholder='Email']");
  const passwordInput = document.querySelector(".sign-up-form input[placeholder='Password']");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  // Validate input fields
  if (!name || !email || !password) {
    alert("⚠️ Please fill out all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("⚠️ Invalid email format.");
    return;
  }

  if (password.length < 6) {
    alert("⚠️ Password must be at least 6 characters.");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: name,
      email: email,
      uid: user.uid,
      createdAt: new Date()
    });

    alert(`✅ Welcome, ${name}! Your account has been created.`);
    window.location.href = "login.html";  // Redirect to login page
  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ Error: " + error.message);
  }
});
