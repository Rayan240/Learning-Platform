// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Reference to the Firestore collection where courses are stored
const coursesRef = db.collection("courses");

// Fetch courses and display them
function fetchCourses() {
    coursesRef.get()
        .then((querySnapshot) => {
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
        })
        .catch((error) => {
            console.error("Error getting courses: ", error);
        });
}

// Call the fetch function when the page loads
window.onload = fetchCourses;
