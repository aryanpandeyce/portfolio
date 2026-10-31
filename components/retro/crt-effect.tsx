"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

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

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("retro-settings-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("retro-settings-changed", callback);
  };
}

function getCrtSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  const val = localStorage.getItem("retro-crt-enabled");
  return val !== null ? val === "true" : true;
}

function getAudioSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const val = localStorage.getItem("retro-audio-enabled");
  return val !== null ? val === "true" : false;
}

function subscribeClient() {
  return () => {};
}

export function CRTProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    subscribeClient,
    () => true,
    () => false
  );

  const crtEnabled = useSyncExternalStore(
    subscribeStorage,
    getCrtSnapshot,
    () => true
  );

  const audioEnabled = useSyncExternalStore(
    subscribeStorage,
    getAudioSnapshot,
    () => false
  );

  const toggleCRT = () => {
    if (typeof window === "undefined") return;
    const current = getCrtSnapshot();
    localStorage.setItem("retro-crt-enabled", String(!current));
    window.dispatchEvent(new Event("retro-settings-changed"));
  };

  const toggleAudio = () => {
    if (typeof window === "undefined") return;
    const current = getAudioSnapshot();
    localStorage.setItem("retro-audio-enabled", String(!current));
    window.dispatchEvent(new Event("retro-settings-changed"));
  };

  return (
    <CRTContext.Provider value={{ crtEnabled, toggleCRT, audioEnabled, toggleAudio }}>
      {children}
      {isMounted && crtEnabled && (
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
