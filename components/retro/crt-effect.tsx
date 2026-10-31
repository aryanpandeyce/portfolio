"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CRTContextType {
  crtEnabled: boolean;
  toggleCRT: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

const CRTContext = createContext<CRTContextType>({
  crtEnabled: true,
  toggleCRT: () => {},
  audioEnabled: false,
  toggleAudio: () => {},
});

export function CRTProvider({ children }: { children: React.ReactNode }) {
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCRT = localStorage.getItem("retro-crt-enabled");
    if (savedCRT !== null) {
      setCrtEnabled(savedCRT === "true");
    }
    const savedAudio = localStorage.getItem("retro-audio-enabled");
    if (savedAudio !== null) {
      setAudioEnabled(savedAudio === "true");
    }
  }, []);

  const toggleCRT = () => {
    setCrtEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("retro-crt-enabled", String(next));
      return next;
    });
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("retro-audio-enabled", String(next));
      return next;
    });
  };

  return (
    <CRTContext.Provider value={{ crtEnabled, toggleCRT, audioEnabled, toggleAudio }}>
      {children}
      {mounted && crtEnabled && (
        <>
          <div className="crt-overlay" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />
        </>
      )}
    </CRTContext.Provider>
  );
}

export function useCRT() {
  return useContext(CRTContext);
}
