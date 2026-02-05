'use client'
import React, { useState, useEffect } from 'react';
import { useLangStore } from '@/store/lang';

// 1. Translation Object
const translations = {
  EN: {
    myBets: "My Bets",
    worldCup: "World Cup 2026",
    groupPhase: "Group Phase",
    connectWallet: "Connect Wallet",
    win: "wins",
    draw: "Draw",
    knockoutTitle: "Knockout Road to NY/NJ",
    awaiting: "Awaiting Group Results",
    english: "English",
    spanish: "Spanish"
  },
  ES: {
    myBets: "Mis Apuestas",
    worldCup: "Copa Mundial 2026",
    groupPhase: "Fase de Grupos",
    connectWallet: "Conectar Billetera",
    win: "gana",
    draw: "Empate",
    knockoutTitle: "Camino a la Final NY/NJ",
    awaiting: "Esperando Resultados",
    english: "Inglés",
    spanish: "Español"
  }
};

const PAGE = () => {
  return <View />
}

const View = () => {
  // 2. Access Language Store
  const { lang, setLang, getLang } = useLangStore();
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Helper to access current translations
  const t = translations[lang as keyof typeof translations];

 const { groupMatches, knockoutRounds } = getTournamentData(lang);

 useEffect(() => { 
      setLang(getLang());
  }, []);

  function getTournamentData(lang: string) {
    const isEn = lang === 'EN';

    const groupMatches = [
      { 
        id: "1", 
        group: isEn ? "Group A" : "Grupo A", 
        teamA: "Mexico", 
        teamB: isEn ? "South Africa" : "Sudáfrica", 
        time: isEn ? "June 11 - 15:00" : "11 de Junio - 15:00", 
        venue: "Estadio Azteca", 
        emojiA: "🇲🇽", 
        emojiB: "🇿🇦" 
      },
      { 
        id: "2", 
        group: isEn ? "Group D" : "Grupo D", 
        teamA: "USA", 
        teamB: "Paraguay", 
        time: isEn ? "June 12 - 18:00" : "12 de Junio - 18:00", 
        venue: "SoFi Stadium", 
        emojiA: "🇺🇸", 
        emojiB: "🇵🇾" 
      },
      { 
        id: "3", 
        group: isEn ? "Group L" : "Grupo L", 
        teamA: isEn ? "England" : "Inglaterra", 
        teamB: isEn ? "Croatia" : "Croacia", 
        time: isEn ? "June 17 - 16:00" : "17 de Junio - 16:00", 
        venue: isEn ? "Dallas Stadium" : "Estadio de Dallas", 
        emojiA: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 
        emojiB: "🇭🇷" 
      },
    ];

    const knockoutRounds = [
      { 
        name: isEn ? "Round of 16" : "Octavos de Final", 
        date: isEn ? "July 4-7" : "4-7 de Julio", 
        color: "border-slate-600" 
      },
      { 
        name: isEn ? "Quarter-Finals" : "Cuartos de Final", 
        date: isEn ? "July 9-11" : "9-11 de Julio", 
        color: "border-blue-500/60" 
      },
      { 
        name: isEn ? "Semi-Finals" : "Semifinales", 
        date: isEn ? "July 14-15" : "14-15 de Julio", 
        color: "border-indigo-500/60" 
      },
      { 
        name: isEn ? "Final" : "Final", 
        date: isEn ? "July 19" : "19 de Julio", 
        color: "border-cyan-400/60" 
      },
    ];

    return { groupMatches, knockoutRounds };
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f1d] to-[#1e1b4b] text-slate-100 font-sans pb-20">
      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-3 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold tracking-tighter text-blue-400">
            <span>N<span className="text-cyan-400">O</span>KU</span>
          </div>
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition">{t.myBets}</a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition font-bold">{t.worldCup}</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition border border-transparent hover:border-slate-700"
            >
              <span className="uppercase">{lang}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <button 
                  onClick={() => { setLang('EN'); setIsLangOpen(false); }} 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition"
                >
                  {t.english}
                </button>
                <button 
                  onClick={() => { setLang('ES'); setIsLangOpen(false); }} 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition"
                >
                  {t.spanish}
                </button>
              </div>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/20 active:scale-95">
            {t.connectWallet}
          </button>
        </div>
      </nav>

      <main className="p-4 max-w-5xl mx-auto">
        {/* 1. GROUP STAGE */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-400/80 font-black mt-5">{t.groupPhase}</h2>

          {groupMatches.map((match) => (
            <div key={match.id} className="bg-[#111827] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all hover:border-slate-700">
              <div className="bg-slate-800/40 px-5 py-3 flex justify-between items-center border-b border-slate-800/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{match.group} • {match.venue}</span>
                <span className="text-[11px] text-blue-400 font-bold uppercase tracking-tight">{match.time}</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 px-4">
                  <div className="flex flex-col items-center w-28">
                    <div className="text-4xl mb-3 filter drop-shadow-sm">{match.emojiA}</div>
                    <p className="text-sm font-black uppercase tracking-tight text-center">{match.teamA}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-500 italic">VS</div>
                  </div>
                  <div className="flex flex-col items-center w-28">
                    <div className="text-4xl mb-3 filter drop-shadow-sm">{match.emojiB}</div>
                    <p className="text-sm font-black uppercase tracking-tight text-center">{match.teamB}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { 
                      label: `${match.teamA} ${t.win}`, 
                      base: "bg-blue-500/10 border-blue-500/20 text-blue-100",
                      hover: "hover:bg-blue-600 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                    },
                    { 
                      label: t.draw, 
                      base: "bg-slate-500/10 border-slate-700 text-slate-100",
                      hover: "hover:bg-slate-600 hover:border-slate-400 hover:shadow-[0_0_15px_rgba(71,85,105,0.3)]" 
                    },
                    { 
                      label: `${match.teamB} ${t.win}`, 
                      base: "bg-indigo-500/10 border-indigo-500/20 text-indigo-100",
                      hover: "hover:bg-indigo-600 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                    }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      className={`relative py-4 rounded-2xl border transition-all duration-300 active:scale-95 group overflow-hidden ${opt.base} ${opt.hover}`}
                    >
                      <span className="block text-[9px] font-bold opacity-60 group-hover:opacity-100 group-hover:text-white uppercase mb-1 transition-all">
                        {opt.label}
                      </span>
                      <span className="text-xl font-mono font-black tracking-tighter group-hover:text-white transition-colors">
                        {Math.floor((100000 * Math.random())).toLocaleString()} <span className="text-[10px] ml-1 opacity-70 group-hover:opacity-100">USDC</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 2. KNOCKOUTS */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">{t.knockoutTitle}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {knockoutRounds.map((round) => (
              <div 
                key={round.name} 
                className={`relative p-8 rounded-3xl border-2 border-dashed ${round.color} bg-slate-900/60 flex flex-col items-center justify-center text-center transition-all group hover:bg-slate-900/80`}
              >
                <div className="absolute top-3 right-5 text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{round.date}</div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:animate-pulse" />
                  <h3 className="text-xl font-black italic text-slate-300 uppercase tracking-tighter group-hover:text-white transition-colors">
                    {round.name}
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest opacity-90 group-hover:text-slate-400">
                  {t.awaiting}
                </p>
                <div className="mt-5 flex gap-3">
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors"></div>
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PAGE;