import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, BookOpen, MessageSquare, Send, Trash2, TriangleAlert, CircleCheck } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("memzo_contact_submissions");
      if (stored) {
        setSubmissions(JSON.parse(stored));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        id: Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
        createdAt: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem("memzo_contact_submissions", JSON.stringify(updated));
      } catch (err) {
        console.error("LocalStorage write blocked:", err);
      }
      
      setName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");
      setStatus("success");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    const updated = submissions.filter(item => item.id !== id);
    setSubmissions(updated);
    try {
      localStorage.setItem("memzo_contact_submissions", JSON.stringify(updated));
    } catch (err) {
      console.error("LocalStorage write blocked:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left mt-8">
      {/* Form Area */}
      <div className="md:col-span-7 glass-card rounded-[32px] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-heading font-semibold text-white mb-2">Get in Touch</h3>
          <p className="text-slate-400 text-sm mb-8">
            Fill out the form below and our innovation team will get back to you within 24 hours.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">
                Your Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "submitting"}
                  placeholder="John Doe"
                  className="w-full form-input rounded-2xl py-3.5 pl-11 pr-4 placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">
                Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  disabled={status === "submitting"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="john@example.com"
                  className="w-full form-input rounded-2xl py-3.5 pl-11 pr-4 placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">
                Subject
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                  <BookOpen size={16} />
                </span>
                <select
                  value={subject}
                  disabled={status === "submitting"}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full form-input rounded-2xl py-3.5 pl-11 pr-10 focus:outline-none focus:border-accent-blue/50 transition-all appearance-none font-sans"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership Proposal">Partnership Proposal</option>
                  <option value="Web3 Solutions">Web3 Solutions</option>
                  <option value="Technical Support">Technical Support</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white/40">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">
                Your Message *
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none text-white/30">
                  <MessageSquare size={16} />
                </span>
                <textarea
                  required
                  rows={4}
                  value={message}
                  disabled={status === "submitting"}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="How can we help your team?"
                  className="w-full form-input rounded-2xl py-3.5 pl-11 pr-4 placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-all resize-none font-sans"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-sans"
                >
                  <TriangleAlert size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-sans"
                >
                  <CircleCheck size={14} className="shrink-0" />
                  <span>Your message was sent successfully! Thanks for reaching out.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              id="contact_submit_btn"
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-hover text-white font-semibold text-sm py-4 rounded-2xl transition-all cursor-pointer shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Database & Metadata Side */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <div className="glass-card rounded-[32px] p-8 md:p-10 flex flex-col justify-start">
          <h4 className="text-lg font-heading font-semibold text-white mb-4">Contact Info</h4>
          <div className="space-y-4 text-sm text-white/70">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Office Location</p>
              <p className="mt-1 font-medium text-white">Sydney, Australia</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Direct Email</p>
              <p className="mt-1 font-medium text-white">support@memzo.dev</p>
            </div>
          </div>
        </div>

        {/* Real-time Submissions database view */}
        <div className="flex-1 glass-card rounded-[32px] p-8 flex flex-col justify-start min-h-[250px]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Sent Messages DB</h4>
            <span className="text-[10px] text-green-400 border border-green-500/20 bg-green-500/5 px-2 py-0.5 rounded-full font-mono">
              Live LocalStorage
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/5 rounded-2xl">
              <Mail className="w-8 h-8 text-white/15 mb-2" />
              <p className="text-xs text-white/30 font-medium">No messages sent yet</p>
              <p className="text-[10px] text-white/20 mt-1">Submit the form to verify data storage.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {submissions.map((sub) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="p-3 bg-[#0a192f] border border-white/10 rounded-xl flex flex-col gap-1 transition-all group/item hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{sub.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-white/30 font-mono">{sub.createdAt}</span>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="opacity-0 group-hover/item:opacity-100 p-1 text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-medium">{sub.subject}</span>
                    <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">{sub.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
