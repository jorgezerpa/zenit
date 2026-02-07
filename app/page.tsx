'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useLangStore } from '@/store/lang';
import { WalletOptions } from '@/components/WalletOptions';
import { useConnection, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

// 1. Translation Object
const translations = {
  EN: {
    myBets: "My Bets",
    worldCup: "World Cup 2026",
    groupPhase: "Group Phase",
    connectWallet: "Connect Wallet",
    disconnectWallet: "Disconnect Wallet",
    win: "wins",
    draw: "Draw",
    knockoutTitle: "Knockout Road to NY/NJ",
    awaiting: "Awaiting Group Results",
    english: "English",
    spanish: "Spanish",
    // Drawer Strings
    bettingOn: "You're backing",
    amountToBet: "Amount to wager",
    potentialWin: "Estimated Payout",
    placeBet: "Confirm & Place Bet",
    poolNote: "Note: Pool totals may shift before kickoff.",
    balance: "Balance",
    connectWalletFromDrawer: "Please connect your wallet to place a bet"
  },
  ES: {
    myBets: "Mis Apuestas",
    worldCup: "Copa Mundial 2026",
    groupPhase: "Fase de Grupos",
    connectWallet: "Conectar Billetera",
    disconnectWallet: "Desconectar Billetera",
    win: "gana",
    draw: "Empate",
    knockoutTitle: "Camino a la Final NY/NJ",
    awaiting: "Esperando Resultados",
    english: "Inglés",
    spanish: "Español",
    // Drawer Strings
    bettingOn: "Tu apuesta para",
    amountToBet: "Cantidad a apostar",
    potentialWin: "Ganancia Estimada",
    placeBet: "Confirmar Apuesta",
    poolNote: "Nota: Los pozos pueden variar antes del inicio.",
    balance: "Saldo",
    connectWalletFromDrawer: "Conecta tu billetera para hacer apuestas"
  }
};

const PAGE = () => {
  return <View />
}

const View = () => {
  // 1. 
  const { address, isConnected } = useConnection()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  // 2. Access Language Store
  const { lang, setLang, getLang } = useLangStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSelection, setActiveSelection] = useState<any>(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  // Helper to access current translations
  const t = translations[lang as keyof typeof translations];

 const { groupMatches, knockoutRounds } = getTournamentData(lang);

 useEffect(() => { 
      setLang(getLang());
  }, []);

function getTournamentData(lang: string) {
  const isEn = lang === 'EN';

  const groupMatches = [
    // --- GROUP A ---
    { id: "1", group: isEn ? "Group A" : "Grupo A", teamA: "México", teamB: isEn ? "South Africa" : "Sudáfrica", time: isEn ? "June 11 - 15:00" : "11 de Junio - 15:00", isoDate: "2026-06-11T15:00:00", venue: "Estadio Ciudad de México", emojiA: "🇲🇽", emojiB: "🇿🇦" },
    { id: "2", group: isEn ? "Group A" : "Grupo A", teamA: isEn ? "Republic of Korea" : "República de Corea", teamB: "República Checa/Dinamarca/Macedonia del Norte/República de Irlanda_undf", time: isEn ? "June 11 - 22:00" : "11 de Junio - 22:00", isoDate: "2026-06-11T22:00:00", venue: "Estadio Guadalajara", emojiA: "🇰🇷", emojiB: "🏳️" },
    { id: "3", group: isEn ? "Group A" : "Grupo A", teamA: "Dinamarca/Macedonia/República Checa/Irlanda_undf", teamB: isEn ? "South Africa" : "Sudáfrica", time: isEn ? "June 18 - 12:00" : "18 de Junio - 12:00", isoDate: "2026-06-18T12:00:00", venue: "Atlanta Stadium", emojiA: "🏳️", emojiB: "🇿🇦" },
    { id: "4", group: isEn ? "Group A" : "Grupo A", teamA: "México", teamB: isEn ? "Republic of Korea" : "República de Corea", time: isEn ? "June 18 - 21:00" : "18 de Junio - 21:00", isoDate: "2026-06-18T21:00:00", venue: "Estadio Guadalajara", emojiA: "🇲🇽", emojiB: "🇰🇷" },
    { id: "5", group: isEn ? "Group A" : "Grupo A", teamA: "Dinamarca/Macedonia/República Checa/Irlanda_undf", teamB: "México", time: isEn ? "June 24 - 21:00" : "24 de Junio - 21:00", isoDate: "2026-06-24T21:00:00", venue: "Estadio Ciudad de México", emojiA: "🏳️", emojiB: "🇲🇽" },
    { id: "6", group: isEn ? "Group A" : "Grupo A", teamA: isEn ? "South Africa" : "Sudáfrica", teamB: isEn ? "Republic of Korea" : "República de Corea", time: isEn ? "June 24 - 21:00" : "24 de Junio - 21:00", isoDate: "2026-06-24T21:00:00", venue: "Estadio Monterrey", emojiA: "🇿🇦", emojiB: "🇰🇷" },

    // --- GROUP B ---
    { id: "7", group: isEn ? "Group B" : "Grupo B", teamA: isEn ? "Canada" : "Canadá", teamB: "Italia/Nigeria/Gales/Bosnia_undf", time: isEn ? "June 12 - 15:00" : "12 de Junio - 15:00", isoDate: "2026-06-12T15:00:00", venue: "Toronto Stadium", emojiA: "🇨🇦", emojiB: "🏳️" },
    { id: "8", group: isEn ? "Group B" : "Grupo B", teamA: isEn ? "Qatar" : "Catar", teamB: isEn ? "Switzerland" : "Suiza", time: isEn ? "June 13 - 15:00" : "13 de Junio - 15:00", isoDate: "2026-06-13T15:00:00", venue: "San Francisco Bay Area Stadium", emojiA: "🇶🇦", emojiB: "🇨🇭" },
    { id: "9", group: isEn ? "Group B" : "Grupo B", teamA: isEn ? "Switzerland" : "Suiza", teamB: "Italia/Irlanda/Gales/Bosnia_undf", time: isEn ? "June 18 - 15:00" : "18 de Junio - 15:00", isoDate: "2026-06-18T15:00:00", venue: "Los Angeles Stadium", emojiA: "🇨🇭", emojiB: "🏳️" },
    { id: "10", group: isEn ? "Group B" : "Grupo B", teamA: isEn ? "Canada" : "Canadá", teamB: isEn ? "Qatar" : "Catar", time: isEn ? "June 18 - 18:00" : "18 de Junio - 18:00", isoDate: "2026-06-18T18:00:00", venue: "BC Place Vancouver", emojiA: "🇨🇦", emojiB: "🇶🇦" },
    { id: "11", group: isEn ? "Group B" : "Grupo B", teamA: isEn ? "Switzerland" : "Suiza", teamB: isEn ? "Canada" : "Canadá", time: isEn ? "June 24 - 15:00" : "24 de Junio - 15:00", isoDate: "2026-06-24T15:00:00", venue: "BC Place Vancouver", emojiA: "🇨🇭", emojiB: "🇨🇦" },
    { id: "12", group: isEn ? "Group B" : "Grupo B", teamA: "Italia/Irlanda del Norte/Gales/Bosnia_undf", teamB: isEn ? "Qatar" : "Catar", time: isEn ? "June 24 - 15:00" : "24 de Junio - 15:00", isoDate: "2026-06-24T15:00:00", venue: "Seattle Stadium", emojiA: "🏳️", emojiB: "🇶🇦" },

    // --- GROUP C ---
    { id: "13", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Brazil" : "Brasil", teamB: isEn ? "Morocco" : "Marruecos", time: isEn ? "June 13 - 18:00" : "13 de Junio - 18:00", isoDate: "2026-06-13T18:00:00", venue: "NY NJ Stadium", emojiA: "🇧🇷", emojiB: "🇲🇦" },
    { id: "14", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Haiti" : "Haití", teamB: isEn ? "Scotland" : "Escocia", time: isEn ? "June 13 - 21:00" : "13 de Junio - 21:00", isoDate: "2026-06-13T21:00:00", venue: "Boston Stadium", emojiA: "🇭🇹", emojiB: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { id: "15", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Scotland" : "Escocia", teamB: isEn ? "Morocco" : "Marruecos", time: isEn ? "June 19 - 18:00" : "19 de Junio - 18:00", isoDate: "2026-06-19T18:00:00", venue: "Boston Stadium", emojiA: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", emojiB: "🇲🇦" },
    { id: "16", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Brazil" : "Brasil", teamB: isEn ? "Haiti" : "Haití", time: isEn ? "June 19 - 21:00" : "19 de Junio - 21:00", isoDate: "2026-06-19T21:00:00", venue: "Philadelphia Stadium", emojiA: "🇧🇷", emojiB: "🇭🇹" },
    { id: "17", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Brazil" : "Brasil", teamB: isEn ? "Scotland" : "Escocia", time: isEn ? "June 24 - 18:00" : "24 de Junio - 18:00", isoDate: "2026-06-24T18:00:00", venue: "Miami Stadium", emojiA: "🇧🇷", emojiB: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { id: "18", group: isEn ? "Group C" : "Grupo C", teamA: isEn ? "Morocco" : "Marruecos", teamB: isEn ? "Haiti" : "Haití", time: isEn ? "June 24 - 18:00" : "24 de Junio - 18:00", isoDate: "2026-06-24T18:00:00", venue: "Atlanta Stadium", emojiA: "🇲🇦", emojiB: "🇭🇹" },

    // --- GROUP D ---
    { id: "19", group: isEn ? "Group D" : "Grupo D", teamA: isEn ? "USA" : "Estados Unidos", teamB: "Paraguay", time: isEn ? "June 12 - 21:00" : "12 de Junio - 21:00", isoDate: "2026-06-12T21:00:00", venue: "Los Angeles Stadium", emojiA: "🇺🇸", emojiB: "🇵🇾" },
    { id: "20", group: isEn ? "Group D" : "Grupo D", teamA: "Australia", teamB: "Turquía/Rumania/Eslovaquia/Kosovo_undf", time: isEn ? "June 13 - 00:00" : "13 de Junio - 00:00", isoDate: "2026-06-13T00:00:00", venue: "BC Place Vancouver", emojiA: "🇦🇺", emojiB: "🏳️" },
    { id: "21", group: isEn ? "Group D" : "Grupo D", teamA: isEn ? "USA" : "Estados Unidos", teamB: "Australia", time: isEn ? "June 19 - 15:00" : "19 de Junio - 15:00", isoDate: "2026-06-19T15:00:00", venue: "Seattle Stadium", emojiA: "🇺🇸", emojiB: "🇦🇺" },
    { id: "22", group: isEn ? "Group D" : "Grupo D", teamA: "Turquía/Rumania/Eslovaquia/Kosovo_undf", teamB: "Paraguay", time: isEn ? "June 19 - 00:00" : "19 de Junio - 00:00", isoDate: "2026-06-19T00:00:00", venue: "San Francisco Bay Area Stadium", emojiA: "🏳️", emojiB: "🇵🇾" },
    { id: "23", group: isEn ? "Group D" : "Grupo D", teamA: "Turquía/Rumania/Eslovaquia/Kosovo_undf", teamB: isEn ? "USA" : "Estados Unidos", time: isEn ? "June 25 - 22:00" : "25 de Junio - 22:00", isoDate: "2026-06-25T22:00:00", venue: "Los Angeles Stadium", emojiA: "🏳️", emojiB: "🇺🇸" },
    { id: "24", group: isEn ? "Group D" : "Grupo D", teamA: "Paraguay", teamB: "Australia", time: isEn ? "June 25 - 22:00" : "25 de Junio - 22:00", isoDate: "2026-06-25T22:00:00", venue: "San Francisco Bay Area Stadium", emojiA: "🇵🇾", emojiB: "🇦🇺" },

    // --- GROUP E ---
    { id: "25", group: isEn ? "Group E" : "Grupo E", teamA: isEn ? "Germany" : "Alemania", teamB: isEn ? "Curacao" : "Curazao", time: isEn ? "June 14 - 13:00" : "14 de Junio - 13:00", isoDate: "2026-06-14T13:00:00", venue: "Houston Stadium", emojiA: "🇩🇪", emojiB: "🇨🇼" },
    { id: "26", group: isEn ? "Group E" : "Grupo E", teamA: isEn ? "Ivory Coast" : "Costa de Marfil", teamB: "Ecuador", time: isEn ? "June 14 - 19:00" : "14 de Junio - 19:00", isoDate: "2026-06-14T19:00:00", venue: "Philadelphia Stadium", emojiA: "🇨🇮", emojiB: "🇪🇨" },
    { id: "27", group: isEn ? "Group E" : "Grupo E", teamA: isEn ? "Germany" : "Alemania", teamB: isEn ? "Ivory Coast" : "Costa de Marfil", time: isEn ? "June 20 - 16:00" : "20 de Junio - 16:00", isoDate: "2026-06-20T16:00:00", venue: "Toronto Stadium", emojiA: "🇩🇪", emojiB: "🇨🇮" },
    { id: "28", group: isEn ? "Group E" : "Grupo E", teamA: "Ecuador", teamB: isEn ? "Curacao" : "Curazao", time: isEn ? "June 20 - 22:00" : "20 de Junio - 22:00", isoDate: "2026-06-20T22:00:00", venue: "Kansas City Stadium", emojiA: "🇪🇨", emojiB: "🇨🇼" },
    { id: "29", group: isEn ? "Group E" : "Grupo E", teamA: isEn ? "Curacao" : "Curazao", teamB: isEn ? "Ivory Coast" : "Costa de Marfil", time: isEn ? "June 25 - 16:00" : "25 de Junio - 16:00", isoDate: "2026-06-25T16:00:00", venue: "Philadelphia Stadium", emojiA: "🇨🇼", emojiB: "🇨🇮" },
    { id: "30", group: isEn ? "Group E" : "Grupo E", teamA: "Ecuador", teamB: isEn ? "Germany" : "Alemania", time: isEn ? "June 25 - 16:00" : "25 de Junio - 16:00", isoDate: "2026-06-25T16:00:00", venue: "NY NJ Stadium", emojiA: "🇪🇨", emojiB: "🇩🇪" },

    // --- GROUP F ---
    { id: "31", group: isEn ? "Group F" : "Grupo F", teamA: isEn ? "Netherlands" : "Países Bajos", teamB: isEn ? "Japan" : "Japón", time: isEn ? "June 14 - 16:00" : "14 de Junio - 16:00", isoDate: "2026-06-14T16:00:00", venue: "Dallas Stadium", emojiA: "🇳🇱", emojiB: "🇯🇵" },
    { id: "32", group: isEn ? "Group F" : "Grupo F", teamA: "Ucrania/Suecia/Polonia/Albania_undf", teamB: isEn ? "Tunisia" : "Túnez", time: isEn ? "June 14 - 22:00" : "14 de Junio - 22:00", isoDate: "2026-06-14T22:00:00", venue: "Estadio Monterrey", emojiA: "🏳️", emojiB: "🇹🇳" },
    { id: "33", group: isEn ? "Group F" : "Grupo F", teamA: isEn ? "Netherlands" : "Países Bajos", teamB: "Ucrania/Suecia/Polonia/Albania_undf", time: isEn ? "June 20 - 13:00" : "20 de Junio - 13:00", isoDate: "2026-06-20T13:00:00", venue: "Houston Stadium", emojiA: "🇳🇱", emojiB: "🏳️" },
    { id: "34", group: isEn ? "Group F" : "Grupo F", teamA: isEn ? "Tunisia" : "Túnez", teamB: isEn ? "Japan" : "Japón", time: isEn ? "June 20 - 00:00" : "20 de Junio - 00:00", isoDate: "2026-06-20T00:00:00", venue: "Estadio Monterrey", emojiA: "🇹🇳", emojiB: "🇯🇵" },
    { id: "35", group: isEn ? "Group F" : "Grupo F", teamA: isEn ? "Japan" : "Japón", teamB: "Ucrania/Suecia/Polonia/Albania_undf", time: isEn ? "June 25 - 19:00" : "25 de Junio - 19:00", isoDate: "2026-06-25T19:00:00", venue: "Dallas Stadium", emojiA: "🇯🇵", emojiB: "🏳️" },
    { id: "36", group: isEn ? "Group F" : "Grupo F", teamA: isEn ? "Tunisia" : "Túnez", teamB: isEn ? "Netherlands" : "Países Bajos", time: isEn ? "June 25 - 19:00" : "25 de Junio - 19:00", isoDate: "2026-06-25T19:00:00", venue: "Kansas City Stadium", emojiA: "🇹🇳", emojiB: "🇳🇱" },

    // --- GROUP G ---
    { id: "37", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "Belgium" : "Bélgica", teamB: isEn ? "Egypt" : "Egipto", time: isEn ? "June 15 - 15:00" : "15 de Junio - 15:00", isoDate: "2026-06-15T15:00:00", venue: "Seattle Stadium", emojiA: "🇧🇪", emojiB: "🇪🇬" },
    { id: "38", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "Iran" : "Irán", teamB: isEn ? "New Zealand" : "Nueva Zelanda", time: isEn ? "June 15 - 21:00" : "15 de Junio - 21:00", isoDate: "2026-06-15T21:00:00", venue: "Los Angeles Stadium", emojiA: "🇮🇷", emojiB: "🇳🇿" },
    { id: "39", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "Belgium" : "Bélgica", teamB: isEn ? "Iran" : "Irán", time: isEn ? "June 21 - 15:00" : "21 de Junio - 15:00", isoDate: "2026-06-21T15:00:00", venue: "Los Angeles Stadium", emojiA: "🇧🇪", emojiB: "🇮🇷" },
    { id: "40", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "New Zealand" : "Nueva Zelanda", teamB: isEn ? "Egypt" : "Egipto", time: isEn ? "June 21 - 21:00" : "21 de Junio - 21:00", isoDate: "2026-06-21T21:00:00", venue: "BC Place Vancouver", emojiA: "🇳🇿", emojiB: "🇪🇬" },
    { id: "41", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "Egypt" : "Egipto", teamB: isEn ? "Iran" : "Irán", time: isEn ? "June 26 - 23:00" : "26 de Junio - 23:00", isoDate: "2026-06-26T23:00:00", venue: "Seattle Stadium", emojiA: "🇪🇬", emojiB: "🇮🇷" },
    { id: "42", group: isEn ? "Group G" : "Grupo G", teamA: isEn ? "New Zealand" : "Nueva Zelanda", teamB: isEn ? "Belgium" : "Bélgica", time: isEn ? "June 26 - 23:00" : "26 de Junio - 23:00", isoDate: "2026-06-26T23:00:00", venue: "BC Place Vancouver", emojiA: "🇳🇿", emojiB: "🇧🇪" },

    // --- GROUP H ---
    { id: "43", group: isEn ? "Group H" : "Grupo H", teamA: isEn ? "Spain" : "España", teamB: "Cabo Verde", time: isEn ? "June 15 - 12:00" : "15 de Junio - 12:00", isoDate: "2026-06-15T12:00:00", venue: "Atlanta Stadium", emojiA: "🇪🇸", emojiB: "🇨🇻" },
    { id: "44", group: isEn ? "Group H" : "Grupo H", teamA: isEn ? "Saudi Arabia" : "Arabia Saudí", teamB: "Uruguay", time: isEn ? "June 15 - 18:00" : "15 de Junio - 18:00", isoDate: "2026-06-15T18:00:00", venue: "Miami Stadium", emojiA: "🇸🇦", emojiB: "🇺🇾" },
    { id: "45", group: isEn ? "Group H" : "Grupo H", teamA: isEn ? "Spain" : "España", teamB: isEn ? "Saudi Arabia" : "Arabia Saudí", time: isEn ? "June 21 - 12:00" : "21 de Junio - 12:00", isoDate: "2026-06-21T12:00:00", venue: "Atlanta Stadium", emojiA: "🇪🇸", emojiB: "🇸🇦" },
    { id: "46", group: isEn ? "Group H" : "Grupo H", teamA: "Uruguay", teamB: "Cabo Verde", time: isEn ? "June 21 - 18:00" : "21 de Junio - 18:00", isoDate: "2026-06-21T18:00:00", venue: "Miami Stadium", emojiA: "🇺🇾", emojiB: "🇨🇻" },
    { id: "47", group: isEn ? "Group H" : "Grupo H", teamA: "Cabo Verde", teamB: isEn ? "Saudi Arabia" : "Arabia Saudí", time: isEn ? "June 26 - 20:00" : "26 de Junio - 20:00", isoDate: "2026-06-26T20:00:00", venue: "Houston Stadium", emojiA: "🇨🇻", emojiB: "🇸🇦" },
    { id: "48", group: isEn ? "Group H" : "Grupo H", teamA: "Uruguay", teamB: isEn ? "Spain" : "España", time: isEn ? "June 26 - 20:00" : "26 de Junio - 20:00", isoDate: "2026-06-26T20:00:00", venue: "Estadio Guadalajara", emojiA: "🇺🇾", emojiB: "🇪🇸" },

    // --- GROUP I ---
    { id: "49", group: isEn ? "Group I" : "Grupo I", teamA: isEn ? "France" : "Francia", teamB: "Senegal", time: isEn ? "June 16 - 15:00" : "16 de Junio - 15:00", isoDate: "2026-06-16T15:00:00", venue: "NY NJ Stadium", emojiA: "🇫🇷", emojiB: "🇸🇳" },
    { id: "50", group: isEn ? "Group I" : "Grupo I", teamA: "Irak/Bolivia/Surinam_undf", teamB: isEn ? "Norway" : "Noruega", time: isEn ? "June 16 - 18:00" : "16 de Junio - 18:00", isoDate: "2026-06-16T18:00:00", venue: "Boston Stadium", emojiA: "🏳️", emojiB: "🇳🇴" },
    { id: "51", group: isEn ? "Group I" : "Grupo I", teamA: isEn ? "France" : "Francia", teamB: "Irak/Bolivia/Surinam_undf", time: isEn ? "June 22 - 17:00" : "22 de Junio - 17:00", isoDate: "2026-06-22T17:00:00", venue: "Philadelphia Stadium", emojiA: "🇫🇷", emojiB: "🏳️" },
    { id: "52", group: isEn ? "Group I" : "Grupo I", teamA: isEn ? "Norway" : "Noruega", teamB: "Senegal", time: isEn ? "June 22 - 20:00" : "22 de Junio - 20:00", isoDate: "2026-06-22T20:00:00", venue: "NY NJ Stadium", emojiA: "🇳🇴", emojiB: "🇸🇳" },
    { id: "53", group: isEn ? "Group I" : "Grupo I", teamA: isEn ? "Norway" : "Noruega", teamB: isEn ? "France" : "Francia", time: isEn ? "June 26 - 15:00" : "26 de Junio - 15:00", isoDate: "2026-06-26T15:00:00", venue: "Boston Stadium", emojiA: "🇳🇴", emojiB: "🇫🇷" },
    { id: "54", group: isEn ? "Group I" : "Grupo I", teamA: "Senegal", teamB: "Irak/Bolivia/Surinam_undf", time: isEn ? "June 26 - 15:00" : "26 de Junio - 15:00", isoDate: "2026-06-26T15:00:00", venue: "Toronto Stadium", emojiA: "🇸🇳", emojiB: "🏳️" },

    // --- GROUP J ---
    { id: "55", group: isEn ? "Group J" : "Grupo J", teamA: "Argentina", teamB: isEn ? "Algeria" : "Argelia", time: isEn ? "June 16 - 21:00" : "16 de Junio - 21:00", isoDate: "2026-06-16T21:00:00", venue: "Kansas City Stadium", emojiA: "🇦🇷", emojiB: "🇩🇿" },
    { id: "56", group: isEn ? "Group J" : "Grupo J", teamA: "Austria", teamB: isEn ? "Jordan" : "Jordania", time: isEn ? "June 16 - 00:00" : "16 de Junio - 00:00", isoDate: "2026-06-16T00:00:00", venue: "San Francisco Bay Area Stadium", emojiA: "🇦🇹", emojiB: "🇯🇴" },
    { id: "57", group: isEn ? "Group J" : "Grupo J", teamA: "Argentina", teamB: "Austria", time: isEn ? "June 22 - 13:00" : "22 de Junio - 13:00", isoDate: "2026-06-22T13:00:00", venue: "Dallas Stadium", emojiA: "🇦🇷", emojiB: "🇦🇹" },
    { id: "58", group: isEn ? "Group J" : "Grupo J", teamA: isEn ? "Jordan" : "Jordania", teamB: isEn ? "Algeria" : "Argelia", time: isEn ? "June 22 - 23:00" : "22 de Junio - 23:00", isoDate: "2026-06-22T23:00:00", venue: "San Francisco Bay Area Stadium", emojiA: "🇯🇴", emojiB: "🇩🇿" },
    { id: "59", group: isEn ? "Group J" : "Grupo J", teamA: isEn ? "Algeria" : "Argelia", teamB: "Austria", time: isEn ? "June 27 - 22:00" : "27 de Junio - 22:00", isoDate: "2026-06-27T22:00:00", venue: "Kansas City Stadium", emojiA: "🇩🇿", emojiB: "🇦🇹" },
    { id: "60", group: isEn ? "Group J" : "Grupo J", teamA: isEn ? "Jordan" : "Jordania", teamB: "Argentina", time: isEn ? "June 27 - 22:00" : "27 de Junio - 22:00", isoDate: "2026-06-27T22:00:00", venue: "Dallas Stadium", emojiA: "🇯🇴", emojiB: "🇦🇷" },

    // --- GROUP K ---
    { id: "61", group: isEn ? "Group K" : "Grupo K", teamA: "Portugal", teamB: "RD de Congo/Jamaica/Nueva Caledonia_undf", time: isEn ? "June 17 - 13:00" : "17 de Junio - 13:00", isoDate: "2026-06-17T13:00:00", venue: "Houston Stadium", emojiA: "🇵🇹", emojiB: "🏳️" },
    { id: "62", group: isEn ? "Group K" : "Grupo K", teamA: isEn ? "Uzbekistan" : "Uzbekistán", teamB: "Colombia", time: isEn ? "June 17 - 22:00" : "17 de Junio - 22:00", isoDate: "2026-06-17T22:00:00", venue: "Estadio Ciudad de México", emojiA: "🇺🇿", emojiB: "🇨🇴" },
    { id: "63", group: isEn ? "Group K" : "Grupo K", teamA: "Portugal", teamB: isEn ? "Uzbekistan" : "Uzbekistán", time: isEn ? "June 23 - 13:00" : "23 de Junio - 13:00", isoDate: "2026-06-23T13:00:00", venue: "Houston Stadium", emojiA: "🇵🇹", emojiB: "🇺🇿" },
    { id: "64", group: isEn ? "Group K" : "Grupo K", teamA: "Colombia", teamB: "RD de Congo/Jamaica/Nueva Caledonia_undf", time: isEn ? "June 23 - 22:00" : "23 de Junio - 22:00", isoDate: "2026-06-23T22:00:00", venue: "Estadio Guadalajara", emojiA: "🇨🇴", emojiB: "🏳️" },
    { id: "65", group: isEn ? "Group K" : "Grupo K", teamA: "Colombia", teamB: "Portugal", time: isEn ? "June 27 - 19:30" : "27 de Junio - 19:30", isoDate: "2026-06-27T19:30:00", venue: "Miami Stadium", emojiA: "🇨🇴", emojiB: "🇵🇹" },
    { id: "66", group: isEn ? "Group K" : "Grupo K", teamA: "RD de Congo/Jamaica/Nueva Caledonia_undf", teamB: isEn ? "Uzbekistan" : "Uzbekistán", time: isEn ? "June 27 - 19:30" : "27 de Junio - 19:30", isoDate: "2026-06-27T19:30:00", venue: "Atlanta Stadium", emojiA: "🏳️", emojiB: "🇺🇿" },

    // --- GROUP L ---
    { id: "67", group: isEn ? "Group L" : "Grupo L", teamA: isEn ? "England" : "Inglaterra", teamB: isEn ? "Croatia" : "Croacia", time: isEn ? "June 17 - 16:00" : "17 de Junio - 16:00", isoDate: "2026-06-17T16:00:00", venue: "Dallas Stadium", emojiA: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", emojiB: "🇭🇷" },
    { id: "68", group: isEn ? "Group L" : "Grupo L", teamA: "Ghana", teamB: isEn ? "Panama" : "Panamá", time: isEn ? "June 17 - 19:00" : "17 de Junio - 19:00", isoDate: "2026-06-17T19:00:00", venue: "Toronto Stadium", emojiA: "🇬🇭", emojiB: "🇵🇦" },
    { id: "69", group: isEn ? "Group L" : "Grupo L", teamA: isEn ? "England" : "Inglaterra", teamB: "Ghana", time: isEn ? "June 23 - 16:00" : "23 de Junio - 16:00", isoDate: "2026-06-23T16:00:00", venue: "Boston Stadium", emojiA: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", emojiB: "🇬🇭" },
    { id: "70", group: isEn ? "Group L" : "Grupo L", teamA: isEn ? "Panama" : "Panamá", teamB: isEn ? "Croatia" : "Croacia", time: isEn ? "June 23 - 19:00" : "23 de Junio - 19:00", isoDate: "2026-06-23T19:00:00", venue: "Toronto Stadium", emojiA: "🇵🇦", emojiB: "🇭🇷" },
    { id: "71", group: isEn ? "Group L" : "Grupo L", teamA: isEn ? "Panama" : "Panamá", teamB: isEn ? "England" : "Inglaterra", time: isEn ? "June 27 - 17:00" : "27 de Junio - 17:00", isoDate: "2026-06-27T17:00:00", venue: "NY NJ Stadium", emojiA: "🇵🇦", emojiB: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { id: "72", group: isEn ? "Group L" : "Grupo L", teamA: isEn ? "Croatia" : "Croacia", teamB: "Ghana", time: isEn ? "June 27 - 17:00" : "27 de Junio - 17:00", isoDate: "2026-06-27T17:00:00", venue: "Philadelphia Stadium", emojiA: "🇭🇷", emojiB: "🇬🇭" },
  ];

  const knockoutRounds = [
    { name: isEn ? "Round of 32" : "Dieciseisavos de Final", date: isEn ? "June 28-July 3" : "28 de Junio-3 de Julio", color: "border-slate-500" },
    { name: isEn ? "Round of 16" : "Octavos de Final", date: isEn ? "July 4-7" : "4-7 de Julio", color: "border-slate-600" },
    { name: isEn ? "Quarter-Finals" : "Cuartos de Final", date: isEn ? "July 9-11" : "9-11 de Julio", color: "border-blue-500/60" },
    { name: isEn ? "Semi-Finals" : "Semifinales", date: isEn ? "July 14-15" : "14-15 de Julio", color: "border-indigo-500/60" },
    { name: isEn ? "Final" : "Final", date: isEn ? "July 19" : "19 de Julio", color: "border-cyan-400/60" },
  ];

  return { groupMatches: sortMatchesByDate(groupMatches), knockoutRounds };
};

function sortMatchesByDate(matches: any) {
  return [...matches].sort((a, b) => {
    const dateA = new Date(a.isoDate);
    const dateB = new Date(b.isoDate);
    return dateA.getTime() - dateB.getTime();
  });
}

  const handleBetClick = (match: any, selectionLabel: string) => {
    setActiveSelection({
      matchId: match.id,
      matchName: `${match.teamA} vs ${match.teamB}`,
      label: selectionLabel
    });
    setIsDrawerOpen(true);
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
          
          <button 
            onClick={
              () => { 
                if(isConnected) { 
                  disconnect(); 
                  setShowWalletOptions(false) 
                } else {
                  setShowWalletOptions(true)
                } 
              }
            } 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/20 active:scale-95">
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && <div>{ensName ? `${ensName} ${address.slice(0, 4)}...${address.slice(-2)}` : `${address.slice(0, 4)}...${address.slice(-2)}`}</div>}
            {isConnected ? t.disconnectWallet : t.connectWallet }
          </button>
        
        </div>
      </nav>

      <main className="p-4 max-w-5xl mx-auto">
        {/* 1. GROUP STAGE */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-400/80 font-black mt-5">{t.groupPhase}</h2>

          {groupMatches.map((match) => (
            <div key={match.id} className="bg-[#111827] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all hover:border-slate-700">
              <div className="bg-slate-800/40 px-5 py-3 flex flex-col md:flex-row justify-between items-center border-b border-slate-800/50">
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
                      onClick={() => handleBetClick(match, opt.label)}
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
      {/* RENDER DRAWER */}
      <BetDrawer 
        // isOpen={isDrawerOpen} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        selection={activeSelection} 
      />

      {
        (showWalletOptions && !isConnected) && (
          <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.4)] flex justify-center items-center'>
            <div className='bg-slate-800 p-5 rounded-2xl flex flex-col justify-center items-center gap-3'>
              <div onClick={()=>setShowWalletOptions(false)}>X</div>
              <WalletOptions />
            </div>
          </div>
        )
      }


    </div>
  );
};

const BetDrawer = ({ isOpen, onClose, selection }: { isOpen: boolean, onClose: () => void, selection: any }) => {
  const { lang } = useLangStore();
  const { address, isConnected } = useConnection()
  const t = translations[lang as keyof typeof translations];
  const [amount, setAmount] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!selection) return null;

  const estimatedWin = amount ? (parseFloat(amount) * 1.85).toFixed(2) : "0.00"; // Mock multiplier

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      
      {/* Drawer Container */}
      <div 
        ref={drawerRef}
        
        // className={`fixed z-70 bg-[#0f172a] border-slate-800 shadow-2xl transition-transform duration-500 ease-out
        //   /* Mobile: Bottom to Top */
        //   bottom-0 left-0 w-full rounded-t-[2.5rem] border-t p-6 pb-10 transform translate-y-full
        //   /* Desktop: Right to Left */
        //   md:top-0 md:right-0 md:left-auto md:h-full md:w-[400px] md:rounded-l-[2.5rem] md:rounded-t-none md:border-l md:translate-y-0 md:translate-x-full
        //   ${isOpen ? 'translate-y-0 md:translate-x-0' : ''}`}

        className={`fixed z-[70] bg-[#0f172a] border-slate-800 shadow-2xl transition-transform duration-500 ease-out
        /* 1. Base Layout (Mobile) */
        bottom-0 left-0 w-full rounded-t-[2.5rem] border-t p-6 pb-10
        
        /* 2. Base Layout (Desktop) */
        md:top-0 md:right-0 md:left-auto md:h-full md:w-[400px] md:rounded-l-[2.5rem] md:rounded-t-none md:border-l
        
        /* 3. Ensure Desktop always resets the Mobile Y-axis translation */
        md:translate-y-0

        /* 4. Conditional Visibility (Swapping logic) */
        ${isOpen 
          ? 'translate-y-0 md:translate-x-0' // Open State
          : 'translate-y-full md:translate-x-full' // Closed State
        }`}
      >
        {/* Close Bar (Mobile) */}
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6 md:hidden" onClick={onClose} />
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Bet Slip</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Match Info Summary */}
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">{t.bettingOn}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{selection.label}</span>
              <span className="text-cyan-400 font-mono font-black text-xl">x1.85</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{selection.matchName}</p>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2 px-1">
              <span>{t.amountToBet}</span>
              <span>{t.balance}: 2,450 USDC</span>
            </div>
            <div className="relative group">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-5 px-6 text-2xl font-mono font-black text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-800"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-700">USDC</span>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-blue-200">{t.potentialWin}</span>
              <div className="text-right">
                <span className="block text-2xl font-mono font-black text-white">{estimatedWin} <span className="text-xs">USDC</span></span>
              </div>
            </div>
          </div>


          <button disabled={!isConnected} className={` ${isConnected?"cursor-pointer":"cursor-auto opacity-50"} w-full bg-blue-600 ${isConnected&&"hover:bg-blue-500"} py-5 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 group overflow-hidden relative`}>
            <span className="relative z-10">{t.placeBet}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          {
            !isConnected && (
              <p className="text-[14px] text-center text-slate-500 font-medium px-4">
                {t.connectWalletFromDrawer}
              </p>
            )
          }

        </div>
      </div>
    </>
  );
};

export default PAGE;