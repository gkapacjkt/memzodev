import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickNoteInput, setQuickNoteInput] = useState("");
  const [quickNotes, setQuickNotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("memzo_quick_draft_notes");
      return saved ? JSON.parse(saved) : [
        "Read latest webpage summaries captured with SnapLink.",
        "Review Chrome extension local database migration.",
        "Share SnapLink draft folder with the product team."
      ];
    } catch {
      return [
        "Read latest webpage summaries captured with SnapLink.",
        "Review Chrome extension local database migration.",
        "Share SnapLink draft folder with the product team."
      ];
    }
  });

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

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-600/30 overflow-x-hidden relative flex flex-col justify-between bg-transparent">
      
      {/* Premium Video Background Loop Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full hero-video opacity-100"
          style={{ filter: "brightness(0.24) contrast(1.1)" }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4" type="video/mp4" />
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
        <section id="hero" className="flex flex-col justify-center items-center text-center min-h-[70vh] py-12 relative w-full">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Hero Content Centered */}
          <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-6 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
              <p className="text-[11px] uppercase tracking-widest font-bold leading-none text-blue-300 font-mono">
                PRODUCTIVITY TOOLS FOR MODERN WORKFLOW
              </p>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[48px] md:text-[76px] leading-[1.05] font-semibold tracking-tight max-w-4xl text-center"
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
              className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light text-center"
            >
              Memzo creates minimalist digital tools that help you capture ideas and stay productive across your workflow.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center items-center gap-4"
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
              className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-8 text-xs text-slate-400"
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

            {/* SnapLink Product */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-[32px] p-8 md:p-10 border border-white/10 flex flex-col justify-between text-left group overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/10">
                  Chrome Extension & Web
                </span>
                <span className="text-[10px] font-semibold text-[#ffe400] uppercase font-mono bg-[#ffe400]/5 px-2.5 py-1 rounded">
                  Instant Sharing
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">SnapLink</h3>
                <p className="text-[#ffe400] text-xs font-mono mb-2 tracking-wide font-medium">
                  Share the vibe, not the screenshot.
                </p>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                  With SnapLink, capture any AI conversation, webpage, or research result — directly from your Chrome extension — and get an instant, beautiful, shareable link.
                </p>

                <div className="space-y-3 mb-10">
                  {[
                    "Share the vibe, not flat screenshots",
                    "Capture AI conversations & research results",
                    "Direct browser-to-link extension engine",
                    "Fast load times and beautiful layouts",
                    "Privacy-first, zero analytics bloat"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300 text-xs">
                      <div className="p-1 rounded-full bg-teal-400/10 text-teal-400 border border-teal-400/20">
                        <Sparkles size={10} />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="https://websnplink.memzo.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#ffe400] hover:bg-yellow-400 text-[#0d2235] font-bold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <span>Open SnapLink</span>
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
              Simple tools that help you move faster every day. Capture ideas quickly or share beautifully designed live web snaps in an instant.
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
                Memzo designs beautiful, minimal tools to enhance daily digital workflows, instant web sharing layouts, and clean local storage privacy models.
              </p>
              <div className="text-[10px] font-mono text-slate-500">
                Current State Date: {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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
                    href="https://websnplink.memzo.dev/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>SnapLink Web</span>
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
