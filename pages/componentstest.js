import AppShell from "../components/AppShell";
import ScreamGauge from "../components/ScreamGauge";
import Leaderboard from "../components/Leaderboard";
import { useState, useEffect } from "react";
export default function ComponentsTest() {
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

  return audioLevel !== undefined ? (
    <AppShell>
      <div className="flex flex-col gap-8 sm:flex-row">
        <ScreamGauge value={audioLevel} />
        <Leaderboard />
      </div>
    </AppShell>
  ) : null;
}
