import { useEffect, useState, useRef } from "react";
import AppShell from "../components/AppShell";
import Leaderboard from "../components/Leaderboard";
import ScreamGauge from "../components/ScreamGauge";
import { messaging, requestPermission } from "../firebase";
import { getToken } from "firebase/messaging";
import { firestore, auth, db } from "../firebase.js";

import { doc, set, ref, increment } from "firebase/database";
import { get } from "http";
import Countdown from "react-countdown";

export default function Home() {
  const [stream, setStream] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioSum = useRef(0);
  const audioDatapoints = useRef(0);

  useEffect(() => {
    const getAudio = async () => {
      let s;
      try {
        s = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setStream(s);
      } catch (e) {
        console.log(e);
        alert("Allow microphone access on this site.");
        return;
      }

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyzer = audioCtx.createAnalyser();
      analyzer.fftSize = 32;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      const source = audioCtx.createMediaStreamSource(s);
      source.connect(analyzer);
      const loop = () => {
        requestAnimationFrame(loop);
        analyzer.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(avg);
        // console.log(avg, audioSum + 1, audioDatapoints + 1)
        if (audioSum) {
          audioSum.current += avg;
        }
        if (audioDatapoints) {
          audioDatapoints.current += 1;
        }
      };
      loop();
    };
    getAudio();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      
      const lastSecondAvg = (audioSum?.current || 0) / (audioDatapoints?.current || 1)
      set(
        ref(db, `players/${auth.currentUser.uid}`),
        {
          displayName: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          noiseScore: increment(audioDatapoints.current > 0 ? lastSecondAvg : 0)
        }
      )
      audioSum.current = 0;
      audioDatapoints.current = 0;
      
    }, 1000);
    return () => clearInterval(interval);
  }, [audioSum, audioDatapoints]);

  return audioLevel !== undefined ? (
    <AppShell title="Assemble Drops">
      <div className="flex flex-col sm:flex-row gap-8">
        <ScreamGauge value={audioLevel} />
        <Leaderboard />
      </div>
    </AppShell>
  ) : null;
}
