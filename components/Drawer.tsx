'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useLangStore } from '@/store/lang';
import { useConnection } from 'wagmi'
import { translations } from '@/translations/Drawer';
import type { OutcomeSelection } from '@/types/OutcomeSelection';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ABI } from '@/ABIs/ParimutuelSportsBetting'
import { type UseWriteContractParameters } from 'wagmi'
import { parseEther } from 'viem'

export const BetDrawer = ({ isOpen, onClose, selection }: { isOpen: boolean, onClose: () => void, selection: OutcomeSelection }) => {
  const { lang } = useLangStore();
  const { address, isConnected } = useConnection()
  const t = translations[lang as keyof typeof translations];
  const [amount, setAmount] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  const [showToast, setShowToast] = useState(false);
  
  const writeContract = useWriteContract()
  const { data: hash, error, isPending } = writeContract;
  // 2. Setup Transaction Watcher Hook
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle Toast Visibility based on Wagmi states
  useEffect(() => {
    if (isPending || isConfirming || isConfirmed || error) {
      setShowToast(true);
    }
  }, [isPending, isConfirming, isConfirmed, error]);



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

  const handleBet = () => {
    writeContract.mutate({ 
          abi: ABI,
          address: '0xC55377aAf5E8C57D23D1847a1FF616A924dbBEEF',
          functionName: 'placeBet',
          args: [
            BigInt(selection.matchId),
            BigInt(selection.outcome)
          ],
          value: parseEther(amount),

       })
  }

  const getToastContent = () => {
    if (isPending || isConfirming) return { msg: "Transaction in progress...", color: "border-blue-500 text-blue-400", loading: true };
    if (isConfirmed) return { msg: "Transaction succeeds!", color: "border-emerald-500 text-emerald-400", loading: false };
    if (error) return { msg: "Transaction failed", color: "border-red-500 text-red-400", loading: false };
    return null;
  };

  const toast = getToastContent();

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


          <button onClick={handleBet} disabled={!isConnected} className={` ${isConnected?"cursor-pointer":"cursor-auto opacity-50"} w-full bg-blue-600 ${isConnected&&"hover:bg-blue-500"} py-5 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 group overflow-hidden relative`}>
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

      {showToast && toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-slate-900 border-2 ${toast.color} px-6 py-4 rounded-2xl shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4`}>
          {toast.loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          <span className="font-bold text-sm uppercase tracking-wider">{toast.msg}</span>
          <button 
            onClick={() => setShowToast(false)}
            className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

    </>
  );
};