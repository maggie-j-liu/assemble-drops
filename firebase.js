// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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
export const firestore = getFirestore(app);
export const auth = getAuth();
export const db = getDatabase(app);
/* 
export const messaging = getMessaging(app);

messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // Update the UI to include the received message.
  appendMessage(payload);
});

function resetUI() {
  clearMessages();
  showToken("loading...");
  messaging
    .getToken({
      vapidKey:
        "BGFq2XnE8yUuexm2FNbxj5WmUHZ6lOwaDmk-qVWy_9ZIQCufIE7VPTT3KN1T2pdZ74Sz4iY2bNeOzi_gJ3g0Txo",
    })
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      showToken("Error retrieving registration token. ", err);
      setTokenSentToServer(false);
    });
}

function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector("#token");
  tokenElement.textContent = currentToken;
}

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        "unless it changes"
    );
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve a registration token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      resetUI();
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

function deleteToken() {
  // Delete registration token.
  messaging
    .getToken()
    .then((currentToken) => {
      messaging
        .deleteToken(currentToken)
        .then(() => {
          console.log("Token deleted.");
          setTokenSentToServer(false);
          // Once token is deleted update UI.
          resetUI();
        })
        .catch((err) => {
          console.log("Unable to delete token. ", err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving registration token. ", err);
      showToken("Error retrieving registration token. ", err);
    });
}

resetUI();
 */
