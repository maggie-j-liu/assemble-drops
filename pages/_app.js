import React from "react";
import "../styles/globals.css";
import { PlayersDataProvider } from "../context/PlayersDataContext";
import LoadingScreen from "../components/LoadingScreen";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAuthProvider>
      <PlayersDataProvider>
        <LoadingScreen>
          <Component {...pageProps} />
        </LoadingScreen>
      </PlayersDataProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
