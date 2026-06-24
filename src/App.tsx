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

  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.warn("Autoplay blocked or paused:", err);
      });
    }
  }, []);

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
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-10]">
        <video 
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full hero-video opacity-100"
          style={{ filter: "brightness(0.95) contrast(1.05)", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/25" />
      </div>

      {/* Content Wrapper overlaying on top of video backgound */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">

      {/* Aesthetic Floating Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between pointer-events-auto">
          {/* Combined Brand & Hamburger Menu Glass Pill */}
          <div className="flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-lg transition-all duration-350 hover:border-white/20">
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer">
              <Logo size={18} />
            </div>
            <div className="h-4 w-px bg-white/20 mx-2" />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-white hover:text-slate-300 transition-colors p-1 cursor-pointer flex items-center justify-center rounded-full"
              aria-label="Toggle Navigation drawer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Left Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] left-6 md:left-12 max-w-xs bg-slate-950/95 border border-white/10 backdrop-blur-2xl z-40 p-5 rounded-2xl flex flex-col gap-3 text-left shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-1 w-48">
              <button onClick={() => { scrollToSection("hero"); setMobileMenuOpen(false); }} className="py-2 px-3 rounded-lg text-xs font-semibold text-left text-slate-300 hover:bg-white/5 hover:text-white transition-all font-sans">Home</button>
              <button onClick={() => { scrollToSection("products"); setMobileMenuOpen(false); }} className="py-2 px-3 rounded-lg text-xs font-semibold text-left text-slate-300 hover:bg-white/5 hover:text-white transition-all font-sans">Products</button>
              <button onClick={() => { scrollToSection("why-memzo"); setMobileMenuOpen(false); }} className="py-2 px-3 rounded-lg text-xs font-semibold text-left text-slate-300 hover:bg-white/5 hover:text-white transition-all font-sans">Why Memzo</button>
              <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="py-2 px-3 rounded-lg text-xs font-semibold text-left text-slate-300 hover:bg-white/5 hover:text-white transition-all font-sans">Inquiries Database</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-7xl mx-auto flex-grow px-6 md:px-12 pt-32 pb-24 flex flex-col gap-28">
        
        {/* Premium Left-aligned Hero Section */}
        <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-start w-full py-12 md:py-20">
          {/* Gentle ambient light-blue backing glow to support misty mockup colors */}
          <div className="absolute top-[15%] left-[-15%] w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative z-10">
            {/* Left Column: Elegant Serif Branding & Email Waitlist input */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start text-left space-y-6">
              
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[48px] sm:text-[66px] md:text-[84px] leading-[1.05] font-serif font-normal tracking-tight text-white select-none max-w-xl"
                style={{ textShadow: "0 2px 30px rgba(15, 23, 42, 0.15)" }}
              >
                Build faster. <br />
                Think clearer.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-slate-200/90 leading-relaxed max-w-md font-sans text-sm md:text-base font-light tracking-wide"
                style={{ textShadow: "0 1px 12px rgba(15, 23, 42, 0.2)" }}
              >
                Memzo creates minimalist digital tools that help you capture ideas and stay productive across your workflow.
              </motion.p>

              {/* Mini action flags */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 text-[11px] font-mono tracking-wider text-slate-300/80 pt-4"
              >
                <button 
                  onClick={() => scrollToSection("products")} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Explore Apps Suite</span>
                  <ArrowRight size={12} />
                </button>
                <span className="text-white/20">|</span>
                <a 
                  href="https://chromewebstore.google.com/detail/quick-and-secure-note/eelncapjcglohlgpljapldmfjgddhknj"
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Chrome Extension</span>
                  <ExternalLink size={11} />
                </a>
              </motion.div>

            </div>

            {/* Right Column: Floating capsules aligned exactly at bottom right of viewport/stage */}
            <div className="lg:col-span-5 relative w-full h-48 lg:h-[450px] flex items-end justify-end self-end">
              <div className="flex flex-col items-start lg:items-end gap-2.5 select-none pointer-events-none w-full lg:w-auto">
                {[
                  "100% Minimalist",
                  "Privacy-First Suite",
                  "Zen Productivity"
                ].map((badgeText, index) => (
                  <motion.div
                    key={badgeText}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: "easeOut" }}
                    className="bg-slate-950/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-lg text-xs font-medium tracking-wide text-white/90 whitespace-nowrap self-start lg:self-auto hover:border-white/20 transition-all duration-300"
                    style={{ backdropFilter: "blur(16px)" }}
                  >
                    {badgeText}
                  </motion.div>
                ))}
              </div>
            </div>
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
                <span className="text-[10px] font-semibold text-sky-300 uppercase font-mono bg-sky-500/10 px-2.5 py-1 rounded">
                  Instant Sharing
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">SnapLink</h3>
                <p className="text-sky-300 text-xs font-mono mb-2 tracking-wide font-medium">
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
                  href="https://snplink.memzo.dev/auth/login"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-sky-650 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <span>Open SnapLink</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-sky-500/10 transition-all duration-500" />
            </motion.div>
          </div>
        </section>

        {/* Why Memzo - Core Ideology */}
        <section id="why-memzo" className="scroll-mt-24">
          <div className="max-w-2xl text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase block mb-3">Core Ideology</span>
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-300 to-teal-400" />
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-40px] right-[-40px] w-44 h-44 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none" />

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
                className="bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-colors cursor-pointer"
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
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase block mb-3">Let's Connect</span>
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
              <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">Products</h4>
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
    </div>
  );
}
