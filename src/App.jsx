import { useState } from "react";
import clubsData from "./clubs.json";
import background from "./slike/background.webp";
import mascot from "./slike/mascot.png";

const FONT_DISPLAY = "'Baloo 2', system-ui, sans-serif";
const FONT_BODY = "'Nunito', system-ui, sans-serif";
const INK = "#10243E";

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { height: 100%; }
      .ng-app { text-transform: uppercase; }
      .twinkle { animation: twinkle 2.4s ease-in-out infinite; }
      @keyframes twinkle {
        0%, 100% { opacity: 0.35; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.25); }
      }
      @media (max-width: 820px) {
        .ce-header { flex-direction: column; align-items: flex-start !important; }
        .ce-cards { grid-template-columns: 1fr !important; }
        .ce-mascot { width: 68px !important; height: 68px !important; top: -34px !important; right: 14px !important; }
      }
    `}</style>
  );
}

function Flag({ code }) {
  const [failed, setFailed] = useState(false);
  if (!code || failed) return null;
  return (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      alt=""
      onError={() => setFailed(true)}
      style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px", display: "inline-block" }}
    />
  );
}

function Pill({ children }) {
  return (
    <span
      className="ng-app"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "#FFFFFF",
        border: "2px solid #10243E",
        borderRadius: "999px",
        padding: "8px 16px",
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: "15px",
        color: INK,
        boxShadow: "0 2px 0 rgba(16,36,62,0.65)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function GameButton({ children, onClick, color = "#2F86D6" }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="ng-app"
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: "14px",
        color: "#FFFFFF",
        background: color,
        border: "2px solid #10243E",
        borderRadius: "16px",
        padding: "8px 16px",
        cursor: "pointer",
        boxShadow: pressed ? "0 1px 0 rgba(16,36,62,0.7)" : "0 4px 0 rgba(16,36,62,0.7)",
        transition: "box-shadow 100ms ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, accent, style }) {
  return (
    <div
      style={{
        background: "#FFFDF7",
        border: "3px solid #10243E",
        borderRadius: "24px",
        boxShadow: `0 5px 0 ${accent || "#10243E"}22, 0 6px 14px rgba(16,36,62,0.15)`,
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const startIndex = clubsData.findIndex((c) => c.name === "AS ROMA");
  const [index, setIndex] = useState(startIndex >= 0 ? startIndex : 0);
  const club = clubsData[index];
  const primary = club.primaryColor || "#2F86D6";
  const secondary = club.secondaryColor || "#FFD23F";
  const crestImg = club.crest ? `/grbi/${club.crest}` : null;
  const sentences = club.info_sl.split(/(?<=\.)\s+/).filter(Boolean);
  const [showCrestZoom, setShowCrestZoom] = useState(false);

  const goPrev = () => {
    setShowCrestZoom(false);
    setIndex((i) => (i - 1 + clubsData.length) % clubsData.length);
  };
  const goNext = () => {
    setShowCrestZoom(false);
    setIndex((i) => (i + 1) % clubsData.length);
  };

  return (
    <div style={{ "--primary": primary, "--secondary": secondary, minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden", fontFamily: FONT_BODY }}>
      <GlobalStyle />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "#FFFDF7",
          borderBottom: `3px solid ${INK}`,
          position: "relative",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#2FAE60", border: `2px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
            ⚽
          </div>
          <span className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "17px", color: INK }}>
            Nogometni grbi
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <GameButton color="#2FAE60">🏆 Klubi</GameButton>
          <GameButton color="#2F86D6">📍 Zemljevid</GameButton>
        </div>
      </div>

      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "62px",
          backgroundImage: `linear-gradient(180deg, rgba(6,20,10,0.35), rgba(6,20,10,0.55)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, top: "62px", zIndex: 1, pointerEvents: "none" }}>
        <span className="twinkle" style={{ position: "absolute", top: "8%", left: "6%", fontSize: 22 }}>⭐</span>
        <span className="twinkle" style={{ position: "absolute", top: "22%", right: "10%", fontSize: 18, animationDelay: "0.6s" }}>⭐</span>
        <span className="twinkle" style={{ position: "absolute", bottom: "14%", left: "12%", fontSize: 16, animationDelay: "1.1s" }}>✨</span>
      </div>

      <div className="crest-root" style={{ position: "relative", zIndex: 2, maxWidth: "1080px", margin: "0 auto", padding: "18px 20px 40px" }}>
        {/* Header: crest + name */}
        <div className="ce-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => crestImg && setShowCrestZoom(true)}
                aria-label="Poglej grb v velikem prikazu"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  border: "3px solid #10243E",
                  boxShadow: "0 4px 0 rgba(16,36,62,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  cursor: crestImg ? "pointer" : "default",
                  transition: "transform 120ms ease",
                }}
                onMouseDown={(e) => { if (crestImg) e.currentTarget.style.transform = "translateY(2px) scale(0.98)"; }}
                onMouseUp={(e) => { if (crestImg) e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
                onMouseLeave={(e) => { if (crestImg) e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
              >
                {crestImg ? (
                  <img src={crestImg} alt={club.name + " grb"} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <span style={{ fontSize: "56px" }}>⚽</span>
                )}
              </button>
              {crestImg && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#FFD23F",
                    border: "2px solid #10243E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    pointerEvents: "none",
                  }}
                >
                  🔍
                </div>
              )}
            </div>
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "var(--primary)",
                  padding: "6px 18px 8px",
                  borderRadius: "10px",
                  transform: "rotate(-1deg)",
                  boxShadow: "0 3px 0 rgba(16,36,62,0.22)",
                }}
              >
                <h1 className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: "#FFFFFF", lineHeight: 1, letterSpacing: "0.5px" }}>
                  {club.name}
                </h1>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                <Pill><Flag code={club.flagCode} /> {club.country}</Pill>
                <Pill>📅 Ustanovljen {club.founded_year}</Pill>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="ce-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px" }}>
          <Card accent={primary}>
            <div
              className="ng-app"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--primary)",
                color: "#FFFFFF",
                borderRadius: "12px",
                padding: "8px 14px",
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: "17px",
                marginBottom: "16px",
              }}
            >
              💡 Kaj prikazuje grb?
            </div>
            {sentences.map((sentence, i) => (
              <p
                key={i}
                className="ng-app"
                style={{ fontSize: "16px", lineHeight: 1.5, color: INK, marginBottom: i === sentences.length - 1 ? 0 : "10px" }}
              >
                {sentence}
              </p>
            ))}
          </Card>

          <div style={{ position: "relative" }}>
            <div className="ce-mascot" style={{ position: "absolute", top: "-44px", right: "24px", width: "84px", height: "84px", zIndex: 3 }}>
              <img src={mascot} alt="Maskota" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.2))" }} />
            </div>
            <Card accent={secondary} style={{ background: "#FFF7DC" }}>
              <div
                className="ng-app"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: INK,
                  color: "#FFD23F",
                  borderRadius: "12px",
                  padding: "8px 14px",
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: "17px",
                  marginBottom: "16px",
                }}
              >
                ⚽ Ali si vedel?
              </div>
              <ul className="ng-app" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {club.trivia_sl.map((fact, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "16px", color: INK, lineHeight: 1.4 }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>⚽</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", marginTop: "26px", gap: "12px" }}>
          <GameButton color="#2F86D6" onClick={goPrev}>← Prejšnji grb</GameButton>
          <GameButton color="#2FAE60" onClick={goNext}>Naslednji klub →</GameButton>
        </div>
      </div>

      {/* Crest zoom popup */}
      {showCrestZoom && crestImg && (
        <div
          onClick={() => setShowCrestZoom(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(6,20,10,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: "24px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: "28px",
              border: "3px solid #10243E",
              padding: "28px",
              boxShadow: "0 6px 0 rgba(16,36,62,0.25)",
              maxWidth: "min(92vw, 420px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img src={crestImg} alt={club.name + " grb"} style={{ width: "100%", maxWidth: "340px", height: "auto", objectFit: "contain" }} />
            <GameButton color="#D9455F" onClick={() => setShowCrestZoom(false)}>Zapri</GameButton>
          </div>
        </div>
      )}
    </div>
  );
}
