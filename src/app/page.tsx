"use client";

import { useState, useEffect } from "react";
import MemoryGame from "./components/MemoryGame";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎖️ Andra Världskriget Memory 🎖️
          </h1>
          <p className="text-gray-200 text-lg">
            Matcha händelser, ledare och årtal från kriget 1939-1945
          </p>
        </header>
        <MemoryGame />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border-t border-gray-600">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-300">
              <span className="text-sm">💻 Kod och design av</span>
              <a
                href="https://kodochdesign.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm transition-colors duration-300 hover:underline"
              >
                Joefine Eriksson
              </a>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              🎓 Interaktivt lärande genom spel
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
