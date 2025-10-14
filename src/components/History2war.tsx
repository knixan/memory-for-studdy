"use client";

import { useState, useEffect } from "react";
import React from "react";
import {
  FaSkull,
  FaBomb,
  FaPlane,
  FaShip,
  FaCar,
  FaFlag,
  FaCrown,
  FaFire,
  FaGlobeEurope,
  FaHeart,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import {
  GiMilitaryFort,
  GiTrophy,
  GiSwordman,
  GiNuclearWaste,
  GiHelmet,
  GiMedal,
  GiCrossedSwords,
} from "react-icons/gi";

interface Card {
  id: number;
  content: string;
  icon: React.ReactElement;
  type: "event" | "leader" | "year" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

// Färger som blandas slumpmässigt för att inte avslöja svaren
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

const cardData = [
  // Krigets början
  {
    id: 1,
    content: "1 september 1939",
    icon: <FaPlane className="text-2xl" />,
    type: "year" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Tyskland invaderar Polen",
    icon: <FaCar className="text-2xl" />,
    type: "event" as const,
    matchId: 1,
    textColor: cardColors[10],
  },

  // Adolf Hitler
  {
    id: 3,
    content: "Adolf Hitler",
    icon: <FaSkull className="text-2xl" />,
    type: "leader" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Nazisternas ledare, startade kriget",
    icon: <FaFlag className="text-2xl" />,
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[15],
  },

  // Pearl Harbor
  {
    id: 5,
    content: "7 december 1941",
    icon: <FaBomb className="text-2xl" />,
    type: "year" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Japan attackerar Pearl Harbor",
    icon: <FaShip className="text-2xl" />,
    type: "event" as const,
    matchId: 3,
    textColor: cardColors[12],
  },

  // Winston Churchill
  {
    id: 7,
    content: "Winston Churchill",
    icon: <FaCrown className="text-2xl" />,
    type: "leader" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Storbritanniens premiärminister",
    icon: <GiHelmet className="text-2xl" />,
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[3],
  },

  // D-dagen
  {
    id: 9,
    content: "6 juni 1944",
    icon: <GiMilitaryFort className="text-2xl" />,
    type: "year" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "D-dagen i Normandie",
    icon: <GiSwordman className="text-2xl" />,
    type: "event" as const,
    matchId: 5,
    textColor: cardColors[7],
  },

  // Josef Stalin
  {
    id: 11,
    content: "Josef Stalin",
    icon: <FaStar className="text-2xl" />,
    type: "leader" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Sovjetunionens diktator",
    icon: <FaShieldAlt className="text-2xl" />,
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },

  // Atombomben
  {
    id: 13,
    content: "Augusti 1945",
    icon: <GiNuclearWaste className="text-2xl" />,
    type: "year" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Atombomber över Japan",
    icon: <FaBomb className="text-2xl" />,
    type: "event" as const,
    matchId: 7,
    textColor: cardColors[16],
  },

  // Franklin D. Roosevelt
  {
    id: 15,
    content: "Franklin D. Roosevelt",
    icon: <FaHeart className="text-2xl" />,
    type: "leader" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "USA:s president under kriget",
    icon: <GiTrophy className="text-2xl" />,
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[4],
  },

  // Operation Barbarossa
  {
    id: 17,
    content: "Juni 1941",
    icon: <FaFire className="text-2xl" />,
    type: "year" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Operation Barbarossa",
    icon: <GiCrossedSwords className="text-2xl" />,
    type: "event" as const,
    matchId: 9,
    textColor: cardColors[17],
  },

  // Benito Mussolini
  {
    id: 19,
    content: "Benito Mussolini",
    icon: <FaGlobeEurope className="text-2xl" />,
    type: "leader" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "Italiens fascistiska ledare",
    icon: <GiMedal className="text-2xl" />,
    type: "description" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initializedCards = cardData.map((card) => ({
      ...card,
      isFlipped: true, // Visa alla kort hela tiden
      isMatched: false,
    }));

    // Blanda korten
    const shuffledCards = [...initializedCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameCompleted(false);
  };

  const selectCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((card) => card.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Markera kortet som valt (med visuell feedback)
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isSelected: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (firstCard && secondCard && firstCard.matchId === secondCard.matchId) {
      // Match! Låt korten försvinna efter en kort stund
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            flippedCardIds.includes(card.id)
              ? { ...card, isMatched: true, isSelected: false }
              : { ...card, isSelected: false }
          )
        );
      }, 800);

      const newMatches = matches + 1;
      setMatches(newMatches);
      setFlippedCards([]);

      if (newMatches === 10) {
        // 10 par totalt
        setTimeout(() => {
          setGameCompleted(true);
        }, 1200);
      }
    } else {
      // Ingen match - ta bort markeringen efter 1 sekund
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, isSelected: false }))
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Spelstatistik och instruktioner */}
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-yellow-400 mb-2">
            🎯 Hitta alla matchande par!
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

      {/* Spelplan */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card.id)}
            className={`
              relative h-32 sm:h-36 transform transition-all duration-500 
              ${card.isMatched ? "scale-0 opacity-0" : "scale-100 opacity-100"}
              ${!card.isMatched ? "cursor-pointer hover:scale-105" : ""}
            `}
          >
            {/* Kortframsida - alltid synlig */}
            <div
              className={`
              absolute inset-0 flex
              flex-col items-center justify-center bg-gray-800
              rounded-lg border-2 shadow-lg p-2
              ${
                card.isSelected
                  ? "ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-200"
                  : "border-gray-300"
              }
              ${card.isMatched ? "ring-4 ring-green-400 bg-opacity-90" : ""}
              transition-all duration-300
            `}
            >
              <div className={`mb-2 ${card.textColor}`}>{card.icon}</div>
              <div
                className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "year" && "📅"}
                {card.type === "leader" && "👤"}
                {card.type === "event" && "⚔️"}
                {card.type === "description" && "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vinst-meddelande */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag med{" "}
              {Math.round((matches / moves) * 100)}% träffsäkerhet!
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>Historisk reflektion:</strong> Andra världskriget varade
                i 6 år och kostade 60-70 miljoner människors liv. Det är viktigt
                att minnas historien för att förhindra att sådana tragedier
                upprepas.
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

      {/* Faktaruta - kompakta fakta */}
      <div className="mt-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 text-white border-2 border-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Andra Världskriget
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⏰</span>
              <span className="font-semibold text-yellow-300">Varaktighet</span>
            </div>
            <p>6 år (1939-1945)</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💀</span>
              <span className="font-semibold text-red-300">Offer</span>
            </div>
            <p>60-70 miljoner människor</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌍</span>
              <span className="font-semibold text-green-300">Länder</span>
            </div>
            <p>Över 70 länder inblandade</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚛️</span>
              <span className="font-semibold text-orange-300">Atombomber</span>
            </div>
            <p>Hiroshima & Nagasaki</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏭</span>
              <span className="font-semibold text-purple-300">Förintelsen</span>
            </div>
            <p>6 miljoner judar mördade</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏖️</span>
              <span className="font-semibold text-blue-300">D-dagen</span>
            </div>
            <p>Största invasionen i historien</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚀</span>
              <span className="font-semibold text-cyan-300">Teknik</span>
            </div>
            <p>Radar, jet, datorer</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🕊️</span>
              <span className="font-semibold text-emerald-300">FN</span>
            </div>
            <p>Grundades 1945</p>
          </div>
        </div>

        {/* Begrepp och förklaringar */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-bold text-cyan-300">
              Begrepp och förklaringar
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Lebensraum</p>
              <p>
                Livsrum. Tyskland ville skapa ett livsrum, stort geografiskt
                område österut åt sin befolkning.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">
                Molotov–Ribbentrop-pakten
              </p>
              <p>
                En pakt/uppgörelse mellan Sovjetunionen och Tyskland om hur man
                skulle dela upp Europa och Polen mellan sig.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">De allierade</p>
              <p>Frankrike, Storbritannien, Sovjet och USA.</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Axelmakterna</p>
              <p>Tyskland, Italien, Japan.</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Blixtkrig</p>
              <p>
                Ett snabbt militärt anfall som Tyskland började använda sig av
                under andra världskriget.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Ockupation</p>
              <p>
                När ett främmande land tar över och styr ett annat land, i
                samband med krig.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Pogromer</p>
              <p>Förföljelser av judar.</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Kristallnatten</p>
              <p>
                Kallas även novemberpogromen. Natten mellan 9 och 10 november då
                många judars affärer, hus och synagogor förstördes och tusentals
                judar mördades.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Gulag</p>
              <p>
                Arbetsläger som Sovjet hade under många år, bl.a. i Sibirien.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Förintelsen</p>
              <p>
                Benämningen på det folkmord som nazisterna utförde 1933–1945 på
                drygt sex miljoner judar och omkring sju miljoner andra
                människor.
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Antisemitism</p>
              <p>Hat mot judar.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Reflektion:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;Det viktigaste med att studera historia är att lära sig av
            misstagen så att vi aldrig upprepar dem.&rdquo;
          </p>
        </div>
      </div>

      {/* Detaljerad historisk information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-yellow-400">
            Andra världskriget (1939–1945)
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vänster kolumn */}
          <div className="space-y-6">
            {/* Hur det började */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔥</span>
                <h3 className="text-lg font-bold text-red-400">
                  Hur det började
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  • Kriget startade{" "}
                  <strong className="text-yellow-300">1 september 1939</strong>{" "}
                  när Tyskland, lett av{" "}
                  <strong className="text-red-300">Adolf Hitler</strong>,
                  invaderade Polen.
                </p>
                <p>
                  • Storbritannien och Frankrike förklarade krig mot Tyskland.
                </p>
              </div>
            </div>

            {/* Viktiga händelser */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚔️</span>
                <h3 className="text-lg font-bold text-blue-400">
                  Viktiga händelser
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-yellow-300">1940:</strong> Tyskland
                  ockuperade flera länder i Europa.
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">1941:</strong>
                  </p>
                  <p className="ml-4">
                    • Tyskland anföll Sovjetunionen (
                    <strong className="text-orange-300">
                      Operation Barbarossa
                    </strong>
                    ).
                  </p>
                  <p className="ml-4">
                    • Japan attackerade{" "}
                    <strong className="text-red-300">Pearl Harbor</strong> (7
                    december 1941) → USA gick med i kriget.
                  </p>
                </div>
                <p>
                  <strong className="text-yellow-300">1944:</strong> De
                  allierade landsteg i Normandie (
                  <strong className="text-green-300">D-dagen, 6 juni</strong>).
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">1945:</strong>
                  </p>
                  <p className="ml-4">
                    • Sovjetunionen intog Berlin, Hitler tog sitt liv.
                  </p>
                  <p className="ml-4">
                    • USA fällde{" "}
                    <strong className="text-orange-300">atombomber</strong> över
                    Hiroshima och Nagasaki → Japan kapitulerade.
                  </p>
                </div>
              </div>
            </div>

            {/* Förintelsen */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💔</span>
                <h3 className="text-lg font-bold text-purple-400">
                  Förintelsen
                </h3>
              </div>
              <p className="text-sm">
                Nazisterna mördade ca{" "}
                <strong className="text-red-300">6 miljoner judar</strong> och
                miljoner andra grupper i koncentrationsläger.
              </p>
            </div>
          </div>

          {/* Höger kolumn */}
          <div className="space-y-6">
            {/* Viktiga ledare */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👑</span>
                <h3 className="text-lg font-bold text-green-400">
                  Viktiga ledare
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p>
                    <strong className="text-red-300">
                      Adolf Hitler (Tyskland):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Nazistpartiets ledare, startade kriget och ansvarig för
                    Förintelsen.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-yellow-300">
                      Benito Mussolini (Italien):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Italiens fascistiska ledare, allierad med Hitler.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-red-300">
                      Josef Stalin (Sovjetunionen):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Diktator som ledde Sovjetunionen mot Tyskland.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-blue-300">
                      Winston Churchill (Storbritannien):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Premiärminister, känd för sitt starka ledarskap och tal.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-indigo-300">
                      Franklin D. Roosevelt (USA):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Amerikansk president under största delen av kriget.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-cyan-300">
                      Harry S. Truman (USA):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Tog över efter Roosevelt 1945 och beordrade atombomberna mot
                    Japan.
                  </p>
                </div>
              </div>
            </div>

            {/* Totala offer */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💀</span>
                <h3 className="text-lg font-bold text-orange-400">
                  Hur många dog totalt?
                </h3>
              </div>
              <p className="text-sm">
                Cirka{" "}
                <strong className="text-red-300">
                  60–70 miljoner människor
                </strong>{" "}
                dog under kriget (soldater och civila).
              </p>
              <div className="mt-3 p-2 bg-red-900 bg-opacity-30 rounded text-xs">
                <p className="text-red-200">
                  Detta gör andra världskriget till den dödligaste konflikten i
                  mänsklighetens historia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
