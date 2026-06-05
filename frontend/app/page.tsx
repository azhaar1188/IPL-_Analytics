"use client";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
const [players, setPlayers] = useState([]);
const [teams, setTeams] = useState([]);
const [pointsTable, setPointsTable] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [player1, setPlayer1] = useState("");
const [player2, setPlayer2] = useState("");
const [darkMode, setDarkMode] = useState(true);
const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
const [sortBy, setSortBy] = useState("");
const [matches, setMatches] = useState([]);
const fetchIPLData = async () => {

  try {

    setLoading(true);

    const [playersRes, matchesRes] = await Promise.all([

      fetch("http://127.0.0.1:8000/players"),

      fetch("http://127.0.0.1:8000/matches")

    ]);

    if (!playersRes.ok || !matchesRes.ok) {
      throw new Error("API Failed");
    }

    const playersData = await playersRes.json();

    const matchesData = await matchesRes.json();

    setPlayers(playersData.players || []);

    setTeams(playersData.teams || []);

    setMatches(matchesData.data || []);

    setError("");

  } catch (err) {

    console.error(err);

    setError("Backend server is not running");

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  fetch("/data/points-table.json")
    .then((res) => res.json())
    .then((data) => {
      setPointsTable(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Could not load points table");
      setLoading(false);
    });

}, []);
    
const filteredPlayers = (players || [])
  .filter((player: any) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a: any, b: any) => {
    if (sortBy === "runs") {
      return b.runs - a.runs;
    }

    if (sortBy === "strike_rate") {
      return b.strike_rate - a.strike_rate;
    }

    return 0;
  });
const selectedPlayer1 = players.find(
  (player: any) => player.name === player1
);

const selectedPlayer2 = players.find(
  (player: any) => player.name === player2
);

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold animate-pulse">
        Loading IPL Analytics...
      </h1>
    </main>
  );
}

if (error) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-red-500">
      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          {error}
        </h1>

        <p className="text-zinc-400">
          Please start FastAPI backend server
        </p>

      </div>
    </main>
  );
}
  return (
    <main
  className={`min-h-screen p-8 transition-all duration-500 ${
    darkMode
      ? "bg-gradient-to-b from-black to-zinc-900 text-white"
      : "bg-gradient-to-b from-gray-100 to-white text-black"
  }`}
>
<Navbar />  
<div className="pt-20 px-4 md:px-8">
      <div>
  <h2 className="text-3xl font-bold mb-6">
    IPL Points Table
  </h2>

  <div className="overflow-x-auto md:overflow-visible">
  <table className="min-w-[800px] md:min-w-0 w-full table-fixed bg-zinc-900 rounded-2xl overflow-hidden">
  <thead className="bg-zinc-700">
    <tr>
      <th className="w-16 p-4 text-left">Pos</th>
      <th className="w-64 p-4 text-left">Team</th>
      <th className="p-4 text-center">P</th>
      <th className="p-4 text-center">W</th>
      <th className="p-4 text-center">L</th>
      <th className="p-4 text-center">NR</th>
      <th className="p-4 text-center">Pts</th>
      <th className="p-4 text-center">NRR</th>
    </tr>
  </thead>

  <tbody>
    {pointsTable.map((team: any) => (
      <tr
        key={team.position}
        className="border-b border-zinc-700 hover:bg-zinc-700/40 transition"
      >
        <td className="w-16 p-4 font-bold">
          {team.position}
        </td>

        <td className="w-64 p-4">
          <div className="flex items-center gap-3">
            <img
              src={team.logo}
              alt={team.team}
              className="w-8 h-8 object-contain"
            />

            <span className="font-semibold">
              {team.team}
            </span>
          </div>
        </td>

        <td className="p-4 text-center">{team.played}</td>
        <td className="p-4 text-center text-green-400">{team.won}</td>
        <td className="p-4 text-center text-red-400">{team.lost}</td>
        <td className="p-4 text-center">{team.nr}</td>
        <td className="p-4 text-center text-blue-400 font-bold">{team.points}</td>
        <td className="p-4 text-center">{team.nrr}</td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
  <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    IPL 2025 Final
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="
      bg-gradient-to-r
      from-yellow-500/20
      to-yellow-300/20
      border
      border-yellow-500
      rounded-2xl
      p-6
    ">
      <p className="text-yellow-400 text-sm mb-2">
        WINNER 🏆
      </p>

      <div className="flex items-center gap-4 mb-4">

  <img
    src="/logos/rcb.png"
    alt="RCB"
    className="w-16 h-16 object-contain"
  />

  <h3 className="text-4xl font-bold">
    Royal Challengers Bengaluru
  </h3>

</div>

      <p className="text-zinc-300 mt-2">
        First IPL Title
      </p>
    </div>

    <div className="
      bg-gradient-to-r
      from-zinc-500/20
      to-zinc-300/20
      border
      border-zinc-500
      rounded-2xl
      p-6
    ">
      <p className="text-zinc-300 text-sm mb-2">
        RUNNER-UP 🥈
      </p>

      <div className="flex items-center gap-4 mb-4">

  <img
    src="/logos/pbks.png"
    alt="PBKS"
    className="w-16 h-16 object-contain"
  />

  <h3 className="text-4xl font-bold">
    Punjab Kings
  </h3>

</div>

      <p className="text-zinc-300 mt-2">
        IPL 2025 Finalist
      </p>
    </div>

  </div>
  <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Qualified Teams
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="
      bg-green-500/10
      border
      border-green-500
      rounded-2xl
      p-6
      text-center
    ">
      <img
  src="/logos/pbks.png"
  alt="PBKS"
  className="w-16 h-16 mx-auto mb-3"
/>

<h3 className="text-2xl font-bold text-green-400">
  PBKS
</h3>

      <p className="text-zinc-400 mt-2">
        1st Place
      </p>
    </div>

    <div className="
      bg-green-500/10
      border
      border-green-500
      rounded-2xl
      p-6
      text-center
    ">
      <img
  src="/logos/rcb.png"
  alt="RCB"
  className="w-16 h-16 mx-auto mb-3"
/>

<h3 className="text-2xl font-bold text-green-400">
  RCB
</h3>

      <p className="text-zinc-400 mt-2">
        2nd Place
      </p>
    </div>

    <div className="
      bg-green-500/10
      border
      border-green-500
      rounded-2xl
      p-6
      text-center
    ">
      <img
  src="/logos/gt.png"
  alt="GT"
  className="w-16 h-16 mx-auto mb-3"
/>

<h3 className="text-2xl font-bold text-green-400">
  GT
</h3>

      <p className="text-zinc-400 mt-2">
        3rd Place
      </p>
    </div>

    <div className="
      bg-green-500/10
      border
      border-green-500
      rounded-2xl
      p-6
      text-center
    ">
      <img
  src="/logos/mi.png"
  alt="MI"
  className="w-16 h-16 mx-auto mb-3"
/>

<h3 className="text-2xl font-bold text-green-400">
  MI
</h3>

      <p className="text-zinc-400 mt-2">
        4th Place
      </p>
    </div>

  </div>

</div>

</div>
<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    IPL 2025 Awards
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div
      className="
        bg-gradient-to-r
        from-orange-500/20
        to-orange-300/20
        border
        border-orange-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-orange-400 text-sm mb-2">
        🟠 ORANGE CAP
      </p>

     <img
  src="/logos/gt.png"
  alt="GT"
  className="w-10 h-10 mb-4"
/>

<h3 className="text-3xl font-bold">
  Sai Sudharsan
</h3>

      <p className="text-zinc-300 mt-2">
        Gujarat Titans
      </p>

      <p className="text-5xl font-bold text-orange-400 mt-4">
        759
      </p>

      <p className="text-zinc-400">
        Runs
      </p>
    </div>

    <div
      className="
        bg-gradient-to-r
        from-purple-500/20
        to-purple-300/20
        border
        border-purple-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-purple-400 text-sm mb-2">
        🟣 PURPLE CAP
      </p>

      <img
  src="/logos/gt.png"
  alt="GT"
  className="w-10 h-10"
/>

      <h3 className="text-3xl font-bold">
        Prasidh Krishna
      </h3>

      <p className="text-zinc-300 mt-2">
        Gujarat Titans
      </p>

      <p className="text-5xl font-bold text-purple-400 mt-4">
        25
      </p>

      <p className="text-zinc-400">
        Wickets
      </p>
    </div>
  </div>
</div>
<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    IPL 2025 Special Awards
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div
      className="
        bg-gradient-to-r
        from-blue-500/20
        to-cyan-500/20
        border
        border-blue-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-blue-400 text-sm mb-2">
        ⭐ MOST VALUABLE PLAYER
      </p>

      <img
  src="/logos/mi.png"
  alt="MI"
  className="w-10 h-10"
/>

      <h3 className="text-3xl font-bold">
        Suryakumar Yadav
      </h3>

      <p className="text-zinc-300 mt-2">
        Mumbai Indians
      </p>
    </div>

    <div
      className="
        bg-gradient-to-r
        from-pink-500/20
        to-purple-500/20
        border
        border-pink-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-pink-400 text-sm mb-2">
        🌟 EMERGING PLAYER
      </p>

      <img
  src="/logos/gt.png"
  alt="GT"
  className="w-10 h-10"
/>

      <h3 className="text-3xl font-bold">
        Sai Sudharsan
      </h3>

      <p className="text-zinc-300 mt-2">
        Gujarat Titans
      </p>
    </div>

  </div>
  <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Record Innings
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div
      className="
        bg-gradient-to-r
        from-yellow-500/20
        to-orange-500/20
        border
        border-yellow-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-yellow-400 text-sm mb-2">
        ⚡ FASTEST HUNDRED
      </p>

      <img
  src="/logos/rr.png"
  alt="RR"
  className="w-10 h-10"
/>

      <h3 className="text-3xl font-bold">
        Vaibhav Suryavanshi
      </h3>

      <p className="text-zinc-300 mt-2">
        Rajasthan Royals
      </p>

      <p className="text-5xl font-bold text-yellow-400 mt-4">
        35
      </p>

      <p className="text-zinc-400">
        Balls
      </p>
    </div>

    <div
      className="
        bg-gradient-to-r
        from-cyan-500/20
        to-blue-500/20
        border
        border-cyan-500
        rounded-2xl
        p-6
      "
    >
      <p className="text-cyan-400 text-sm mb-2">
        🚀 FASTEST FIFTY
      </p>

      <img
  src="/logos/rr.png"
  alt="RR"
  className="w-10 h-10"
/>

      <h3 className="text-3xl font-bold">
        Vaibhav Suryavanshi
      </h3>

      <p className="text-zinc-300 mt-2">
        Rajasthan Royals
      </p>

      <p className="text-5xl font-bold text-cyan-400 mt-4">
        17
      </p>

      <p className="text-zinc-400">
        Balls
      </p>
    </div>

  </div>

</div>

</div>

</div>

</div>

<footer className="border-t border-zinc-800 mt-20 py-8 text-center text-zinc-400">
  <p>IPL Analytics © 2025</p>

  <p className="mt-2">
    Built by Mohammed Azhaar
  </p>
</footer>

    </main>
  );
}