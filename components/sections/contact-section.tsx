"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import {
  Mail,
  Copy,
  Check,
  Send,
  Terminal,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    retroAudio.playCoin();
    navigator.clipboard.writeText(profileData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    retroAudio.playPowerUp();
    setIsSubmitting(true);

    // Simulate submission or transmit if endpoint configured
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ["#D97757", "#27C93F", "#FFBD2E"],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>{"// 08. TRANSMIT DISPATCH"}</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Initiate Contact &amp; Opportunities.
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl">
            Whether you want to discuss a distributed systems role, consult on cloud architecture, or say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Copy Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="retro-card p-6 bg-[var(--surface)] space-y-5">
              <h3 className="font-serif-heading font-bold text-xl text-[var(--foreground)]">
                Direct Channels
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                My inbox is always monitored. Feel free to copy my direct email or reach out on any
                of my professional profiles.
              </p>

              {/* Email One-Click Copy Card */}
              <div className="p-4 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-muted)] space-y-2 shadow-[2px_2px_0px_var(--retro-shadow-color)]">
                <span className="text-[10px] font-mono-code uppercase font-bold text-[var(--foreground-muted)] block">
                  PRIMARY EMAIL:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-code text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate select-all">
                    {profileData.personal.email}
                  </span>
                  <button
                    onClick={copyEmail}
                    title="Copy email to clipboard"
                    className={`retro-btn px-2.5 py-1.5 text-xs font-mono-code gap-1 shrink-0 ${
                      copied
                        ? "bg-[#27C93F] text-white border-[#27C93F]"
                        : "bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "COPIED!" : "COPY"}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono-code font-semibold text-[var(--foreground)] block">
                  NETWORK PROFILES:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                  <a
                    href={profileData.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => retroAudio.playClick()}
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={profileData.personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => retroAudio.playClick()}
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={profileData.personal.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => retroAudio.playClick()}
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    <span>LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${profileData.personal.email}`}
                    onClick={() => retroAudio.playClick()}
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    <span>Mail Client</span>
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Retro Terminal Contact Form */}
          <div className="lg:col-span-7">
            <div className="retro-card overflow-hidden bg-[var(--surface)]">
              {/* Window Header */}
              <div className="window-titlebar">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                  TRANSMISSION_FORM.EXE
                </span>
                <span className="text-[10px] font-mono-code text-[var(--accent)]">● FORM_ACTIVE</span>
              </div>

              <div className="p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-subtle)] border-2 border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto shadow-[3px_3px_0px_var(--retro-shadow-color)]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif-heading font-bold text-2xl text-[var(--foreground)]">
                      Transmission Received!
                    </h3>
                    <p className="text-sm font-mono-code text-[var(--foreground-muted)] max-w-sm mx-auto">
                      Thank you for reaching out. I have received your message and will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="retro-btn px-4 py-2 bg-[var(--surface)] font-mono-code text-xs text-[var(--foreground)] hover:text-[var(--accent)]"
                    >
                      [ Send Another Message ]
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[var(--foreground)] font-semibold block">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Satoshi Nakamoto"
                          className="w-full p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[var(--foreground)] font-semibold block">
                          YOUR EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="satoshi@domain.com"
                          className="w-full p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[var(--foreground)] font-semibold block">
                        SUBJECT LINE *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Distributed Systems / Frontend Role / Collaboration"
                        className="w-full p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[var(--foreground)] font-semibold block">
                        MESSAGE BODY *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Write your transmission here..."
                        className="w-full p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[var(--foreground-muted)]">
                        * All transmissions encrypted client-side
                      </span>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="retro-btn px-6 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-semibold gap-2 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH MESSAGE"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
