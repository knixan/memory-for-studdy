"use client";

import Link from "next/link";
import ChemistryAcidsBasesGame from "../../components/ChemistryAcidsBasesGame";

export default function KemiBasSyraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-gray-800 to-emerald-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🧪 Kemi – Baser & Syror (Memory)
          </h1>
          <p className="text-gray-200 text-lg">
            Matcha begrepp med rätt förklaring: syror, baser, pH och neutralisation.
          </p>
          <div className="mt-4">
            <Link href="/" className="text-yellow-300 hover:underline">
              ← Tillbaka till startsidan
            </Link>
          </div>
        </header>

        <ChemistryAcidsBasesGame />
      </div>
    </div>
  );
}