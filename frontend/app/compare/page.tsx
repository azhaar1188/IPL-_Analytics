"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

export default function ComparePage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [compareType, setCompareType] = useState("batting");
  const [bowlingPlayers, setBowlingPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/ipl-2025-batting-stats.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));

      fetch("/data/ipl-2025-bowling-stats.json")
  .then((res) => res.json())
  .then((data) => setBowlingPlayers(data));
  }, []);

 const currentPlayers =
  compareType === "batting" ? players : bowlingPlayers;

const selectedPlayer1 = currentPlayers.find(
  (player: any) => player.player === player1
);

const selectedPlayer2 = currentPlayers.find(
  (player: any) => player.player === player2
);

return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 px-8">
        <h1 className="text-5xl font-bold mb-10">
          Player Comparison
        </h1>

        <div className="flex gap-4 mb-8">
  <button
    onClick={() => {
  setCompareType("batting");
  setPlayer1("");
  setPlayer2("");
}}
    className={`px-6 py-3 rounded-xl font-bold ${
      compareType === "batting"
        ? "bg-orange-500"
        : "bg-zinc-800"
    }`}
  >
    Batting Comparison
  </button>

  <button
    onClick={() => {
  setCompareType("bowling");
  setPlayer1("");
  setPlayer2("");
}}
    className={`px-6 py-3 rounded-xl font-bold ${
      compareType === "bowling"
        ? "bg-purple-600"
        : "bg-zinc-800"
    }`}
  >
    Bowling Comparison
  </button>
</div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <select
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
          >
            <option value="">Select Player 1</option>

            {(compareType === "batting" ? players : bowlingPlayers).map((player: any) => (
              <option key={player.player} value={player.player}>
                {player.player}
              </option>
            ))}
          </select>

          <select
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
          >
            <option value="">Select Player 2</option>

            {currentPlayers.map((player: any) => (
              <option key={player.player} value={player.player}>
                {player.player}
              </option>
            ))}
          </select>
        </div>

        {selectedPlayer1 && selectedPlayer2 && (
  <div className="bg-zinc-900 rounded-2xl p-6">
    <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
  Player Comparison
</h2>

    <div className="grid grid-cols-3 gap-4 text-center">
      <p className="font-bold">{selectedPlayer1.player}</p>
      <p className="text-zinc-400">Stat</p>
      <p className="font-bold">{selectedPlayer2.player}</p>

     {compareType === "batting" && (
  <>
    <p>{selectedPlayer1.runs}</p>
    <p className="text-orange-400">Runs</p>
    <p>{selectedPlayer2.runs}</p>

    <p>{selectedPlayer1.matches}</p>
    <p className="text-orange-400">Matches</p>
    <p>{selectedPlayer2.matches}</p>

    <p>{selectedPlayer1.average}</p>
    <p className="text-orange-400">Average</p>
    <p>{selectedPlayer2.average}</p>

    <p>{selectedPlayer1.strikeRate}</p>
    <p className="text-orange-400">Strike Rate</p>
    <p>{selectedPlayer2.strikeRate}</p>

    <p>{selectedPlayer1.hundreds}</p>
    <p className="text-orange-400">100s</p>
    <p>{selectedPlayer2.hundreds}</p>

    <p>{selectedPlayer1.fifties}</p>
    <p className="text-orange-400">50s</p>
    <p>{selectedPlayer2.fifties}</p>
  </>
)}

{compareType === "bowling" && (
  <>
    <p>{selectedPlayer1.wickets}</p>
    <p className="text-purple-400">Wickets</p>
    <p>{selectedPlayer2.wickets}</p>

    <p>{selectedPlayer1.matches}</p>
    <p className="text-purple-400">Matches</p>
    <p>{selectedPlayer2.matches}</p>

    <p>{selectedPlayer1.overs}</p>
    <p className="text-purple-400">Overs</p>
    <p>{selectedPlayer2.overs}</p>

    <p>{selectedPlayer1.average}</p>
    <p className="text-purple-400">Average</p>
    <p>{selectedPlayer2.average}</p>

    <p>{selectedPlayer1.economy}</p>
    <p className="text-purple-400">Economy</p>
    <p>{selectedPlayer2.economy}</p>

    <p>{selectedPlayer1.strikeRate}</p>
    <p className="text-purple-400">Strike Rate</p>
    <p>{selectedPlayer2.strikeRate}</p>
  </>
)}
    </div>
  </div>
)}

      </div>
    </main>
  );
}