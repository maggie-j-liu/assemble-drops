import React from "react";
import "../styles/globals.css";
import { PlayersDataProvider } from "../context/PlayersDataContext";
import LoadingScreen from "../components/LoadingScreen";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

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
