// Import necessary Firebase modules (use the Firebase SDK v9 modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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
const db = getFirestore(app);

// Adding a course to Firestore (this is an example function you might call when adding a new course)
async function addCourse(courseData) {
    try {
        const docRef = await addDoc(collection(db, "courses"), courseData);
        console.log("Course added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Example of course data to be added
const newCourse = {
    title: "JavaScript for Beginners",
    description: "A comprehensive guide to learning JavaScript from scratch.",
    price: 29.99
};

// Call addCourse function to add the course to Firestore (you can trigger this based on form input)
addCourse(newCourse);

// Fetching courses from Firestore
async function fetchCourses() {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const coursesList = document.getElementById("courses-list");
    querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        
        // Create course element
        const courseElement = document.createElement("div");
        courseElement.classList.add("course");

        // Add course details to the element
        courseElement.innerHTML = `
            <h3>${courseData.title}</h3>
            <p>${courseData.description}</p>
            <span>Price: $${courseData.price}</span>
            <button>Enroll Now</button>
        `;

        // Append course element to the courses list
        coursesList.appendChild(courseElement);
    });
}

// Call fetchCourses when the page loads
window.onload = fetchCourses;


  // // Select the menu button, menu close button, and the navigation menu
// const menuBtn = document.getElementById("menu-btn");
// const menuClose = document.getElementById("menu-close");
// const navigation = document.querySelector(".navigation ul");
// const logoutBtn = document.getElementById("logout-btn");
// const cartList = document.getElementById("cart-list");
// const cartCount = document.getElementById("cart-count");
// const cartIcon = document.getElementById("cart-icon");

// // Firebase authentication setup
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// const auth = getAuth();

// // Logout function
// if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//         signOut(auth).then(() => {
//             alert("Logged out successfully!");
//             localStorage.removeItem("cart"); // Clear cart on logout
//             window.location.href = "login.html"; // Redirect to login page
//         }).catch((error) => {
//             console.error("Error logging out: ", error);
//         });
//     });
// }

// // Ensure menu elements exist before adding event listeners
// if (menuBtn && menuClose && navigation) {
//     menuBtn.addEventListener("click", () => navigation.classList.add("active"));
//     menuClose.addEventListener("click", () => navigation.classList.remove("active"));

//     navigation.addEventListener("click", (event) => {
//         if (event.target.tagName === "A") {
//             navigation.classList.remove("active");
//         }
//     });
// }

// // Course data
// const courses = [
//     { img: "IP_IMG/html.jpeg", title: "HTML Full Course", price: "$32.99" },
//     { img: "IP_IMG/video.jpg", title: "AdobeShop Full Course", price: "$32.99" },
//     { img: "IP_IMG/js.jpg", title: "JavaScript Full Course", price: "$32.99" },
//     { img: "c++.png", title: "C++ Full Course", price: "$32.99" },
//     { img: "flutter.jpeg", title: "Flutter Full Course", price: "$32.99" },
//     { img: "IP_IMG/java.jpeg", title: "Java Full Course", price: "$32.99" },
//     { img: "IP_IMG/Python.png", title: "Python Full Course", price: "$32.99" },
//     { img: "IP_IMG/css.jpeg", title: "CSS Full Course", price: "$32.99" }
// ];

// let cart = [];

// // Load cart from localStorage
// function loadCart() {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//         cart = JSON.parse(storedCart);
//         updateCart();
//     }
// }

// // Save cart to localStorage
// function saveCart() {
//     localStorage.setItem("cart", JSON.stringify(cart));
// }

// // Add course to cart
// function addToCart(courseTitle) {
//     const course = courses.find(c => c.title === courseTitle);
//     if (!cart.find(item => item.title === courseTitle)) {
//         cart.push(course);
//         saveCart();
//         updateCart();
//     }
// }

// // Remove course from cart
// function removeFromCart(title) {
//     cart = cart.filter(item => item.title !== title);
//     saveCart();
//     updateCart();
// }

// // Update cart UI
// function updateCart() {
//     if (!cartList || !cartCount) return;
    
//     cartList.innerHTML = "";
//     cart.forEach(course => {
//         const li = document.createElement("li");
//         li.innerHTML = `${course.title} - ${course.price} <button onclick="removeFromCart('${course.title}')">Remove</button>`;
//         cartList.appendChild(li);
//     });
//     cartCount.textContent = cart.length;
// }

// // Attach event listeners to "Add to Cart" buttons
// function attachAddToCartListeners() {
//     document.querySelectorAll(".course-btn a").forEach(button => {
//         button.addEventListener("click", event => {
//             event.preventDefault();
//             const courseTitle = event.target.closest(".details")?.querySelector("h6")?.textContent;
//             if (courseTitle) {
//                 addToCart(courseTitle);
//             }
//         });
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     attachAddToCartListeners();
//     loadCart();
// });
