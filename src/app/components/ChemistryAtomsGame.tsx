"use client";

import { useEffect, useState } from "react";
import React from "react";
import {
  FaAtom,
  FaFlask,
  FaPlusCircle,
  FaMinusCircle,
  FaLayerGroup,
  FaStream,
  FaQuestionCircle,
  FaBalanceScale,
  FaCubes,
  FaBolt,
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
  // 1. Atomen består av ...
  {
    id: 1,
    content: "Atomen består av ...",
    icon: <FaAtom className="text-2xl" />,
    type: "concept",
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content:
      "Atomkärna med protoner (+) och neutroner (0), elektroner (-) i skal",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 1,
    textColor: cardColors[10],
  },

  // 2. K-skal
  {
    id: 3,
    content: "K-skal rymmer ...",
    icon: <FaCubes className="text-2xl" />,
    type: "concept",
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Max 2 elektroner",
    icon: <FaBolt className="text-2xl" />,
    type: "definition",
    matchId: 2,
    textColor: cardColors[15],
  },

  // 3. L-skal
  {
    id: 5,
    content: "L-skal innehåller ...",
    icon: <FaCubes className="text-2xl" />,
    type: "concept",
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Max 8 elektroner",
    icon: <FaBolt className="text-2xl" />,
    type: "definition",
    matchId: 3,
    textColor: cardColors[12],
  },

  // 4. Valenselektroner
  {
    id: 7,
    content: "Valenselektroner",
    icon: <FaMinusCircle className="text-2xl" />,
    type: "concept",
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Elektroner i yttersta skalet",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 4,
    textColor: cardColors[3],
  },

  // 5. Ädelgasstruktur
  {
    id: 9,
    content: "Ädelgasstruktur",
    icon: <FaBalanceScale className="text-2xl" />,
    type: "concept",
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "Fullt yttersta skal (8 e-)",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 5,
    textColor: cardColors[7],
  },

  // 6. Atomnummer
  {
    id: 11,
    content: "Atomnummer",
    icon: <FaPlusCircle className="text-2xl" />,
    type: "concept",
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Antal protoner i kärnan",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 6,
    textColor: cardColors[11],
  },

  // 7. Masstal
  {
    id: 13,
    content: "Masstal",
    icon: <FaFlask className="text-2xl" />,
    type: "concept",
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Protoner + neutroner",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 7,
    textColor: cardColors[16],
  },

  // 8. Grupp / valenselektroner
  {
    id: 15,
    content: "Grupper (lodräta)",
    icon: <FaLayerGroup className="text-2xl" />,
    type: "concept",
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "Lika antal valenselektroner",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 8,
    textColor: cardColors[4],
  },

  // 9. Perioder / elektronskal
  {
    id: 17,
    content: "Perioder (vågräta)",
    icon: <FaStream className="text-2xl" />,
    type: "concept",
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Samma antal elektronskal",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 9,
    textColor: cardColors[17],
  },

  // 10. Ämnesgrupper
  {
    id: 19,
    content: "Grupp 1 / 17 / 18",
    icon: <FaLayerGroup className="text-2xl" />,
    type: "concept",
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "Alkalimetaller / Halogener / Ädelgaser",
    icon: <FaQuestionCircle className="text-2xl" />,
    type: "definition",
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function ChemistryAtomsGame() {
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
                • Ädelgasstruktur betyder att yttersta elektronskalet är fullt
                (ofta 8 e-).
                <br />
                • Grupper har lika många valenselektroner. Perioder har lika
                många elektronskal.
                <br />• Atomnummer = antal protoner. Masstal = protoner +
                neutroner.
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

      {/* Fakta – all info om atomer och grundämnen */}
      <div className="mt-6 bg-gradient-to-r from-emerald-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-emerald-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">🧪</div>
          <h3 className="text-xl font-bold">Fakta om Atomer & Grundämnen</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {/* Atomens uppbyggnad */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-emerald-300 mb-2 flex gap-2 items-center">
              <span>⚛️</span>Atomens uppbyggnad
            </div>
            <ul className="list-disc ml-4">
              <li>
                Atomen består av en kärna med <b>protoner (+)</b> och{" "}
                <b>neutroner (0)</b>.
              </li>
              <li>
                <b>Elektroner (-)</b> rör sig runt kärnan i skal.
              </li>
            </ul>
          </div>

          {/* Elektronskal */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-cyan-300 mb-2 flex gap-2 items-center">
              <span>🌀</span>Elektronskal
            </div>
            <ul className="list-disc ml-4">
              <li>
                <b>K-skalet</b> har max 2 elektroner
              </li>
              <li>
                <b>L-skalet</b> har max 8 elektroner
              </li>
              <li>
                <b>Kolatomen</b> har 6 elektroner: 2 i K-skalet och 4 i
                L-skalet.
              </li>
            </ul>
          </div>

          {/* Grupper och perioder */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-pink-300 mb-2 flex gap-2 items-center">
              <span>🧱</span>Grupper & Perioder
            </div>
            <ul className="list-disc ml-4">
              <li>
                <b>Grupper</b> = lodräta kolumner. Alla i samma grupp har lika
                många valenselektroner.
              </li>
              <li>Grupp 1 → 1 valenselektron</li>
              <li>Grupp 15 → 5 valenselektroner</li>
              <li>
                <b>Perioder</b> = vågräta rader. Alla i samma period har lika
                många elektronskal.
              </li>
              <li>Period 1 → 1 skal (K)</li>
              <li>Period 2 → 2 skal (K, L)</li>
            </ul>
          </div>

          {/* Gruppnamn */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-teal-300 mb-2 flex gap-2 items-center">
              <span>🧪</span>Gruppnamn
            </div>
            <ul className="list-disc ml-4">
              <li>
                Grupp 1 → <b>Alkalimetaller</b>
              </li>
              <li>
                Grupp 17 → <b>Halogener</b>
              </li>
              <li>
                Grupp 18 → <b>Ädelgaser</b>
              </li>
            </ul>
          </div>

          {/* Viktiga begrepp */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-yellow-300 mb-2 flex gap-2 items-center">
              <span>💡</span>Viktiga begrepp
            </div>
            <ul className="list-disc ml-4">
              <li>
                <b>Ädelgasstruktur</b> = fullt yttersta skal (8 elektroner)
              </li>
              <li>
                <b>Atomnummer</b> = antal protoner
              </li>
              <li>
                <b>Masstal</b> = protoner + neutroner
              </li>
              <li>
                <b>Valenselektroner</b> = elektroner i yttersta skalet
              </li>
              <li>
                <b>Isotop</b> = samma ämne, men olika antal neutroner
              </li>
            </ul>
          </div>

          {/* Forskare */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-blue-300 mb-2 flex gap-2 items-center">
              <span>👨‍🔬</span>Forskare
            </div>
            <ul className="list-disc ml-4">
              <li>
                <b>Niels Bohr</b> beskrev atommodellen.
              </li>
              <li>
                <b>Mendelejev</b> skapade det periodiska systemet.
              </li>
            </ul>
          </div>

          {/* Joner och bindningar */}
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="font-semibold text-purple-300 mb-2 flex gap-2 items-center">
              <span>🔗</span>Joner & Bindningar
            </div>
            <ul className="list-disc ml-4">
              <li>
                <b>Jon</b> = atom som ger bort eller tar emot elektroner
              </li>
              <li>
                Ger bort → <b>positiv jon</b> (metall)
              </li>
              <li>
                Tar emot → <b>negativ jon</b> (ickemetall)
              </li>
              <li>
                <b>Jonförening (salt)</b> = metall + ickemetall (positiv jon +
                negativ jon)
              </li>
              <li>
                <b>Metallbindning</b> = metall + metall (elektroner rör sig
                fritt)
              </li>
              <li>
                <b>Elektronparbindning</b> = ickemetall + ickemetall (delar
                elektroner)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
