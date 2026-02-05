'use client'
import React, { useState } from 'react';
import { useLangStore } from '@/store/lang';

const PAGE = () => {
    return (
        <View />
        // <BettingPage />
        // <WorldCup2026Betting />
        // <EpicWorldCupUI />
    )
  }



const View = () => {
  // Real 2026 Groups (Mocked data)
  const groupMatches = [
    { id: "1", contractMatchId: "", group: "Group A", teamA: "Mexico", teamB: "South Africa", time: "June 11 - 15:00", venue: "Estadio Azteca", emojiA: "🇲🇽", emojiB: "🇿🇦" },
    { id: "2", contractMatchId: "", group: "Group D", teamA: "USA", teamB: "Paraguay", time: "June 12 - 18:00", venue: "SoFi Stadium", emojiA: "🇺🇸", emojiB: "🇵🇾" },
    { id: "3", contractMatchId: "", group: "Group L", teamA: "England", teamB: "Croatia", time: "June 17 - 16:00", venue: "Dallas Stadium", emojiA: "EG", emojiB: "🇭🇷" },
  ];

  const knockoutRounds = [
    { name: "Round of 16", date: "July 4-7", color: "border-slate-600" },
    { name: "Quarter-Finals", date: "July 9-11", color: "border-blue-500/60" },
    { name: "Semi-Finals", date: "July 14-15", color: "border-indigo-500/60" },
    { name: "Final", date: "July 19", color: "border-cyan-400/60" },
  ];

  // Mocking store for the sake of the snippet
  const [lang, setLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    // <div className="min-h-screen bg-[#0a0f1d] left text-slate-100 font-sans pb-20">
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f1d] to-[#1e1b4b] left text-slate-100 font-sans pb-20">
      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-3 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold tracking-tighter text-blue-400">
            <span>N<span className="text-cyan-400">O</span>KU</span>
          </div>
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition">My Bets</a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition font-bold">World Cup 2026</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition border border-transparent hover:border-slate-700"
            >
              <span className="uppercase">{lang}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50">
                {['EN', 'ES'].map((l) => (
                  <button key={l} onClick={() => { setLang(l); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 first:rounded-t-xl last:rounded-b-xl">{l === 'EN' ? 'English' : 'Español'}</button>
                ))}
              </div>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/20 active:scale-95">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="p-4 max-w-5xl mx-auto">
        {/* 1. GROUP STAGE SECTION */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-400/80 font-black mt-5">Group Phase</h2>

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

                {/* BETTING BUTTONS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { 
                      label: `${match.teamA} wins`, 
                      base: "bg-blue-500/10 border-blue-500/20 text-blue-100",
                      hover: "hover:bg-blue-600 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                    },
                    { 
                      label: "Draw", 
                      base: "bg-slate-500/10 border-slate-700 text-slate-100",
                      hover: "hover:bg-slate-600 hover:border-slate-400 hover:shadow-[0_0_15px_rgba(71,85,105,0.3)]" 
                    },
                    { 
                      label: `${match.teamB} wins`, 
                      base: "bg-indigo-500/10 border-indigo-500/20 text-indigo-100",
                      hover: "hover:bg-indigo-600 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                    }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      className={`relative py-4 rounded-2xl border transition-all duration-300 active:scale-95 group overflow-hidden ${opt.base} ${opt.hover}`}
                    >
                      {/* Top Label */}
                      <span className="block text-[9px] font-bold opacity-60 group-hover:opacity-100 group-hover:text-white uppercase mb-1 transition-all">
                        {opt.label}
                      </span>

                      {/* Amount / Odds */}
                      <span className="text-xl font-mono font-black tracking-tighter group-hover:text-white transition-colors">
                        {Math.floor((100000 * Math.random())).toLocaleString()} <span className="text-[10px] ml-1 opacity-70 group-hover:opacity-100">USDC</span>
                      </span>

                      {/* Subtle Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 2. KNOCKOUTS SECTION */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">Knockout Road to NY/NJ</h2>
          
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
                  Awaiting Group Results
                </p>
                
                {/* Visual Bracket Connector */}
                <div className="mt-5 flex gap-3">
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors"></div>
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      {/* <div className="fixed bottom-6 right-6">
        <button className="w-16 h-16 bg-blue-600 hover:bg-blue-500 transition-all rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center text-white relative active:scale-90 group">
          <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-900 text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-[#0a0f1d]">0</span>
          <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </button>
      </div> */}
    </div>
  );
};


  const WorldCup2026Betting = () => {
    // Real 2026 Groups (Mocked data for UI based on recent draws)
    const groupMatches = [
      { group: "Group A", teamA: "Mexico", teamB: "South Africa", time: "June 11 - 15:00", venue: "Estadio Azteca" },
      { group: "Group D", teamA: "USA", teamB: "Paraguay", time: "June 12 - 18:00", venue: "SoFi Stadium" },
      { group: "Group L", teamA: "England", teamB: "Croatia", time: "June 17 - 16:00", venue: "Dallas Stadium" },
    ];
  
    const knockoutRounds = [
      { name: "Round of 16", date: "July 4-7", color: "border-slate-700" },
      { name: "Quarter-Finals", date: "July 9-11", color: "border-blue-500/50" },
      { name: "Semi-Finals", date: "July 14-15", color: "border-purple-500/50" },
      { name: "Final", date: "July 19", color: "border-yellow-500" },
    ];
  
    return (
      <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans pb-20">
        {/* WC26 Header */}
        <nav className="flex items-center justify-between px-6 py-4 bg-[#0f172a] border-b border-yellow-500/20 sticky top-0 z-50 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)]"></div>
            <span className="font-black text-xl tracking-tighter italic">WC<span className="text-yellow-500">26</span> BET</span>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-full text-xs font-bold transition-all transform active:scale-95">
            CONNECT WALLET
          </button>
        </nav>
  
        <main className="p-4 max-w-2xl mx-auto">
          
          {/* Phase Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-800">
            <button className="pb-2 border-b-2 border-yellow-500 text-yellow-500 font-bold text-sm">Group Stage</button>
            <button className="pb-2 text-slate-500 font-bold text-sm hover:text-slate-300">Knockout Bracket</button>
          </div>
  
          {/* 1. GROUP STAGE SECTION */}
          <section className="space-y-6 mb-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-yellow-500/70 font-bold">Live Group Phase</h2>
            
            {groupMatches.map((match, idx) => (
              <div key={idx} className="bg-[#161e31] rounded-3xl overflow-hidden border border-slate-800 shadow-lg">
                <div className="bg-slate-800/50 px-4 py-2 flex justify-between items-center border-b border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-400">{match.group} • {match.venue}</span>
                  <span className="text-[10px] text-yellow-500 font-mono uppercase">{match.time}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center w-24">
                      <div className="text-3xl mb-1">🇲🇽</div>
                      <p className="text-sm font-bold truncate">{match.teamA}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-slate-600 italic">VS</span>
                    </div>
                    <div className="text-center w-24">
                      <div className="text-3xl mb-1">🇿🇦</div>
                      <p className="text-sm font-bold truncate">{match.teamB}</p>
                    </div>
                  </div>
  
                  <div className="grid grid-cols-3 gap-3">
                    {['1', 'X', '2'].map((odd, i) => (
                      <button key={i} className="bg-[#1e293b] hover:bg-yellow-500 hover:text-black py-3 rounded-2xl border border-slate-700 transition-all duration-300 group">
                        <span className="block text-[10px] opacity-50 font-bold group-hover:opacity-100 uppercase">
                          {i === 0 ? 'Home' : i === 1 ? 'Draw' : 'Away'}
                        </span>
                        <span className="text-lg font-mono font-bold">{(1.5 + Math.random() * 2).toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
  
          {/* 2. KNOCKOUTS PLACEHOLDERS */}
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Knockout Road to NY/NJ</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {knockoutRounds.map((round) => (
                <div 
                  key={round.name} 
                  className={`relative p-6 rounded-2xl border-2 border-dashed ${round.color} bg-slate-900/40 flex flex-col items-center justify-center text-center opacity-60`}
                >
                  <div className="absolute top-2 right-4 text-[10px] font-mono text-slate-600">{round.date}</div>
                  <h3 className="text-lg font-black italic text-slate-400 uppercase tracking-tighter">{round.name}</h3>
                  <p className="text-[10px] text-slate-600 mt-1 uppercase font-bold">Matches unlocked after group stage</p>
                  
                  {/* Visual "Empty" Bracket Connector */}
                  <div className="mt-4 flex gap-2">
                    <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                    <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
        </main>
  
        {/* Floating Action Button for Bet Slip (Web3 style) */}
        <div className="fixed bottom-6 right-6">
          <button className="w-14 h-14 bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] flex items-center justify-center text-black relative">
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#0a0f1d]">0</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </button>
        </div>
      </div>
    );
  };
  
  const BettingPage = () => {
  const sports = ["Soccer", "Basketball", "Tennis", "Esports", "MMA", "Cricket", "Baseball", "Ice Hockey", "American Football", "Golf"];
  const cups = ["Cup 1", "Cup 2", "Cup 3", "League Alpha", "Tournament Beta"];
  const { setLang, lang } = useLangStore()
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(sports[0]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold tracking-tighter text-blue-400">
            <span>N<span className="text-yellow-500">O</span>KU</span>
          </div>
          
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <a href="#" className="text-blue-400">Explore Bets</a>
            <a href="#" className="text-slate-400 hover:text-white transition">My Bets</a>
            <a href="#" className="text-yellow-500 hover:text-white transition font-bold">World Cup 2026</a>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 rounded-lg transition border border-transparent hover:border-slate-600"
            >
              <span className="uppercase">{lang}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-100">
                <button 
                  onClick={() => { setLang('EN'); setIsLangOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  English
                </button>
                <button 
                  onClick={() => { setLang('ES'); setIsLangOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  Español
                </button>
              </div>
            )}
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/20">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="p-4 max-w-4xl mx-auto">
        
        {/* Sport Selection Dropdown */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Select Sport</label>
          <select value={selectedSport} onChange={
            (e)=>{
              console.log(e.target.value)
              setSelectedSport(e.target.value)
            }
            } className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        {/* Tournament Filters */}
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Tournament</label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {cups.map((cup) => (
              <button key={cup} className="whitespace-nowrap bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition">
                {cup}
              </button>
            ))}
          </div>
        </div>

        {/* Match Cards Container */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold mb-4 px-1">Upcoming Matches</h2>
          
          {[1, 2, 3].map((match) => (
            <div key={match} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
              {/* Match Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-blue-900/30 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Cup 1</span>
                  <p className="text-slate-400 text-xs mt-2">Today • 20:45 UTC</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400 font-mono">Live Odds</span>
                </div>
              </div>

              {/* Versus Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-lg">A</div>
                  <p className="font-bold text-sm">Team Alpha</p>
                </div>
                <div className="px-4 text-slate-500 font-black italic text-xl">VS</div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-lg">B</div>
                  <p className="font-bold text-sm">Team Bravo</p>
                </div>
              </div>

              {/* Betting Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center py-3 bg-slate-900/50 hover:bg-blue-600 border border-slate-700 rounded-xl transition group">
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-100 uppercase">Team A</span>
                  <span className="font-bold">2.10</span>
                </button>
                <button className="flex flex-col items-center justify-center py-3 bg-slate-900/50 hover:bg-blue-600 border border-slate-700 rounded-xl transition group">
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-100 uppercase">Draw</span>
                  <span className="font-bold">3.40</span>
                </button>
                <button className="flex flex-col items-center justify-center py-3 bg-slate-900/50 hover:bg-blue-600 border border-slate-700 rounded-xl transition group">
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-100 uppercase">Team B</span>
                  <span className="font-bold">1.85</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Navigation (Optional Bottom Bar for UX) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around py-3">
        <button className="text-blue-400 flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
          <span className="text-[10px]">Explore</span>
        </button>
        <button className="text-slate-500 flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-slate-500 rounded-sm"></div>
          <span className="text-[10px]">My Bets</span>
        </button>
      </div>
    </div>
  );
};



const EpicWorldCupUI = () => {
  const knockoutPhases = [
    { name: "Round of 32", teams: "32 Teams", color: "from-blue-500 to-cyan-400" },
    { name: "Quarter Finals", teams: "8 Teams", color: "from-purple-500 to-pink-500" },
    { name: "The Grand Final", teams: "July 19", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-[#040712] text-white font-sans selection:bg-cyan-500/30">
      {/* Cinematic Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Epic Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full"></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            World<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Cup</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition">Matches</a>
          <a href="#" className="hover:text-cyan-400 transition">Bracket</a>
          <a href="#" className="hover:text-cyan-400 transition">Predictions</a>
        </div>
        <button className="relative group overflow-hidden px-6 py-2 rounded-full bg-white text-black font-bold text-xs uppercase tracking-tighter hover:scale-105 transition-transform">
          <span className="relative z-10">Connect Wallet</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </nav>

      <main className="relative z-10 p-6 max-w-5xl mx-auto">
        
        {/* Hero "Epic" Match Card */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-[#0d1225] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Opening Match</span>
            </div>
            
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-8">Group A • Mexico City</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🇲🇽</div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">Mexico</h2>
                <p className="text-cyan-400 font-mono text-sm mt-1">Host Nation</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-white/10 italic leading-none mb-2">VS</div>
                <div className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-cyan-500/20">June 11, 2026</div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🇿🇦</div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">South Africa</h2>
                <p className="text-purple-400 font-mono text-sm mt-1">Group A</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[1.95, 3.20, 4.50].map((odd, i) => (
                <button key={i} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">{i === 0 ? 'Win' : i === 1 ? 'Draw' : 'Win'}</span>
                  <span className="text-xl font-black font-mono tracking-tighter group-hover:text-cyan-400 transition-colors">{odd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Knockout Brackets Section */}
        <section className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Knockout <span className="text-slate-600">Road</span></h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Predict the path to the New York Final</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knockoutPhases.map((phase, i) => (
              <div key={i} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${phase.color} rounded-3xl opacity-20 group-hover:opacity-100 blur transition duration-500`}></div>
                <div className="relative h-full bg-[#0a0f1d] rounded-3xl p-6 border border-white/5">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-slate-500">
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{phase.teams}</span>
                  </div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">{phase.name}</h4>
                  <div className="space-y-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Locked Until July</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Floating Glass Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl z-50">
        <button className="px-6 py-2 rounded-full bg-cyan-500 text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">Matches</button>
        <button className="px-6 py-2 rounded-full text-white/40 text-xs font-black uppercase tracking-widest hover:text-white transition">My Slip</button>
        <button className="px-6 py-2 rounded-full text-white/40 text-xs font-black uppercase tracking-widest hover:text-white transition">History</button>
      </div>
    </div>
  );
};


export default PAGE;