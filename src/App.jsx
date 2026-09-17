import { useState, useMemo } from "react";
import clubsData from "./clubs.json";
import background from "./slike/background.webp";
import mascot from "./slike/mascot.png";
import footballHero from "./slike/football-hero.jpg";

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
      .club-card { transition: transform 120ms ease; cursor: pointer; }
      .club-card:hover { transform: translateY(-3px); }
      @media (max-width: 820px) {
        .ce-header { flex-direction: column; align-items: flex-start !important; }
        .ce-cards { grid-template-columns: 1fr !important; }
        .ce-mascot { width: 64px !important; height: 64px !important; top: -30px !important; right: 14px !important; }
        .clubs-grid { grid-template-columns: repeat(2, 1fr) !important; }
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
      style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px", display: "inline-block", flexShrink: 0 }}
    />
  );
}

function Pill({ children }) {
  return (
    <span
      className="ng-app"
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: "#FFFFFF", border: "2px solid #10243E", borderRadius: "999px",
        padding: "8px 16px", fontFamily: FONT_DISPLAY, fontWeight: 700,
        fontSize: "15px", color: INK, boxShadow: "0 2px 0 rgba(16,36,62,0.65)", whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function GameButton({ children, onClick, color = "#2F86D6", small }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="ng-app"
      style={{
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: small ? "13px" : "14px",
        color: "#FFFFFF", background: color, border: "2px solid #10243E",
        borderRadius: "16px", padding: small ? "7px 12px" : "10px 18px",
        cursor: "pointer", boxShadow: pressed ? "0 1px 0 rgba(16,36,62,0.7)" : "0 4px 0 rgba(16,36,62,0.7)",
        transition: "box-shadow 100ms ease", display: "inline-flex",
        alignItems: "center", gap: "6px", whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, accent, style: styleProp }) {
  return (
    <div
      style={{
        background: "#FFFDF7", border: "3px solid #10243E", borderRadius: "24px",
        boxShadow: `0 5px 0 ${accent || "#10243E"}22, 0 6px 14px rgba(16,36,62,0.15)`,
        padding: "24px", ...styleProp,
      }}
    >
      {children}
    </div>
  );
}

function TopBar({ onHome, onGoClubs, page }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: "#FFFDF7", borderBottom: `3px solid ${INK}`, position: "relative", zIndex: 5, flexShrink: 0 }}>
      <button onClick={onHome} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#2FAE60", border: `2px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏠</div>
        <span className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "17px", color: INK }}>Domov</span>
      </button>
      <GameButton small color="#2FAE60" onClick={onGoClubs}>🏆 Klubi</GameButton>
    </div>
  );
}

function PageShell({ children, onHome, onGoClubs, page }) {
  const bgImage = page === "home" ? footballHero : background;
  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", fontFamily: FONT_BODY }}>
      <GlobalStyle />
      <TopBar onHome={onHome} onGoClubs={onGoClubs} page={page} />
      <div style={{ position: "absolute", inset: 0, top: "62px", backgroundImage: `linear-gradient(180deg, rgba(6,20,10,0.25), rgba(6,20,10,0.60)), url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, top: "62px", zIndex: 1, pointerEvents: "none" }}>
        <span className="twinkle" style={{ position: "absolute", top: "8%", left: "6%", fontSize: 22 }}>⭐</span>
        <span className="twinkle" style={{ position: "absolute", top: "22%", right: "10%", fontSize: 18, animationDelay: "0.6s" }}>⭐</span>
        <span className="twinkle" style={{ position: "absolute", bottom: "14%", left: "12%", fontSize: 16, animationDelay: "1.1s" }}>✨</span>
      </div>
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ───────────────────────────────────────────────── */

function HomePage({ onGoClubs, onGoClub }) {
  const klubDneva = useMemo(() => {
    const withCrest = clubsData.filter((c) => c.crest);
    return withCrest[Math.floor(Math.random() * withCrest.length)];
  }, []);

  const firstSentence = klubDneva ? klubDneva.info_sl.split(/(?<=\.)\s+/)[0] : "";

  return (
    <div style={{ minHeight: "calc(100vh - 62px)", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "48px 28px", display: "flex", flexDirection: "column", gap: "36px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2FAE60", border: "2px solid #10243E", borderRadius: "10px", padding: "5px 14px 6px", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: "#FFFFFF", boxShadow: "0 2px 0 rgba(16,36,62,0.4)", marginBottom: "14px" }} className="ng-app">
            ⚽ Zbirka za prave navijače
          </div>
          <h1 className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(28px, 5vw, 52px)", color: "#FFFFFF", lineHeight: 1.1, textShadow: "0 2px 6px rgba(0,0,0,0.5)", maxWidth: "700px", marginBottom: "12px" }}>
            Vsak grb skriva zgodbo.
          </h1>
          <p className="ng-app" style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 3px rgba(0,0,0,0.5)", maxWidth: "560px" }}>
            Odkrij junake, netopirje, topove in barve velikih klubov.
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <button onClick={onGoClubs} className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "16px", color: "#FFFFFF", background: "#2FAE60", border: "2px solid #10243E", borderRadius: "18px", padding: "14px 28px", cursor: "pointer", boxShadow: "0 4px 0 rgba(16,36,62,0.7)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            🏆 Vsi klubi
          </button>
        </div>

        {klubDneva && (
          <div>
            <div className="ng-app" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFD23F", border: "2px solid #10243E", borderRadius: "10px", padding: "5px 14px 6px", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: INK, boxShadow: "0 2px 0 rgba(16,36,62,0.4)", marginBottom: "12px" }}>
              ⭐ Klub dneva
            </div>
            <div
              onClick={() => onGoClub(klubDneva.name)}
              style={{ display: "flex", alignItems: "center", gap: "20px", background: "#FFFDF7", border: "3px solid #10243E", borderRadius: "24px", padding: "20px", cursor: "pointer", boxShadow: "0 5px 0 rgba(16,36,62,0.2)", maxWidth: "520px", transition: "transform 120ms ease" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#EAF3FF", border: "2px solid #10243E", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                <img src={`/grbi/${klubDneva.crest}`} alt={klubDneva.name} style={{ width: "74px", height: "74px", objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "18px", color: INK, marginBottom: "6px" }}>{klubDneva.name}</div>
                <p className="ng-app" style={{ fontFamily: FONT_BODY, fontSize: "14px", color: `${INK}CC`, lineHeight: 1.45, margin: 0 }}>{firstSentence}</p>
                <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "12px", color: "#2FAE60", marginTop: "10px" }}>Odkrij zgodbo →</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CLUBS LIST PAGE ─────────────────────────────────────────── */

function ClubsPage({ onSelectClub }) {
  const [country, setCountry] = useState("all");
  const [sortBy, setSortBy] = useState("alpha");

  const countries = useMemo(() => Array.from(new Set(clubsData.map((c) => c.country))).sort(), []);

  const filtered = useMemo(() => {
    let list = clubsData.filter((c) => country === "all" || c.country === country);
    if (sortBy === "alpha") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "oldest") list = [...list].sort((a, b) => a.founded_year - b.founded_year);
    if (sortBy === "newest") list = [...list].sort((a, b) => b.founded_year - a.founded_year);
    return list;
  }, [country, sortBy]);

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "20px 20px 48px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "inline-block", background: "#2FAE60", padding: "5px 14px 7px", borderRadius: "10px", transform: "rotate(-1deg)", boxShadow: "0 3px 0 rgba(16,36,62,0.22)", marginBottom: "10px" }}>
          <span className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: "#FFFFFF" }}>Zbirka grbov</span>
        </div>
        <h1 className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF", textShadow: "0 2px 0 rgba(16,36,62,0.5)", marginBottom: "6px" }}>Izberi svoj klub</h1>
        <p className="ng-app" style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: "14px", color: "#FFFFFF", textShadow: "0 1px 0 rgba(16,36,62,0.4)" }}>Tapni grb in odkrij njegovo zgodbo.</p>
      </div>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "16px", alignItems: "flex-end" }}>
        <div>
          <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "11px", color: "#FFFFFF", marginBottom: "5px" }}>🏳️ Država</div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: INK, background: "#FFFDF7", border: "2px solid #10243E", borderRadius: "12px", padding: "8px 12px", cursor: "pointer", boxShadow: "0 2px 0 rgba(16,36,62,0.5)" }}>
            <option value="all">Vse države</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "11px", color: "#FFFFFF", marginBottom: "5px" }}>↕️ Razvrsti</div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: INK, background: "#FFFDF7", border: "2px solid #10243E", borderRadius: "12px", padding: "8px 12px", cursor: "pointer", boxShadow: "0 2px 0 rgba(16,36,62,0.5)" }}>
            <option value="alpha">Po abecedi</option>
            <option value="oldest">Najstarejši prvi</option>
            <option value="newest">Najnovejši prvi</option>
          </select>
        </div>
        <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "13px", color: INK, background: "#FFD23F", border: "2px solid #10243E", borderRadius: "10px", padding: "8px 14px", boxShadow: "0 2px 0 rgba(16,36,62,0.5)" }}>
          {filtered.length} {filtered.length === 1 ? "klub" : "klubov"}
        </div>
      </div>

      <div className="clubs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {filtered.map((club) => {
          const crestImg = club.crest ? `/grbi/${club.crest}` : null;
          return (
            <div key={club.name} className="club-card" onClick={() => onSelectClub(club.name)}>
              <Card accent={club.primaryColor} style={{ padding: "18px 14px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
                <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#EAF3FF", border: "2px solid #10243E", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                  {crestImg ? <img src={crestImg} alt={club.name} style={{ width: "74px", height: "74px", objectFit: "contain" }} /> : <span style={{ fontSize: "36px" }}>⚽</span>}
                </div>
                <div>
                  <div className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "14px", color: INK, lineHeight: 1.2, marginBottom: "4px" }}>{club.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    <Flag code={club.flagCode} />
                    <span className="ng-app" style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: "12px", color: `${INK}88` }}>{club.country} · {club.founded_year}</span>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── DETAIL PAGE ─────────────────────────────────────────────── */

function DetailPage({ clubName }) {
  const startIndex = clubsData.findIndex((c) => c.name === clubName);
  const [index, setIndex] = useState(startIndex >= 0 ? startIndex : 0);
  const club = clubsData[index];
  const primary = club.primaryColor || "#2F86D6";
  const secondary = club.secondaryColor || "#FFD23F";
  const crestImg = club.crest ? `/grbi/${club.crest}` : null;
  const sentences = club.info_sl.split(/(?<=\.)\s+/).filter(Boolean);
  const [showCrestZoom, setShowCrestZoom] = useState(false);

  const goPrev = () => { setShowCrestZoom(false); setIndex((i) => (i - 1 + clubsData.length) % clubsData.length); window.scrollTo(0, 0); };
  const goNext = () => { setShowCrestZoom(false); setIndex((i) => (i + 1) % clubsData.length); window.scrollTo(0, 0); };

  return (
    <div style={{ "--primary": primary, "--secondary": secondary, maxWidth: "1080px", margin: "0 auto", padding: "18px 20px 40px" }}>
      <div className="ce-header" style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "20px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => crestImg && setShowCrestZoom(true)}
            aria-label="Poglej grb v velikem prikazu"
            style={{ width: "180px", height: "180px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #10243E", boxShadow: "0 4px 0 rgba(16,36,62,0.22)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 0, cursor: crestImg ? "pointer" : "default" }}
          >
            {crestImg ? <img src={crestImg} alt={club.name + " grb"} style={{ width: "150px", height: "150px", objectFit: "contain" }} /> : <span style={{ fontSize: "64px" }}>⚽</span>}
          </button>
          {crestImg && (
            <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "34px", height: "34px", borderRadius: "50%", background: "#FFD23F", border: "2px solid #10243E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", pointerEvents: "none" }}>🔍</div>
          )}
        </div>
        <div style={{ paddingTop: "8px" }}>
          <div style={{ display: "inline-block", background: "var(--primary)", padding: "6px 18px 8px", borderRadius: "10px", transform: "rotate(-1deg)", boxShadow: "0 3px 0 rgba(16,36,62,0.22)", marginBottom: "14px" }}>
            <h1 className="ng-app" style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(24px, 4vw, 42px)", color: "#FFFFFF", lineHeight: 1 }}>{club.name}</h1>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Pill><Flag code={club.flagCode} /> {club.country}</Pill>
            {club.city && <Pill>📍 {club.city}</Pill>}
            <Pill>📅 Ustanovljen {club.founded_year}</Pill>
          </div>
        </div>
      </div>

      <div className="ce-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <Card accent={primary}>
          <div className="ng-app" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--primary)", color: "#FFFFFF", borderRadius: "12px", padding: "8px 14px", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>💡 Kaj prikazuje grb?</div>
          {sentences.map((sentence, i) => (
            <p key={i} className="ng-app" style={{ fontSize: "15px", lineHeight: 1.55, color: INK, marginBottom: i === sentences.length - 1 ? 0 : "10px" }}>{sentence}</p>
          ))}
        </Card>

        <div style={{ position: "relative" }}>
          <div className="ce-mascot" style={{ position: "absolute", top: "-44px", right: "20px", width: "84px", height: "84px", zIndex: 3 }}>
            <img src={mascot} alt="Maskota" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.15))" }} />
          </div>
          <Card accent={secondary} style={{ background: "#FFF7DC" }}>
            <div className="ng-app" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: INK, color: "#FFD23F", borderRadius: "12px", padding: "8px 14px", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>⚽ Ali si vedel?</div>
            <ul className="ng-app" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {club.trivia_sl.map((fact, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "15px", color: INK, lineHeight: 1.4 }}>
                  <span style={{ fontSize: "17px", flexShrink: 0 }}>⚽</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", height: "48px" }}>
        <GameButton color="#2F86D6" onClick={goPrev}>← Prejšnji grb</GameButton>
        <GameButton color="#2FAE60" onClick={goNext}>Naslednji klub →</GameButton>
      </div>

      {showCrestZoom && crestImg && (
        <div onClick={() => setShowCrestZoom(false)} style={{ position: "fixed", inset: 0, background: "rgba(6,20,10,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: "24px" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FFFFFF", borderRadius: "28px", border: "3px solid #10243E", padding: "28px", boxShadow: "0 6px 0 rgba(16,36,62,0.25)", maxWidth: "min(92vw, 420px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <img src={crestImg} alt={club.name + " grb"} style={{ width: "100%", maxWidth: "340px", height: "auto", objectFit: "contain" }} />
            <GameButton color="#D9455F" onClick={() => setShowCrestZoom(false)}>Zapri</GameButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── APP ROOT ────────────────────────────────────────────────── */

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedClub, setSelectedClub] = useState(null);

  const goToClub = (name) => { setSelectedClub(name); setPage("detail"); window.scrollTo(0, 0); };
  const goHome = () => { setPage("home"); setSelectedClub(null); window.scrollTo(0, 0); };
  const goClubs = () => { setPage("clubs"); window.scrollTo(0, 0); };

  return (
    <PageShell onHome={goHome} onGoClubs={goClubs} page={page}>
      {page === "home"   && <HomePage onGoClubs={goClubs} onGoClub={goToClub} />}
      {page === "clubs"  && <ClubsPage onSelectClub={goToClub} />}
      {page === "detail" && <DetailPage clubName={selectedClub} />}
    </PageShell>
  );
}
