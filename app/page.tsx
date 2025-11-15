"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Scene = {
  id: string;
  title: string;
  subtitle: string;
  narrative: string;
  background: string;
  atmosphere: {
    ambientText: string;
  };
};

const SCENES: Scene[] = [
  {
    id: "dawn",
    title: "سپیده‌دم در ارتفاعات آلاداغ",
    subtitle: "چشمه در سایه کوه‌های هزارمسجد",
    narrative:
      "سپیده‌دم است و نسیم خنک کوهستان دشت‌های کرمانجی خراسان را پر کرده. دختر جوان کلافه از تشنگی خانواده، مشک دوخته‌شده‌اش را بر دوش انداخته و در میان عطر آویشن به سوی چشمه می‌دود.",
    background:
      "radial-gradient(circle at 20% 10%, rgba(244, 213, 141, 0.9), transparent 60%), linear-gradient(160deg, #1f2937 0%, #0f172a 55%, #020617 100%)",
    atmosphere: {
      ambientText: "صدای نی چوپان دوردست با چهچه پرندگان درمی‌آمیزد."
    }
  },
  {
    id: "spring",
    title: "درخشش چشمه سنگ‌چین",
    subtitle: "انعکاس لباس‌های سوزن‌دوزی در آب زلال",
    narrative:
      "دختر کنار چشمه زانو می‌زند. گیسوان بافته‌اش روی شال قرمز سوزن‌دوزی شده می‌لغزد و آب برفی آینه برق چشم‌هایش می‌شود. رقص بازتاب خورشید بر آب، قصه‌ای کهن را دوباره می‌خواند.",
    background:
      "radial-gradient(circle at 70% 30%, rgba(22, 60, 128, 0.6), transparent 65%), linear-gradient(140deg, #122d5a 0%, #0b1f3a 45%, #01060f 100%)",
    atmosphere: {
      ambientText: "صدای قل‌قل آب و برخورد سطل مسی با تخته‌سنگ‌ها."
    }
  },
  {
    id: "shepherd",
    title: "نگاه گم‌شده چوپان جوان",
    subtitle: "لالایی نی بر فراز تپه‌های زعفران‌زار",
    narrative:
      "پسر چوپان، تکیه داده بر عصایش، از دور دختر را می‌بیند. نی‌لبکش در میان انگشتان می‌لرزد و برای نخستین بار ضرباهنگ عاشقانه‌ای در گوشه افشاری می‌نوازد. دلش از خجالت و شوق به هم می‌پیچد.",
    background:
      "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.18), transparent 60%), linear-gradient(180deg, #111b34 0%, #080f20 60%, #010308 100%)",
    atmosphere: {
      ambientText: "صدای بع بع گوسفندان آرام می‌شود و نی آغاز می‌شود."
    }
  },
  {
    id: "meeting",
    title: "دیدار کنار چشمه",
    subtitle: "دل لرزیدن در نگاه نخست",
    narrative:
      "او نزدیک می‌آید؛ قدم‌هایش را آهسته می‌گذارد تا سکوت لحظه نشکند. دختر، سایه‌اش را بر آب می‌بیند، لبخندی نرم می‌زند و مشک نیمه‌پر را بالا می‌گیرد. گفت‌وگوی نگاه‌ها پیش از کلمات شکل می‌گیرد.",
    background:
      "radial-gradient(circle at 50% 15%, rgba(255, 176, 93, 0.4), transparent 60%), linear-gradient(200deg, #1a1f35 0%, #0f1424 50%, #04060c 100%)",
    atmosphere: {
      ambientText: "زیلو نمناک زیر پا و نغمه‌ای آرام که ریشه در دل کوه دارد."
    }
  },
  {
    id: "promise",
    title: "قول و قرار زیر آسمان ستاره‌بار",
    subtitle: "چرخش امید در دل شب کرمانج",
    narrative:
      "شب‌هنگام، ستارگان بر فرازی بی‌پایان روشن می‌شوند. او از سیاه‌چادرشان می‌گوید و او از ترمه‌های مادرش. دو دست نزدیک آب درخشان می‌لغزند و قول دیدار فردایی دیگر را زمزمه می‌کنند.",
    background:
      "radial-gradient(circle at 60% 80%, rgba(49, 107, 255, 0.35), transparent 65%), linear-gradient(180deg, #070816 0%, #050612 60%, #02030c 100%)",
    atmosphere: {
      ambientText: "صدای آتش و ضرب دهل آرام، فرش آسمان را با کهکشان می‌آراید."
    }
  }
];

const SCENE_DURATION_MS = 9000;

export default function Page() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeScene = useMemo(() => SCENES[index], [index]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      const nextProgress = Math.min(elapsed / SCENE_DURATION_MS, 1);
      setProgress(nextProgress);
      if (nextProgress >= 1) {
        setIndex((prev) => (prev + 1) % SCENES.length);
        setProgress(0);
        start = timestamp;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      setProgress(0);
    };
  }, [isPlaying, index]);

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
    }
  }, [isPlaying]);

  return (
    <main className="experience">
      <div className="canvas-wrapper">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeScene.id}
            className="scene"
            style={{ background: activeScene.background }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <SceneVisual sceneId={activeScene.id} />
            <motion.div
              className="scene__content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1>{activeScene.title}</h1>
              <span className="subtitle">{activeScene.subtitle}</span>
              <p>{activeScene.narrative}</p>
              <span className="ambient">{activeScene.atmosphere.ambientText}</span>
            </motion.div>
          </motion.section>
        </AnimatePresence>
        <motion.button
          className="control"
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={isPlaying ? "توقف روایت" : "پخش روایت"}
        >
          {isPlaying ? "⏸ توقف" : "▶️ پخش"}
        </motion.button>
        <div className="timeline">
          <div className="timeline__progress">
            <motion.div
              className="timeline__progress-bar"
              animate={{ scaleX: progress }}
              initial={false}
              style={{ originX: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 30 }}
            />
          </div>
          <div className="timeline__dots">
            {SCENES.map((scene, sceneIndex) => (
              <button
                key={scene.id}
                className={`dot ${sceneIndex === index ? "dot--active" : ""}`}
                onClick={() => {
                  setIndex(sceneIndex);
                  setProgress(0);
                }}
                aria-label={`رفتن به صحنه ${scene.title}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .experience {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 3rem);
        }

        .canvas-wrapper {
          position: relative;
          width: min(950px, 100%);
          aspect-ratio: 16 / 10;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 35px 120px rgba(4, 7, 17, 0.65);
        }

        .scene {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(2rem, 4vw, 3.8rem);
          color: rgba(251, 253, 255, 0.97);
        }

        .scene__content {
          position: relative;
          z-index: 5;
          backdrop-filter: blur(14px) saturate(120%);
          background: linear-gradient(
            160deg,
            rgba(3, 6, 16, 0.58) 0%,
            rgba(3, 5, 12, 0.3) 100%
          );
          border-radius: 26px;
          padding: clamp(1.5rem, 3vw, 2.4rem);
          border: 1px solid rgba(221, 231, 255, 0.08);
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.45);
        }

        .scene__content h1 {
          font-size: clamp(1.6rem, 2.4vw, 2.3rem);
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
        }

        .scene__content .subtitle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(176, 207, 255, 0.92);
          margin-bottom: 1.1rem;
        }

        .scene__content .subtitle::before {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(252, 211, 77, 0.9);
          box-shadow: 0 0 12px rgba(252, 211, 77, 0.8);
        }

        .scene__content p {
          line-height: 2;
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          color: rgba(241, 245, 249, 0.92);
        }

        .scene__content .ambient {
          margin-top: 1.6rem;
          display: block;
          font-size: 0.9rem;
          color: rgba(148, 163, 184, 0.9);
        }

        .control {
          position: absolute;
          left: 50%;
          bottom: clamp(1rem, 2vw, 1.6rem);
          transform: translateX(-50%);
          background: rgba(10, 14, 30, 0.75);
          color: #f8fafc;
          border: 1px solid rgba(148, 163, 184, 0.35);
          border-radius: 999px;
          padding: 0.45rem 1.4rem;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .control:hover {
          background: rgba(15, 23, 42, 0.86);
          border-color: rgba(226, 232, 240, 0.35);
        }

        .timeline {
          position: absolute;
          width: 74%;
          left: 50%;
          bottom: clamp(3.4rem, 5vw, 4.2rem);
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          z-index: 12;
        }

        .timeline__progress {
          position: relative;
          width: 100%;
          height: 6px;
          background: rgba(148, 163, 184, 0.22);
          border-radius: 999px;
          overflow: hidden;
        }

        .timeline__progress-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(252, 211, 77, 0.9),
            rgba(248, 113, 113, 0.85),
            rgba(96, 165, 250, 0.85)
          );
        }

        .timeline__dots {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(226, 232, 240, 0.4);
          background: rgba(15, 23, 42, 0.65);
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .dot--active {
          transform: scale(1.25);
          border-color: rgba(252, 211, 77, 0.9);
          box-shadow: 0 0 12px rgba(252, 211, 77, 0.6);
        }

        @media (max-width: 820px) {
          .canvas-wrapper {
            border-radius: 26px;
            aspect-ratio: 10 / 16;
          }

          .scene__content {
            padding: clamp(1.2rem, 5vw, 1.8rem);
          }

          .timeline {
            width: 84%;
          }
        }
      `}</style>
    </main>
  );
}

function SceneVisual({ sceneId }: { sceneId: Scene["id"] }) {
  return (
    <div className="visual">
      <MountainRange sceneId={sceneId} />
      <Sky sceneId={sceneId} />
      <Foreground sceneId={sceneId} />
      <Characters sceneId={sceneId} />
      <style jsx>{`
        .visual {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}

function MountainRange({ sceneId }: { sceneId: Scene["id"] }) {
  const mountainPalette: Record<
    Scene["id"],
    { base: string; highlight: string }
  > = {
    dawn: { base: "#0d1726", highlight: "#233349" },
    spring: { base: "#0a2036", highlight: "#164062" },
    shepherd: { base: "#0d1526", highlight: "#1e2338" },
    meeting: { base: "#121a2c", highlight: "#24354d" },
    promise: { base: "#050b1a", highlight: "#1b2750" }
  };

  const palette = mountainPalette[sceneId];

  return (
    <div className="mountain-layer">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="mountain"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 1.4 }}
          style={{
            left: `${index * 22 - 10}%`,
            background: `linear-gradient(180deg, ${palette.highlight}, ${palette.base})`,
            filter: `blur(${index > 2 ? 4 : 0}px)`,
            opacity: index > 2 ? 0.6 : 0.9
          }}
        />
      ))}
      <style jsx>{`
        .mountain-layer {
          position: absolute;
          inset: 0;
          display: block;
        }

        .mountain {
          position: absolute;
          bottom: -12%;
          width: clamp(24%, 28vw, 38%);
          aspect-ratio: 1 / 0.6;
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}

function Sky({ sceneId }: { sceneId: Scene["id"] }) {
  return (
    <>
      <motion.div
        className="sun"
        layoutId={`sun-${sceneId === "dawn" || sceneId === "meeting" ? "rise" : "set"}`}
        animate={{
          top: sceneId === "promise" ? "15%" : sceneId === "dawn" ? "18%" : "28%",
          right: sceneId === "spring" ? "30%" : "18%",
          opacity: sceneId === "promise" ? 0.5 : 0.8,
          scale: sceneId === "promise" ? 0.75 : 1
        }}
        transition={{ duration: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.div
        className="stars"
        animate={{ opacity: sceneId === "promise" ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {[...Array(30)].map((_, index) => (
          <span
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 55}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="clouds"
        animate={{
          opacity: sceneId === "promise" ? 0.12 : 0.35,
          transform: sceneId === "shepherd" ? "translateX(-8%)" : "translateX(0%)"
        }}
        transition={{ duration: 1.8 }}
      >
        {[...Array(6)].map((_, index) => (
          <span key={index} style={{ "--i": index + 1 } as CSSProperties} />
        ))}
      </motion.div>
      <style jsx>{`
        .sun {
          position: absolute;
          width: clamp(120px, 20vw, 220px);
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: radial-gradient(circle, #fbbf24 0%, rgba(251, 191, 36, 0.2) 70%);
          filter: blur(20px);
          mix-blend-mode: screen;
        }

        .stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .stars span {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .clouds {
          position: absolute;
          top: 10%;
          left: 0;
          right: 0;
          height: 40%;
          display: flex;
          justify-content: space-around;
          filter: blur(10px);
        }

        .clouds span {
          width: calc(80px + var(--i) * 20px);
          height: calc(40px + var(--i) * 12px);
          background: rgba(148, 163, 184, 0.18);
          border-radius: 999px;
          animation: drift calc(25s - var(--i) * 1s) linear infinite;
        }

        @keyframes drift {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }
      `}</style>
    </>
  );
}

function Foreground({ sceneId }: { sceneId: Scene["id"] }) {
  return (
    <>
      <motion.div
        className="water"
        animate={{ opacity: sceneId === "dawn" ? 0.55 : sceneId === "spring" ? 0.75 : 0.45 }}
        transition={{ duration: 2 }}
      >
        <span className="sparkle sparkle--one" />
        <span className="sparkle sparkle--two" />
        <span className="sparkle sparkle--three" />
      </motion.div>
      <motion.div
        className="flora"
        animate={{ opacity: sceneId === "shepherd" ? 0.9 : 0.5 }}
        transition={{ duration: 1.6 }}
      >
        {[...Array(20)].map((_, index) => (
          <span key={index} style={{ "--i": index + 1 } as CSSProperties} />
        ))}
      </motion.div>
      <style jsx>{`
        .water {
          position: absolute;
          bottom: 6%;
          left: 50%;
          transform: translateX(-50%);
          width: 68%;
          height: 20%;
          background: linear-gradient(
            180deg,
            rgba(59, 130, 246, 0.2),
            rgba(30, 64, 175, 0.45)
          );
          border-radius: 50%;
          filter: blur(0.6px);
          overflow: hidden;
        }

        .sparkle {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.65) 0%,
            transparent 70%
          );
          animation: shimmer 6s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .sparkle--one {
          top: 15%;
          left: 30%;
        }
        .sparkle--two {
          top: 45%;
          left: 55%;
          animation-delay: 2s;
        }
        .sparkle--three {
          top: 25%;
          left: 70%;
          animation-delay: 4s;
        }

        @keyframes shimmer {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        .flora {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 18%;
          display: flex;
          gap: 8px;
          padding-inline: 2rem;
        }

        .flora span {
          flex: 1;
          background: linear-gradient(
            0deg,
            rgba(34, 197, 94, 0.0) 0%,
            rgba(34, 197, 94, 0.32) 50%,
            rgba(56, 189, 248, 0.28) 100%
          );
          border-radius: 100% 100% 0 0;
          transform-origin: bottom;
          animation: sway calc(7s + var(--i) * 0.2s) ease-in-out infinite;
        }

        @keyframes sway {
          0%,
          100% {
            transform: skewX(-2deg);
          }
          50% {
            transform: skewX(4deg) scaleY(1.05);
          }
        }
      `}</style>
    </>
  );
}

function Characters({ sceneId }: { sceneId: Scene["id"] }) {
  const showShepherd =
    sceneId === "shepherd" || sceneId === "meeting" || sceneId === "promise";
  const showMaiden =
    sceneId === "dawn" ||
    sceneId === "spring" ||
    sceneId === "meeting" ||
    sceneId === "promise";

  return (
    <div className="characters">
      <AnimatePresence>
        {showMaiden && (
          <motion.div
            key="maiden"
            className="maiden"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dress" />
            <div className="veil" />
            <div className="pitcher" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showShepherd && (
          <motion.div
            key="shepherd"
            className="shepherd"
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -140, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cloak" />
            <div className="staff" />
            <div className="ney" />
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .characters {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 2rem 3rem;
          gap: 5rem;
        }

        .maiden,
        .shepherd {
          position: relative;
          width: clamp(120px, 16vw, 180px);
          height: clamp(220px, 28vw, 290px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .dress {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 80%;
          background: radial-gradient(
            circle at 50% 20%,
            rgba(249, 115, 22, 0.85),
            rgba(220, 38, 38, 0.92)
          );
          clip-path: polygon(50% 0%, 70% 15%, 100% 100%, 0% 100%, 30% 15%);
          filter: drop-shadow(0 20px 40px rgba(220, 38, 38, 0.4));
        }

        .veil {
          position: absolute;
          top: 8%;
          width: 54%;
          height: 48%;
          background: linear-gradient(
            180deg,
            rgba(248, 250, 252, 0.65),
            rgba(91, 33, 182, 0.55)
          );
          border-radius: 60% 60% 20% 20%;
          filter: blur(0.2px);
        }

        .pitcher {
          position: absolute;
          right: 12%;
          bottom: 26%;
          width: 20%;
          height: 32%;
          background: linear-gradient(
            180deg,
            rgba(217, 119, 6, 0.88),
            rgba(180, 83, 9, 0.92)
          );
          border-radius: 50% 50% 30% 30%;
          box-shadow: 0 0 12px rgba(217, 119, 6, 0.6);
        }

        .cloak {
          position: absolute;
          bottom: 0;
          width: 110%;
          height: 78%;
          background: linear-gradient(
            180deg,
            rgba(100, 116, 139, 0.5),
            rgba(30, 41, 59, 0.85)
          );
          clip-path: polygon(45% 0%, 65% 12%, 100% 100%, 0% 100%, 35% 12%);
          filter: drop-shadow(0 20px 40px rgba(30, 41, 59, 0.4));
        }

        .staff {
          position: absolute;
          left: 8%;
          bottom: 12%;
          width: 6%;
          height: 65%;
          background: linear-gradient(
            180deg,
            rgba(120, 53, 15, 0.9),
            rgba(69, 26, 3, 0.98)
          );
          border-radius: 999px;
          box-shadow: 0 0 8px rgba(120, 53, 15, 0.4);
        }

        .ney {
          position: absolute;
          right: 16%;
          bottom: 32%;
          width: 4%;
          height: 36%;
          background: linear-gradient(
            180deg,
            rgba(251, 191, 36, 0.9),
            rgba(217, 119, 6, 0.92)
          );
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
