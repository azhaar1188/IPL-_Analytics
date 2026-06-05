// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <div
//       className="
//         w-full
//         h-20
//         bg-zinc-950
//         border-r
//         border-zinc-800
//         p-6
//         fixed
//         left-0
//         top-0
//       "
//     >

//       <h1 className="text-3xl font-bold text-blue-500 mb-10">
//         IPL Analytics
//       </h1>

//       <div className="flex flex-col gap-6 text-lg">

//         <Link
//           href="/"
//           className="hover:text-blue-400 transition"
//         >
//           Home
//         </Link>

//         <Link
//           href="/squads"
//           className="hover:text-blue-400 transition"
//         >
//           IPL 2025 Squads and Players
//         </Link>

//         <Link
//           href="/teams"
//           className="hover:text-blue-400 transition"
//         >
//           Teams
//         </Link>

//         <Link
//           href="/analytics"
//           className="hover:text-blue-400 transition"
//         >
//           Analytics
//         </Link>

//         <Link href="/matches"
//         className="hover:text-blue-400 transition"
//         >
//          Matches
//          </Link>

//       </div>

//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8 z-50">
     <div className="flex items-center gap-3">
  <Link href="/" className="flex items-center gap-3">
    <img
      src="/logos/ipl.png"
      alt="IPL Logo"
      className="w-12 h-12 object-contain"
    />

    <h1 className="text-3xl font-bold text-blue-500">
      IPL Analytics
    </h1>
  </Link>
</div>

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-3xl"
>
  ☰
</button>

      <div className="hidden md:flex items-center gap-8 text-lg">
        <Link href="/" className={pathname === "/" ? "text-blue-400 font-bold" : ""}>
          HOME
        </Link>

        <Link href="/squads" className={pathname === "/squads" ? "text-blue-400 font-bold" : ""}>
          IPL 2025 SQUADS AND PLAYERS
        </Link>

        <Link href="/analytics" className={pathname.startsWith("/analytics") ? "text-blue-400 font-bold" : ""}>
          STATS
        </Link>

        <Link href="/matches" className={pathname.startsWith("/matches") ? "text-blue-400 font-bold" : ""}>
          MATCHES
        </Link>

        <Link href="/compare" className={pathname === "/compare" ? "text-blue-400 font-bold" : ""}>
          PLAYER COMPARISON
        </Link>

        <Link href="/chatbot">
  AI CHATBOT
</Link>

      </div>

      {menuOpen && (
  <div className="absolute top-20 left-0 w-full bg-zinc-950 border-b border-zinc-800 flex flex-col md:hidden">

    <Link href="/" className="p-4">
      HOME
    </Link>

    <Link href="/squads" className="p-4">
      IPL 2025 SQUADS AND PLAYERS
    </Link>

    <Link href="/analytics" className="p-4">
      STATS
    </Link>

    <Link href="/matches" className="p-4">
      MATCHES
    </Link>

    <Link href="/compare" className="p-4">
      PLAYER COMPARISON
    </Link>

 

  </div>
)}

    </nav>
  );
}