"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";

import battingStats from "../../public/data/ipl-2025-batting-stats.json";
import bowlingStats from "../../public/data/ipl-2025-bowling-stats.json";
import pointsTable from "../../public/data/points-table.json";
import squads from "../../public/data/squads.json";
import awards from "../../public/data/awards-records.json";
import battingRecords from "../../public/data/batting-records.json";
import bowlingRecords from "../../public/data/bowling-records.json";

export default function ChatbotPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
  { role: "user" | "bot"; text: string }[]
>([]);

const reply = (text: string) => {
  setMessages((prev) => [
    ...prev,
    { role: "user", text: question },
    { role: "bot", text },
  ]);
  setQuestion("");
};

const askBot = () => {
  const q = question.toLowerCase().trim();

  if (q.includes("orange caps")) {
  const orangeCaps = awards.find(
    (award) => award.title === "Most Orange Caps"
  );

  if (orangeCaps) {
    reply(
      `${orangeCaps.player} has won the most Orange Caps (${orangeCaps.value}).`
    );
  }

  return;
}

if (q.includes("purple caps")) {
  const purpleCaps = awards.find(
    (award) => award.title === "Most Purple Caps"
  );

  if (purpleCaps) {
    reply(
      `${purpleCaps.player} has won the most Purple Caps (${purpleCaps.value}).`
    );
  }

  return;
}

  else if (q.includes("orange") || q.includes("most runs") || q.includes("runs")) {
    const topBatter = battingStats[0];

    reply(
      `${topBatter.player} won the Orange Cap with ${topBatter.runs} runs for ${topBatter.team}.`
    );
    return;
  }

  if (
    q.includes("purple") ||
    q.includes("most wickets") ||
    q.includes("wickets")
  ) {
    const topBowler = bowlingStats[0];

    reply(
      `${topBowler.player} won the Purple Cap with ${topBowler.wickets} wickets for ${topBowler.team}.`
    );
    return;
  }
  const batter = battingStats.find((p) =>
  q.includes(p.player.toLowerCase())
);

const bowler = bowlingStats.find((p) =>
  q.includes(p.player.toLowerCase())
);

if (batter && bowler) {
  reply(
    `${batter.player} (${batter.team}) scored ${batter.runs} runs and took ${bowler.wickets} wickets in IPL 2025.`
  );
  return;
}

if (batter) {
  reply(
    `${batter.player} (${batter.team}) scored ${batter.runs} runs, highest score ${batter.highestScore}, average ${batter.average}, strike rate ${batter.strikeRate}.`
  );
  return;
}

if (bowler) {
  reply(
    `${bowler.player} (${bowler.team}) took ${bowler.wickets} wickets, best bowling ${bowler.bestBowling}, economy ${bowler.economy}.`
  );
  return;
}

const team = squads.find((t) =>
  q.includes(t.shortname.toLowerCase()) ||
  q.includes(t.teamName.toLowerCase())
);

if (team) {
  const playerList = team.players
    .map((p, index) => `${index + 1}. ${p.name} - ${p.role}`)
    .join("\n");

  reply(
    `${team.teamName}\n\nCaptain: ${team.captain}\nTrophies: ${team.trophies}\n\nSquad:\n${playerList}`
  );
  return;
}

if (
  q.includes("points table") ||
  q.includes("standings") ||
  q.includes("top 4")
) {
  const standings = pointsTable
    .slice(0, 4)
    .map(
      (team, index) =>
        `${index + 1}. ${team.team} - ${team.points} pts`
    )
    .join("\n");

  reply(`Top 4 Teams:\n\n${standings}`);
  return;
}

if (
  q.includes("first place") ||
  q.includes("top team") ||
  q.includes("who finished first")
) {
  const topTeam = pointsTable[0];

  reply(
    `${topTeam.team} finished first with ${topTeam.points} points.`
  );
  return;
}

if (
  q.includes("captain") ||
  q.includes("trophies")
) {
  const team = squads.find(
    (t) =>
      q.includes(t.shortname.toLowerCase()) ||
      q.includes(t.teamName.toLowerCase())
  );

  if (team) {
    reply(
      `${team.teamName}

Captain: ${team.captain}
Trophies: ${team.trophies}`
    );
    return;
  }
}

if (q.includes("most sixes 2025") || q.includes("highest sixes 2025")) {
  const topSixes = [...battingStats].sort((a, b) => b.sixes - a.sixes)[0];

  reply(
    `${topSixes.player} hit the most sixes with ${topSixes.sixes} sixes for ${topSixes.team}.`
  );
  return;
}

if (q.includes("most fours 2025") || q.includes("highest fours 2025")) {
  const topFours = [...battingStats].sort((a, b) => b.fours - a.fours)[0];

  reply(
    `${topFours.player} hit the most fours with ${topFours.fours} fours for ${topFours.team}.`
  );
  return;
}

if (q.includes("highest strike rate")) {
  const topSR = [...battingStats].sort(
    (a, b) => b.strikeRate - a.strikeRate
  )[0];

  reply(
    `${topSR.player} had the highest strike rate: ${topSR.strikeRate} for ${topSR.team}.`
  );
  return;
}

if (q.includes("best average")) {
  const topAvg = [...battingStats]
    .filter((p) => p.average !== null)
    .sort((a, b) => b.average - a.average)[0];

  reply(
    `${topAvg.player} had the best batting average: ${topAvg.average} for ${topAvg.team}.`
  );
  return;
}

const battingRecord = battingRecords.find((record) =>
  q.includes(record.title.toLowerCase())
);

if (battingRecord) {
  reply(
    `${battingRecord.title}

Player: ${battingRecord.player}
Team: ${battingRecord.team}
${battingRecord.label}: ${battingRecord.value}`
  );
  return;
}

const bowlingRecord = bowlingRecords.find((record) =>
  q.includes(record.title.toLowerCase())
);

if (bowlingRecord) {
  reply(
    `${bowlingRecord.title}

Player: ${bowlingRecord.player}
Team: ${bowlingRecord.team}
${bowlingRecord.label}: ${bowlingRecord.value}`
  );
  return;
}

if (q.includes("mvp")) {
  const mvp = awards.find(
    (award) => award.title === "Most MVP Awards"
  );

  if (mvp) {
    reply(
      `${mvp.player} has won the most MVP awards (${mvp.value}) in IPL history.`
    );
  }

  return;
}

if (q.includes("titles")) {
  const titles = awards.find(
    (award) => award.title === "Most IPL Titles"
  );

  if (titles) {
    reply(
      `${titles.player} has won the most IPL titles (${titles.value}).`
    );
  }

  return;
}

if (q.includes("finals")) {
  const finals = awards.find(
    (award) => award.title === "Most Finals"
  );

  if (finals) {
    reply(
      `${finals.player} has played the most IPL finals (${finals.value}).`
    );
  }

  return;
}

  reply(
    "I can answer questions about Orange Cap, Purple Cap, batting stats and bowling stats."
  );
  setQuestion("");
};


  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 px-8">
        <h1 className="text-5xl font-bold mb-8">
          IPL AI Chatbot
        </h1>

        <div className="bg-zinc-900 rounded-2xl p-6 max-w-3xl">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about IPL 2025..."
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 outline-none mb-4"
          />

          <button
            onClick={askBot}
            className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            Ask
          </button>

          <div className="mt-6 space-y-4">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`p-4 rounded-xl whitespace-pre-line ${
        message.role === "user"
          ? "bg-blue-600 ml-12"
          : "bg-zinc-800 mr-12"
      }`}
    >
      {message.text}
    </div>
  ))}
</div>

        </div>
      </div>
    </main>
  );
}