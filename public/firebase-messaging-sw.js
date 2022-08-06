importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging.js');
 
const firebaseConfig = {
  apiKey: "AIzaSyB8jjt0Ocodx2m_1g19msPNf9xWGjwyVU0",
  authDomain: "assemble-drops.firebaseapp.com",
  projectId: "assemble-drops",
  storageBucket: "assemble-drops.appspot.com",
  messagingSenderId: "781074132289",
  appId: "1:781074132289:web:0c56eea76c0c85503745c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});