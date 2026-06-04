"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

export default function RecordsPage() {
     const [battingRecords, setBattingRecords] = useState<any[]>([]);
     const [bowlingRecords, setBowlingRecords] = useState<any[]>([]);
     const [awardRecords, setAwardRecords] = useState<any[]>([]);

     useEffect(() => {
  fetch("/data/batting-records.json")
    .then((res) => res.json())
    .then((data) => setBattingRecords(data));

  fetch("/data/bowling-records.json")
    .then((res) => res.json())
    .then((data) => setBowlingRecords(data));

  fetch("/data/awards-records.json")
    .then((res) => res.json())
    .then((data) => setAwardRecords(data));
}, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 px-8">
        <h1 className="text-5xl font-bold mb-10">
          IPL Records
        </h1>

        <div className="flex gap-4 mb-10">
  <Link
    href="/analytics/seasons"
    className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl font-bold"
  >
    Season Stats
  </Link>

  <Link
    href="/analytics/records"
    className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
  >
    Records
  </Link>
</div>

        <h2 className="text-4xl font-bold italic mb-6">
  All Time Batting Leaders
</h2>
<div className="flex gap-4 overflow-x-auto pb-4 mb-16">
  {battingRecords.map((record, index) => (
    
    <div
      key={index}
className="bg-zinc-900 rounded-2xl p-3 text-center min-w-[180px] flex-shrink-0"    >

         <img
    src={record.logo}
    alt={record.team}
    className="w-8 h-8 mx-auto mb-2 object-contain"
  />

  <img
    src={record.image}
    alt={record.player}
    className="h-24 mx-auto object-contain"
  />

      <p className="text-blue-400 font-bold mb-4">
        {record.title}
      </p>

      <h3 className="text-base font-bold">
        {record.player}
      </h3>

      <p className="text-3xl font-bold my-2">
        {record.value}
      </p>

      <p className="text-zinc-400">
        {record.label}
      </p>
    </div>
  ))}
</div>

<h2 className="text-4xl font-bold italic mb-6">
  All Time Bowling Leaders
</h2>

<div className="flex gap-4 overflow-x-auto pb-4 mb-16">
  {bowlingRecords.map((record, index) => (
    <div
      key={index}
      className="bg-zinc-900 rounded-2xl p-3 text-center min-w-[180px] flex-shrink-0"
    >

           <img
    src={record.logo}
    alt={record.team}
    className="w-8 h-8 mx-auto mb-2 object-contain"
  />

   <img
    src={record.image}
    alt={record.player}
    className="h-24 mx-auto object-contain"
  />

      <p className="text-purple-400 font-bold mb-4">
        {record.title}
      </p>

      <h3 className="text-base font-bold">
        {record.player}
      </h3>

      <p className="text-3xl font-bold my-2">
        {record.value}
      </p>

      <p className="text-zinc-400">
        {record.label}
      </p>
    </div>
  ))}
</div>
<h2 className="text-4xl font-bold italic mb-6 mt-16">
  IPL Awards & Milestones
</h2>
<div className="flex gap-4 overflow-x-auto pb-4">
  {awardRecords.map((record, index) => (
    <div
      key={index}
className="bg-zinc-900 rounded-2xl p-3 text-center min-w-[180px] flex-shrink-0"    >

           <img
    src={record.logo}
    alt={record.team}
    className="w-8 h-8 mx-auto mb-2 object-contain"
  />

   <img
    src={record.image}
    alt={record.player}
    className="h-24 mx-auto object-contain"
  />

      <p className="text-yellow-400 font-bold mb-4">
        {record.title}
      </p>

      <h3 className="text-base font-bold">
        {record.player}
      </h3>

      <p className="text-3xl font-bold my-2">
        {record.value}
      </p>

      <p className="text-zinc-400">
        {record.label}
      </p>
    </div>
  ))}
</div>

</div>

    </main>
  );
}