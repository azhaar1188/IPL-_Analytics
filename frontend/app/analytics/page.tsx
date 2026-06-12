"use client";

import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [playerStats, setPlayerStats] = useState<any[]>([]);
  const [battingStats, setBattingStats] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState("batting");
  const [bowlingStats, setBowlingStats] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [search, setSearch] = useState("");

useEffect(() => {
  fetch("/data/ipl-2025-batting-stats.json")
    .then((res) => res.json())
    .then((data) => setBattingStats(data));

  fetch("/data/ipl-2025-bowling-stats.json")
    .then((res) => res.json())
    .then((data) => setBowlingStats(data));
}, []);

  const playersPerTeam = teams.map((team: any) => ({
    team: team.shortname,
    players: team.players.length,
  }));

  const filteredBattingStats = battingStats.filter((player: any) => {
  const matchesTeam =
    selectedTeam === "All Teams" || player.team === selectedTeam;

  const matchesSearch =
    player.player.toLowerCase().includes(search.toLowerCase());

  return matchesTeam && matchesSearch;
});

  const filteredBowlingStats = bowlingStats.filter((player: any) => {
  const matchesTeam =
    selectedTeam === "All Teams" || player.team === selectedTeam;

  const matchesSearch =
    player.player.toLowerCase().includes(search.toLowerCase());

  return matchesTeam && matchesSearch;
});

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 px-6">
        <h1 className="text-5xl font-bold mb-10">
          Stats and Records
        </h1>

       <div className="flex gap-4 mb-8">

  <Link
    href="/analytics/seasons"
    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
  >
    Season Stats
  </Link>

  <Link
    href="/analytics/records"
    className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl font-semibold"
  >
    Records
  </Link>

</div>

      <div className="w-full overflow-x-auto rounded-2xl">
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

  <select
    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
  >
    <option>SEASON 2025</option>
  </select>

  <select
    value={selectedTable}
    onChange={(e) => setSelectedTable(e.target.value)}
    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
  >
    <option value="batting">Orange Cap</option>
    <option value="bowling">Purple Cap</option>
  </select>

  <select
  value={selectedTeam}
  onChange={(e) => setSelectedTeam(e.target.value)}
  className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
>
  <option value="All Teams">All Teams</option>

  <option value="CSK">CSK</option>
  <option value="MI">MI</option>
  <option value="RCB">RCB</option>
  <option value="GT">GT</option>
  <option value="PBKS">PBKS</option>
  <option value="SRH">SRH</option>
  <option value="KKR">KKR</option>
  <option value="LSG">LSG</option>
  <option value="DC">DC</option>
  <option value="RR">RR</option>
</select>

  <input
  type="text"
  placeholder="Search By Player Name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
/>

</div>

{selectedTable === "batting" && (

  <table className="w-full text-sm bg-zinc-900">
  <thead className="bg-zinc-700">
    <tr>
  <th className="p-4 text-center w-16">Pos</th>
  <th className="p-4 text-left">Player</th>
      <th className="px-3 py-4 text-center w-20">Runs</th>
      <th className="px-3 py-4 text-center">Mat</th>
      <th className="px-3 py-4 text-center">Inns</th>
      <th className="px-3 py-4 text-center">NO</th>
      <th className="px-3 py-4 text-center">HS</th>
      <th className="px-3 py-4 text-center">Avg</th>
      <th className="px-3 py-4 text-center">BF</th>
      <th className="px-3 py-4 text-center">SR</th>
      <th className="px-3 py-4 text-center">100</th>
      <th className="px-3 py-4 text-center">50</th>
      <th className="px-3 py-4 text-center">4s</th>
      <th className="px-3 py-4 text-center">6s</th>
    </tr>
  </thead>

  <tbody>
    {filteredBattingStats.map((player: any) => (
      <tr key={player.rank} className="border-b border-zinc-800">

        <td className="p-4 text-center font-bold text-blue-400">
  {player.rank}
</td>

        <td className="p-4 w-[220px]">
  <div>
    <p className="font-bold">
      {player.player}
    </p>

    <p className="text-zinc-400 text-sm">
      {player.team}
    </p>
  </div>
</td>

        <td className="p-4 text-center text-orange-400 font-bold">{player.runs}</td>
        <td className="p-4 text-center">{player.matches}</td>
        <td className="p-4 text-center">{player.innings}</td>
        <td className="p-4 text-center">{player.notOut}</td>
        <td className="p-4 text-center">{player.highestScore}</td>
        <td className="p-4 text-center">{player.average}</td>
        <td className="p-4 text-center">{player.ballsFaced}</td>
        <td className="p-4 text-center">{player.strikeRate}</td>
        <td className="p-4 text-center">{player.hundreds}</td>
        <td className="p-4 text-center">{player.fifties}</td>
        <td className="p-4 text-center">{player.fours}</td>
        <td className="p-4 text-center">{player.sixes}</td>
      </tr>
    ))}
  </tbody>
</table>
)}
</div>
{selectedTable === "bowling" && (
  <table className="w-full text-sm bg-zinc-900">
    <thead className="bg-zinc-700">
      <tr>
        <th className="p-4 text-center w-16">Pos</th>
        <th className="p-4 text-left">Player</th>
        <th className="px-3 py-4 text-center">Wkts</th>
        <th className="px-3 py-4 text-center">Mat</th>
        <th className="px-3 py-4 text-center">Inns</th>
        <th className="px-3 py-4 text-center">Ov</th>
        <th className="px-3 py-4 text-center">Runs</th>
        <th className="px-3 py-4 text-center">BBI</th>
        <th className="px-3 py-4 text-center">Avg</th>
        <th className="px-3 py-4 text-center">Econ</th>
        <th className="px-3 py-4 text-center">SR</th>
        <th className="px-3 py-4 text-center">4w</th>
        <th className="px-3 py-4 text-center">5w</th>
      </tr>
    </thead>

    <tbody>
      {filteredBowlingStats.map((player: any) => (
        <tr key={player.rank} className="border-b border-zinc-800">

          <td className="p-4 text-center font-bold text-purple-400">
            {player.rank}
          </td>

          <td className="p-4 w-[220px]">
            <p className="font-bold">
              {player.player}
            </p>
            <p className="text-zinc-400 text-sm">
              {player.team}
            </p>
          </td>

          <td className="p-4 text-center text-purple-400 font-bold">
            {player.wickets}
          </td>

          <td className="p-4 text-center">{player.matches}</td>
          <td className="p-4 text-center">{player.innings}</td>
          <td className="p-4 text-center">{player.overs}</td>
          <td className="p-4 text-center">{player.runsConceded}</td>
          <td className="p-4 text-center">{player.bestBowling}</td>
          <td className="p-4 text-center">{player.average}</td>
          <td className="p-4 text-center">{player.economy}</td>
          <td className="p-4 text-center">{player.strikeRate}</td>
          <td className="p-4 text-center">{player.fourWickets}</td>
          <td className="p-4 text-center">{player.fiveWickets}</td>

        </tr>
      ))}
    </tbody>
  </table>
)}

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