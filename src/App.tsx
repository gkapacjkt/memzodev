import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  BookOpen, 
  Trash2, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Coins, 
  Menu, 
  X, 
  ExternalLink 
} from 'lucide-react';
import Logo from './components/Logo';
import ContactForm from './components/ContactForm';
import { Bond } from './types';

const BONDS_DATA: Record<string, Bond> = {
  FR0100: {
    ticker: "FR0100",
    yieldRate: 6.72,
    price: 101.4,
    change: "+0.25%",
    changePositive: true,
    maturity: "15 Years (2039)",
    chartPath: "M0,50 Q45,35 90,20 T180,4 T220,12 T280,2"
  },
  FR0097: {
    ticker: "FR0097",
    yieldRate: 6.38,
    price: 99.85,
    change: "+0.12%",
    changePositive: true,
    maturity: "10 Years (2034)",
    chartPath: "M0,45 Q45,52 90,25 T180,28 T220,38 T280,10"
  },
  FR0098: {
    ticker: "FR0098",
    yieldRate: 6.65,
    price: 102.1,
    change: "-0.05%",
    changePositive: false,
    maturity: "20 Years (2044)",
    chartPath: "M0,15 Q45,20 90,40 T180,25 T220,50 T280,45"
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickNoteInput, setQuickNoteInput] = useState("");
  const [quickNotes, setQuickNotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("memzo_quick_draft_notes");
      return saved ? JSON.parse(saved) : [
        "Research Indonesian state bonds yield premium vs USD treasuries.",
        "Review local storage schema for Note Extension v1.2",
        "Share quick note with dev team for feedback."
      ];
    } catch {
      return [
        "Research Indonesian state bonds yield premium vs USD treasuries.",
        "Review local storage schema for Note Extension v1.2",
        "Share quick note with dev team for feedback."
      ];
    }
  });

  const [selectedBond, setSelectedBond] = useState<Bond>(BONDS_DATA.FR0100);
  const [investmentAmount, setInvestmentAmount] = useState(50); // In Millions Rp

  useEffect(() => {
    try {
      localStorage.setItem("memzo_quick_draft_notes", JSON.stringify(quickNotes));
    } catch (err) {
      console.error(err);
    }
  }, [quickNotes]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPos = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetPos,
        behavior: "smooth"
      });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickNoteInput.trim()) {
      setQuickNotes([quickNoteInput.trim(), ...quickNotes]);
      setQuickNoteInput("");
    }
  };

  const handleDeleteNote = (idx: number) => {
    setQuickNotes(quickNotes.filter((_, i) => i !== idx));
  };

  // Yield Calculator helper
  const annualReturnRp = investmentAmount * 1000000 * (selectedBond.yieldRate / 100);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-600/30 overflow-x-hidden relative flex flex-col justify-between bg-transparent">
      
      {/* Premium Video Background Loop Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-100"
          style={{ filter: "brightness(0.24) contrast(1.1)" }}
        >
          <source src="/p360.mp4" type="video/mp4" />
          <source src="https://delicate-unit-e7ae.irwandi.workers.dev/" type="video/mp4" />
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064209_0cb7d815-ff61-4caa-a6d5-bbff145ab272.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* Navigation Header */}
      <nav id="app_nav" className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex items-center justify-between bg-slate-950/65 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer">
            <Logo size={42} />
          </div>

          <div className="hidden md:flex items-center glass-card rounded-full px-3 py-1">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="px-4 py-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("products")} 
              className="px-4 py-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection("why-memzo")} 
              className="px-4 py-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Why Memzo
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-4 py-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Inquiries
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="px-5 py-2.5 rounded-full font-semibold text-xs border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer"
            >
              Contact Us
            </button>
            <button 
              onClick={() => scrollToSection("products")} 
              className="bg-[#ffe400] text-[#0d2235] px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-950/20 cursor-pointer flex items-center gap-1"
            >
              <span>Explore Products</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[81px] inset-x-0 bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl z-40 p-6 flex flex-col gap-4 md:hidden text-left shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection("hero")} className="py-3 px-4 rounded-xl text-sm font-semibold text-left text-slate-300 hover:bg-white/5">Home</button>
              <button onClick={() => scrollToSection("products")} className="py-3 px-4 rounded-xl text-sm font-semibold text-left text-slate-300 hover:bg-white/5">Products</button>
              <button onClick={() => scrollToSection("why-memzo")} className="py-3 px-4 rounded-xl text-sm font-semibold text-left text-slate-300 hover:bg-white/5">Why Memzo</button>
              <button onClick={() => scrollToSection("contact")} className="py-3 px-4 rounded-xl text-sm font-semibold text-left text-slate-300 hover:bg-white/5">Inquiries Database</button>
            </div>
            <div className="h-px bg-white/15 my-1" />
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection("contact")} className="w-full text-center bg-white/5 border border-white/15 text-slate-300 py-3.5 rounded-xl font-semibold text-xs cursor-pointer active:bg-white/10">Send Message</button>
              <button onClick={() => scrollToSection("products")} className="w-full text-center bg-[#ffe400] text-[#0d2235] py-3.5 rounded-xl font-bold text-xs cursor-pointer shadow-lg hover:bg-yellow-400 transition-colors">Explore Products</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-7xl mx-auto flex-grow px-6 md:px-12 pt-32 pb-24 flex flex-col gap-28">
        
        {/* Main Hero Section */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-6 self-start bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
              <p className="text-[11px] uppercase tracking-widest font-bold leading-none text-blue-300">
                PRODUCTIVITY TOOLS FOR MODERN WORKFLOW
              </p>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[48px] md:text-[76px] leading-[1.05] font-semibold tracking-tight max-w-3xl"
            >
              <span className="block text-white">Build Faster.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-200">
                Think Clearer.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-light"
            >
              Memzo creates minimalist digital tools that help you capture ideas, track investments, and stay productive across your workflow.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={() => scrollToSection("products")}
                className="group flex items-center bg-[#ffe400] text-[#0d2235] hover:bg-yellow-400 transition-all rounded-full p-1 pl-6 gap-4 cursor-pointer shadow-xl shadow-yellow-950/10"
              >
                <span className="font-bold text-xs uppercase tracking-wider">Explore Products</span>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-all">
                  <ArrowRight className="text-[#0d2235] w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>

              <a
                href="https://chromewebstore.google.com/detail/quick-and-secure-note/eelncapjcglohlgpljapldmfjgddhknj"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full text-xs font-semibold hover:bg-white/5 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Chrome Extension</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-white/5 flex items-center gap-8 text-xs text-slate-400"
            >
              <div>
                <span className="block text-white text-lg font-mono font-bold">100% Minimalist</span>
                <span>Distraction-free environments</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white text-lg font-mono font-bold">Privacy-First</span>
                <span>Zero external trackers or ads</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Widget Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Note Quick Draft Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl border border-white/10 p-5 relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/40" />
                  <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/40" />
                  <span className="font-mono text-[10px] text-slate-500 ml-1">quick-note.crx</span>
                </div>
                <span className="font-mono text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 flex items-center gap-1">
                  <ShieldCheck size={10} /> Local Storage
                </span>
              </div>

              <form onSubmit={handleAddNote} className="space-y-3">
                <div className="relative">
                  <textarea
                    value={quickNoteInput}
                    onChange={(e) => setQuickNoteInput(e.target.value)}
                    placeholder="Type a quick note and save..."
                    className="w-full text-xs bg-black/30 border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-xl p-3 pr-4 placeholder-white/20 focus:outline-none transition-all resize-none font-sans text-white h-20"
                  />
                  <div className="absolute bottom-2.5 right-3 text-[9px] text-slate-500 font-mono">
                    {quickNoteInput.length} chars
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Encrypted count: {quickNotes.length}
                  </span>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Save Note</span>
                    <Plus size={12} />
                  </button>
                </div>
              </form>

              <div className="mt-4 space-y-2 max-h-24 overflow-y-auto pt-2 border-t border-white/5">
                <AnimatePresence initial={false}>
                  {quickNotes.map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] text-slate-300 flex items-start justify-between group/note gap-2"
                    >
                      <p className="line-clamp-2 leading-relaxed text-left">{note}</p>
                      <button 
                        onClick={() => handleDeleteNote(index)}
                        className="text-slate-450 hover:text-red-400 transition-colors hover:bg-red-500/10 p-1 rounded cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 size={10} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* PortoTracker Bond Yield Calculator Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl border border-white/10 p-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <Coins className="text-[#ffe400] w-4 h-4" />
                  <span className="font-semibold text-white">PortoTracker Indonesia State Bonds</span>
                </div>
                <span className="text-[10px] text-teal-400 border border-teal-500/20 bg-teal-500/5 px-2 py-0.5 rounded-full font-mono">
                  Yield Engine
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.values(BONDS_DATA).map((bond) => (
                  <button
                    key={bond.ticker}
                    onClick={() => setSelectedBond(bond)}
                    className={`p-2 rounded-xl text-left border ${
                      selectedBond.ticker === bond.ticker
                        ? "bg-blue-500/10 border-blue-500/40 text-white"
                        : "bg-black/20 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
                    } transition-all cursor-pointer`}
                  >
                    <span className="block text-xs font-bold leading-none">{bond.ticker}</span>
                    <span className="text-[10px] text-slate-505 block mt-1">{bond.yieldRate}% Yield</span>
                  </button>
                ))}
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400">
                  <span>Investment Amount</span>
                  <span className="text-white font-mono font-bold">Rp {investmentAmount} Million</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-white/15 h-1.5 rounded-lg appearance-none cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5 text-left">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block leading-none">
                      Annual Return
                    </span>
                    <span className="text-xs font-bold text-green-400 font-mono mt-0.5 block">
                      Rp {annualReturnRp.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block leading-none">
                      Maturity Length
                    </span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {selectedBond.maturity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sparkline curve visualizer */}
              <div className="relative h-11 w-full bg-blue-950/20 border border-white/5 rounded-lg overflow-hidden flex items-end">
                <svg className="w-full h-8" viewBox="0 0 280 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Gradient fill area */}
                  <path 
                    d={`${selectedBond.chartPath} L280,60 L0,60 Z`} 
                    fill="url(#chartGlow)"
                    className="transition-all duration-500"
                  />
                  {/* Line path */}
                  <path 
                    d={selectedBond.chartPath} 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="1.5"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute top-1 right-2 text-[9px] text-slate-500 font-mono">
                  Live Price {selectedBond.price} Ind.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Core Products Showcase */}
        <section id="products" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#ffe400] uppercase block mb-3">Our Core Suite</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-heading">
              Minimalist workflows, built to resolve daily digital stress.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Chrome Extension Product */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-[32px] p-8 md:p-10 border border-white/10 flex flex-col justify-between text-left group overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/10">
                  Chrome Extension
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono bg-white/5 px-2.5 py-1 rounded">
                  v1.2.5 — Free
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">Quick and Secure Note</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                  A lightweight Chrome extension for capturing notes instantly with privacy-first local storage. Fast, distraction-free, and built for modern workflows.
                </p>

                <div className="space-y-3 mb-10">
                  {[
                    "Instant note capture window",
                    "Secure local storage encryption",
                    "Minimal clean interface and layout",
                    "Productivity focused features",
                    "Fast access with keyboard shortcut"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300 text-xs">
                      <div className="p-1 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                        <Zap size={10} />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="https://chromewebstore.google.com/detail/quick-and-secure-note/eelncapjcglohlgpljapldmfjgddhknj"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/30 active:scale-[0.99] cursor-pointer"
                >
                  <span>Install Extension</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-550/20 transition-all duration-500" />
            </motion.div>

            {/* PortoTracker Product */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-[32px] p-8 md:p-10 border border-white/10 flex flex-col justify-between text-left group overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/10">
                  Bond Portfolio Tracker
                </span>
                <span className="text-[10px] font-semibold text-[#ffe400] uppercase font-mono bg-[#ffe400]/5 px-2.5 py-1 rounded">
                  Live Dashboard
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">PortoTracker</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                  Track Indonesian government bonds and monitor your investment portfolio with a clean and modern dashboard experience.
                </p>

                <div className="space-y-3 mb-10">
                  {[
                    "Bond portfolio tracking database",
                    "Clean analytics and yield calculator",
                    "Rupiah price monitoring indexes",
                    "Maturity year visualizations",
                    "Investor-focused minimalist UI"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300 text-xs">
                      <div className="p-1 rounded-full bg-teal-400/10 text-teal-400 border border-teal-400/20">
                        <TrendingUp size={10} />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="https://portotrack.memzo.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#ffe400] hover:bg-yellow-400 text-[#0d2235] font-bold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <span>Open PortoTracker</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/10 transition-all duration-500" />
            </motion.div>
          </div>
        </section>

        {/* Why Memzo - Core Ideology */}
        <section id="why-memzo" className="scroll-mt-24">
          <div className="max-w-2xl text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-[#ffe400] uppercase block mb-3">Core Ideology</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-heading">
              Minimal Tools. Maximum Focus.
            </h2>
            <p className="mt-4 text-slate-400 font-light text-base leading-relaxed">
              We design tools without the bloat, without the ads, and without unnecessary telemetry. We believe beauty is found in humble, high-contrast, optimized utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-white/10 transition-all relative group overflow-hidden text-left">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Zap size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Experience</h3>
              <p className="text-xs text-slate-440 text-slate-400 leading-relaxed font-light">
                Ultra-lightweight apps optimized for speed and simplicity. Built for instantaneous loading times and zero delay.
              </p>
            </div>

            <div className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-white/10 transition-all relative group overflow-hidden text-left">
              <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-400 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
              <p className="text-xs text-slate-440 text-slate-400 leading-relaxed font-light">
                Built with secure, minimal data collection principles. All note captures are saved safely on your own machine.
              </p>
            </div>

            <div className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-white/10 transition-all relative group overflow-hidden text-left">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Modern Design</h3>
              <p className="text-xs text-slate-440 text-slate-400 leading-relaxed font-light">
                Beautiful, elegant interfaces designed for focus and usability. Balancing rich contrast ratios and pure typography.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner Card */}
        <section id="cta" className="glass-card rounded-[32px] p-10 md:p-16 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[#ffe400] to-teal-400" />
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-40px] right-[-40px] w-44 h-44 bg-[#ffe400]/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight font-heading">
              Designed for modern digital workflows.
            </h2>
            <p className="mt-4 text-slate-300 font-light text-sm md:text-base leading-relaxed max-w-lg">
              Simple tools that help you move faster every day. Capture ideas quickly or keep track of your active yield investments.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <button 
                onClick={() => scrollToSection("products")}
                className="bg-[#ffe400] text-[#0d2235] hover:bg-yellow-400 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Explore Products
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="border border-white/15 hover:border-white/25 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Contact/Inquiries Section */}
        <section id="contact" className="scroll-mt-24 border-t border-white/5 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#ffe400] uppercase block mb-3">Let's Connect</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-heading">
              Have questions or request custom integrations?
            </h2>
            <p className="mt-3 text-slate-400 font-light text-sm max-w-md mx-auto leading-relaxed">
              Send a secure transmission to our local system in real-time. Feel free to view or delete submitted inquiries instantly.
            </p>
          </div>

          <ContactForm />
        </section>
      </div>

      {/* Footer Block */}
      <footer className="w-full border-t border-white/5 bg-black/60 backdrop-blur-lg py-16 px-6 md:px-12 relative z-10 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
            <div className="md:col-span-8 space-y-4">
              <Logo size={42} />
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed font-light">
                Memzo designs beautiful, minimal tools to enhance daily digital workflows, investment analysis, and clean local storage privacy models.
              </p>
              <div className="text-[10px] font-mono text-slate-500">
                Current State Date: {new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Products</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://chromewebstore.google.com/detail/quick-and-secure-note/eelncapjcglohlgpljapldmfjgddhknj" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Quick and Secure Note</span>
                    <ExternalLink size={10} className="text-slate-600" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://portotrack.memzo.dev/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>PortoTracker Indonesia</span>
                    <ExternalLink size={10} className="text-slate-600" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} <span className="text-white font-medium">memzo.dev</span>. Designed with pure focus. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Network Status: Online & Secure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
