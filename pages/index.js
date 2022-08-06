import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import ScreamGauge from "../components/ScreamGauge";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";

export default function Home() {
  const [stream, setStream] = useState(null);
  const [audioLevel, setAudioLevel] = useState();
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
      };
      loop();
    };
    getAudio();
  }, []);
  const requestNotifPermissions = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey:
        "BGFq2XnE8yUuexm2FNbxj5WmUHZ6lOwaDmk-qVWy_9ZIQCufIE7VPTT3KN1T2pdZ74Sz4iY2bNeOzi_gJ3g0Txo",
    });
    console.log(token);
  };
  return audioLevel !== undefined ? (
    <AppShell>
      <ScreamGauge value={audioLevel} />
      Audio level: {audioLevel}
      <button onClick={() => requestNotifPermissions()}>Get token</button>
    </AppShell>
  ) : null;
}
