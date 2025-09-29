"use client";

import Link from "next/link";
import ChemistryAtomsGame from "../components/ChemistryAtomsGame";

export default function KemiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-gray-800 to-cyan-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🧪 Kemi – Atomer (Memory)</h1>
          <p className="text-gray-200 text-lg">Matcha begrepp med rätt förklaring: atom, skal, grupper och perioder.</p>
          <div className="mt-4">
            <Link href="/" className="text-yellow-300 hover:underline">← Tillbaka till startsidan</Link>
          </div>
        </header>

        <ChemistryAtomsGame />
      </div>
    </div>
  );
}
