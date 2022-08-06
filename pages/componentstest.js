import AppShell from "../components/AppShell";
import RandomScreamGauge from "../components/RandomScreamGauge";
import Leaderboard from "../components/Leaderboard";
export default function ComponentsTest() {
  return (
    <AppShell>
      <div className="flex w-full flex-row gap-8">
        <RandomScreamGauge />
        <Leaderboard />
      </div>
    </AppShell>
  );
}
