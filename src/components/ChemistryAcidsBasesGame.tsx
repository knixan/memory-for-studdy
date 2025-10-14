"use client";

import { useEffect, useState } from "react";
import React from "react";
import {
  FaFlask,
  FaBalanceScale,
  FaBolt,
  FaQuestionCircle,
  FaAtom,
  FaWater,
  FaIndustry,
  FaRecycle,
  FaThermometerHalf,
} from "react-icons/fa";

interface Card {
  id: number;
  content: string;
  icon: React.ReactElement;
  type: "concept" | "definition";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

const cardColors = [
  "text-red-300",
  "text-blue-300",
  "text-green-300",
  "text-yellow-300",
  "text-purple-300",
  "text-pink-300",
  "text-indigo-300",
  "text-orange-300",
  "text-cyan-300",
  "text-emerald-300",
  "text-rose-300",
  "text-violet-300",
  "text-amber-300",
  "text-lime-300",
  "text-teal-300",
  "text-fuchsia-300",
  "text-sky-300",
  "text-slate-300",
  "text-zinc-300",
  "text-gray-300",
];

// 10 par (20 kort)
const cardData: Omit<Card, "isFlipped" | "isMatched" | "isSelected">[] = [
  // 1. Joner i syra
  {
    id: 1,
    content: "Joner i en syra",
    icon: <FaFlask className="text-2xl" />,
    type: "concept",
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Vätejoner (H⁺)",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 1,
    textColor: cardColors[10],
  },

  // 2. Joner i bas
  {
    id: 3,
    content: "Joner i en bas",
    icon: <FaBalanceScale className="text-2xl" />,
    type: "concept",
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Hydroxidjoner (OH⁻)",
    icon: <FaBolt className="text-2xl" />,
    type: "definition",
    matchId: 2,
    textColor: cardColors[15],
  },

  // 3. Stark syra
  {
    id: 5,
    content: "Stark syra",
    icon: <FaFlask className="text-2xl" />,
    type: "concept",
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Nästan alla molekyler avger H⁺, ex. HCl",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 3,
    textColor: cardColors[12],
  },

  // 4. Svag syra
  {
    id: 7,
    content: "Svag syra",
    icon: <FaFlask className="text-2xl" />,
    type: "concept",
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Få molekyler avger H⁺, ex. Ättiksyra (CH₃COOH)",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 4,
    textColor: cardColors[3],
  },

  // 5. Koncentrerad lösning
  {
    id: 9,
    content: "Koncentrerad lösning",
    icon: <FaAtom className="text-2xl" />,
    type: "concept",
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "Mycket syra eller bas i lite vatten",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 5,
    textColor: cardColors[7],
  },

  // 6. Utspädd lösning
  {
    id: 11,
    content: "Utspädd lösning",
    icon: <FaWater className="text-2xl" />,
    type: "concept",
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Lite syra eller bas i mycket vatten",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 6,
    textColor: cardColors[11],
  },

  // 7. Neutralisation
  {
    id: 13,
    content: "Neutralisation",
    icon: <FaBalanceScale className="text-2xl" />,
    type: "concept",
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "H⁺ + OH⁻ → H₂O + salt",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 7,
    textColor: cardColors[16],
  },

  // 8. Försurning orsaker
  {
    id: 15,
    content: "Försurning orsaker",
    icon: <FaIndustry className="text-2xl" />,
    type: "concept",
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "SO₂ och NOₓ från förbränning av kol och olja",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 8,
    textColor: cardColors[4],
  },

  // 9. Motverka försurning
  {
    id: 17,
    content: "Motverka försurning",
    icon: <FaRecycle className="text-2xl" />,
    type: "concept",
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Minska utsläpp, kalka sjöar och mark",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 9,
    textColor: cardColors[17],
  },

  // 10. pH-värde
  {
    id: 19,
    content: "pH-värde",
    icon: <FaThermometerHalf className="text-2xl" />,
    type: "concept",
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "<7 sur, =7 neutral, >7 basisk",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function ChemistryAcidsBasesGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initializedCards: Card[] = cardData.map((c) => ({
      ...c,
      isFlipped: true,
      isMatched: false,
    }));
    const shuffled = [...initializedCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameCompleted(false);
  };

  const selectCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((c) => c.id === cardId)?.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isSelected: true } : c))
    );

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (ids: number[]) => {
    const [a, b] = ids;
    const ca = cards.find((c) => c.id === a);
    const cb = cards.find((c) => c.id === b);
    if (ca && cb && ca.matchId === cb.matchId) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            ids.includes(c.id)
              ? { ...c, isMatched: true, isSelected: false }
              : { ...c, isSelected: false }
          )
        );
      }, 800);
      setMatches((m) => {
        const nm = m + 1;
        if (nm === 10) setTimeout(() => setGameCompleted(true), 1200);
        return nm;
      });
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ({ ...c, isSelected: false })));
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => initializeGame();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Info + stats */}
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-yellow-400 mb-2">
            🧪 Matcha begrepp och förklaringar!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop. Matchade par försvinner från
            spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round((matches / Math.max(moves, 1)) * 100)}%
              </div>
              <div className="text-sm">Träffsäkerhet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {10 - matches}
              </div>
              <div className="text-sm">Kvar</div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card.id)}
            className={`relative h-32 sm:h-36 transform transition-all duration-500 ${
              card.isMatched ? "scale-0 opacity-0" : "scale-100 opacity-100"
            } ${!card.isMatched ? "cursor-pointer hover:scale-105" : ""}`}
          >
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-lg border-2 shadow-lg p-2 ${
                card.isSelected
                  ? "ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-200"
                  : "border-gray-300"
              } ${
                card.isMatched ? "ring-4 ring-green-400 bg-opacity-90" : ""
              } transition-all duration-300`}
            >
              <div className={`${card.textColor} mb-2`}>{card.icon}</div>
              <div
                className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "concept" && "🔬"}
                {card.type === "definition" && "🧾"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Win modal */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Snyggt jobbat!
            </h2>
            <p className="text-gray-600 mb-6">
              Du klarade kemimemoryt på {moves} drag med{" "}
              {Math.round((matches / Math.max(moves, 1)) * 100)}% träffsäkerhet!
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg mb-6 text-left text-sm text-gray-700">
              <p>
                • Syror innehåller H⁺-joner, baser OH⁻-joner.
                <br />
                • Neutralisation: syra + bas → vatten + salt.
                <br />• pH &lt;7 sur, =7 neutral, &gt;7 basisk.
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Fakta – all info om syror och baser */}
      <div className="mt-6 bg-gradient-to-r from-cyan-900 to-emerald-900 rounded-lg p-6 text-white border-2 border-cyan-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">🧪</div>
          <h3 className="text-xl font-bold">Fakta om Syror & Baser</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {/* Syror */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-red-300 mb-2 flex gap-2 items-center">
              <span>🧪</span>Syror
            </div>
            <ul className="list-disc ml-4">
              <li>Innehåller vätejoner (H⁺)</li>
              <li>pH &lt; 7</li>
              <li>Smakar surt, frätande</li>
              <li>Exempel: HCl, H₂SO₄, CH₃COOH</li>
            </ul>
          </div>

          {/* Baser */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-blue-300 mb-2 flex gap-2 items-center">
              <span>⚗️</span>Baser
            </div>
            <ul className="list-disc ml-4">
              <li>Innehåller hydroxidjoner (OH⁻)</li>
              <li>pH &gt; 7</li>
              <li>Smakar bittert, känns hala</li>
              <li>Exempel: NaOH, KOH, NH₃</li>
            </ul>
          </div>

          {/* Neutralisation */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-green-300 mb-2 flex gap-2 items-center">
              <span>⚖️</span>Neutralisation
            </div>
            <ul className="list-disc ml-4">
              <li>Syra + bas → vatten + salt</li>
              <li>H⁺ + OH⁻ → H₂O</li>
              <li>pH blir ≈7</li>
            </ul>
          </div>

          {/* pH och indikatorer */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-yellow-300 mb-2 flex gap-2 items-center">
              <span>📏</span>pH & Indikatorer
            </div>
            <ul className="list-disc ml-4">
              <li>pH &lt;7: sur</li>
              <li>pH =7: neutral</li>
              <li>pH &gt;7: basisk</li>
              <li>Indikatorer: lackmus, BTB, fenolftalein</li>
            </ul>
          </div>

          {/* Försurning */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-purple-300 mb-2 flex gap-2 items-center">
              <span>🌧️</span>Försurning
            </div>
            <ul className="list-disc ml-4">
              <li>Orsak: SO₂, NOₓ från förbränning</li>
              <li>Bildar syror i regn</li>
              <li>Motverka: minska utsläpp, kalka</li>
            </ul>
          </div>

          {/* Redox */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-orange-300 mb-2 flex gap-2 items-center">
              <span>⚡</span>Redox
            </div>
            <ul className="list-disc ml-4">
              <li>Oxidation: avger elektroner</li>
              <li>Reduktion: tar upp elektroner</li>
              <li>Spänningsserien: oxideringsgrad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}