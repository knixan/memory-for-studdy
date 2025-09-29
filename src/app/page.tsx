"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-blue-900 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-3">🧠 Memory för pluggande</h1>
          <p className="text-gray-200 text-lg">Välj ett spel att träna med. Fler spel läggs till senare.</p>
        </header>

        {/* Spel-lista */}
        <section aria-labelledby="games-heading">
          <h2 id="games-heading" className="sr-only">Tillgängliga spel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Andra världskriget memory */}
            <Link
              href="/game"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-yellow-300 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Andra världskriget memory</h3>
                <span className="text-yellow-300 text-2xl transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">Matcha händelser, ledare och årtal 1939–1945.</p>
              <div className="mt-4 inline-block bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-md">Spela</div>
            </Link>

            {/* Plats för fler spel i framtiden */}
            {/* Kemi – Atomer */}
            <Link
              href="/kemi"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Kemi – Atomer</h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">Begrepp och förklaringar om atomens uppbyggnad, grupper och perioder.</p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">Spela</div>
            </Link>
          </div>
        </section>

        {/* Info */}
        <div id="info" className="mt-10 text-left text-sm text-gray-200 bg-black bg-opacity-30 p-4 rounded">
          <h2 className="font-semibold text-yellow-300 mb-2">Hur fungerar spelen?</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Klicka på två kort för att hitta matchande par.</li>
            <li>Träna fakta samtidigt som du spelar.</li>
            <li>Perfekt för repetition inför prov eller läxförhör.</li>
          </ul>
        </div>

        <footer className="mt-10 text-center text-gray-300">
          <div className="text-sm">💻 Kod och design av <a href="https://kodochdesign.se" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">Joefine Eriksson</a></div>
        </footer>
      </div>
    </div>
  );
}
